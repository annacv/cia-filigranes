import type { CalendarEvent, CalendarApiResponse, GoogleCalendarEvent, ContentType } from '~/types'
import type { CardImage } from '~/types'
import { getImageByRoute } from '~/utils/image-by-route'

const CACHE_KEY = 'filigranes-calendar-events'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

interface CachedData {
  events: CalendarEvent[]
  timestamp: number
}

interface UseCalendarEventsOptions {
  maxResults?: number
}

// Uses the same image keys as highlightShows
const SHOWS_TITLE_TO_IMAGE_KEY: Record<string, string> = {
  '20 anys no son res': 'vint-anys',
  'el circ filixic': 'circ-filixic',
  'plis plas': 'plis-plas',
  'cercavila germans freak frac': 'freak-frac',
  'el petit circ de makutu': 'circ-makutu',
  'trinxat no tremola': 'circ-trinxeta',
}

// Uses the same base keys as HighlightWorkshops
const WORKSHOPS_TITLE_TO_IMAGE_KEY: Record<string, string> = {
  'taller de circ': 'circ',
  'circ': 'circ',
  'taller de bombolles de sabo': 'bombolles-sabo',
  'bombolles de sabo': 'bombolles-sabo',
  'taller de pallassos': 'pallassos',
  'pallassos': 'pallassos',
  'taller de maquillatge': 'maquillatge',
  'maquillatge': 'maquillatge',
  "taller d'enginys d'aigua": 'enginys-aigua',
  "enginys d'aigua": 'enginys-aigua',
}

const PERFORMANCES_TITLE_TO_IMAGE_KEY: Record<string, string> = {
  'animacions a la carta': 'foc',
  'animacio amb malabars de foc': 'foc',
  'animacio circ d epoca': 'circ-epoca',
  'animacio malabars amb caixes': 'caixes',
}

const normalizeTitle = (value: string): string => {
  return value
    .replace(/@/g, 'o')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s'-]/g, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

const getEventImageByTitle = (title: string, eventType: ContentType): CardImage | undefined => {
  const normalizedTitle = normalizeTitle(title)
  const titleMap =
    eventType === 'shows'
      ? SHOWS_TITLE_TO_IMAGE_KEY
      : eventType === 'workshops'
        ? WORKSHOPS_TITLE_TO_IMAGE_KEY
        : eventType === 'performances'
          ? PERFORMANCES_TITLE_TO_IMAGE_KEY
          : null
  if (!titleMap) return undefined

  const exact = titleMap[normalizedTitle]
  if (exact) {
    const imageRoute =
      eventType === 'shows'
        ? 'espectacles'
        : eventType === 'workshops'
          ? 'tallers'
          : 'animacions'
    return getImageByRoute(imageRoute, exact)
  }

  const matched = Object.entries(titleMap).find(([candidate]) => {
    return normalizedTitle.includes(candidate)
  })

  if (!matched) return undefined

  const imageRoute =
    eventType === 'shows'
      ? 'espectacles'
      : eventType === 'workshops'
        ? 'tallers'
        : 'animacions'
  return getImageByRoute(imageRoute, matched[1])
}

const getFallbackImageForType = (eventType: ContentType): CardImage | undefined => {
  switch (eventType) {
    case 'shows':
      return getImageByRoute('espectacles', 'espectacles_fallback')
    case 'workshops':
      return getImageByRoute('tallers', 'tallers_fallback')
    case 'performances':
      return getImageByRoute('animacions', 'foc')
    default:
      return undefined
  }
}

/**
 * Transforms a Google Calendar API event to a normalized CalendarEvent format
 */
const transformEvent = (event: GoogleCalendarEvent): CalendarEvent => {
  const isAllDay = !event.start.dateTime
  const normalizedSummary = event.summary.replace(/@/g, 'o')
  const summaryWords = normalizedSummary.toLowerCase().split(/\s+/)

  const isWorkshop = summaryWords.some((word) => word === 'taller' || word === 'tallers')
  const isPerformance = summaryWords.some((word) => word === 'animació' || word === 'animacio' || word === 'animacions')

  const eventType: ContentType =
    isWorkshop ? 'workshops'
    : isPerformance ? 'performances'
    : 'shows'

  return {
    id: event.id,
    eventType,
    title: normalizedSummary,
    description: event.description,
    location: event.location,
    image: getEventImageByTitle(normalizedSummary, eventType) ?? getFallbackImageForType(eventType),
    start: event.start.dateTime || event.start.date || '',
    end: event.end?.dateTime || event.end?.date || null,
    isAllDay,
    htmlLink: event.htmlLink
  }
}

/**
 * Checks if cached data is still valid
 */
const isCacheValid = (cached: CachedData | null): boolean => {
  if (!cached) return false
  return Date.now() - cached.timestamp < CACHE_TTL_MS
}

/**
 * Gets cached events from sessionStorage
 */
const getCachedEvents = (): CachedData | null => {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (!cached) return null
    return JSON.parse(cached) as CachedData
  } catch {
    return null
  }
}

/**
 * Saves events to sessionStorage cache
 */
const setCachedEvents = (events: CalendarEvent[]): void => {
  try {
    const data: CachedData = {
      events,
      timestamp: Date.now()
    }
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // sessionStorage might be full or disabled, ignore
  }
}

/**
 * Composable for fetching and caching Google Calendar events.
 * Fetches upcoming events from a public Google Calendar using an API key.
 * Results are cached in sessionStorage for 5 minutes to minimize API calls.
 *
 * @param options - Optional configuration
 * @param options.maxResults - Maximum number of events to fetch (default: 20)
 * @returns Object containing events array, pending state, error state, and refresh function
 */
export const useCalendarEvents = (options?: UseCalendarEventsOptions) => {
  const config = useRuntimeConfig()
  const events = ref<CalendarEvent[]>([])
  const pending = ref(true)
  const error = ref<Error | null>(null)

  const maxResults = options?.maxResults ?? 20

  const fetchEvents = async (forceRefresh = false) => {
    // Only run on client side
    if (!import.meta.client) {
      pending.value = false
      return
    }

    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = getCachedEvents()
      if (isCacheValid(cached)) {
        events.value = cached!.events
        pending.value = false
        return
      }
    }

    const apiKey = config.public.googleCalendarApiKey
    const calendarId = config.public.googleCalendarId

    // Validate configuration
    if (!apiKey || !calendarId) {
      console.warn('[useCalendarEvents] Missing Google Calendar API key or Calendar ID')
      pending.value = false
      return
    }

    pending.value = true
    error.value = null

    try {
      const now = new Date().toISOString()
      const params = new URLSearchParams({
        key: apiKey,
        singleEvents: 'true',
        orderBy: 'startTime',
        timeMin: now,
        maxResults: String(maxResults)
      })

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params.toString()}`

      const response = await $fetch<CalendarApiResponse>(url)
      const transformedEvents = (response.items || []).map(transformEvent)

      events.value = transformedEvents
      setCachedEvents(transformedEvents)
    } catch (e) {
      console.error('[useCalendarEvents] Failed to fetch events:', e)
      error.value = e instanceof Error ? e : new Error('Failed to fetch calendar events')
    } finally {
      pending.value = false
    }
  }

  /**
   * Force refresh events, bypassing cache
   */
  const refresh = () => fetchEvents(true)

  // Initial fetch on client side
  if (import.meta.client) {
    fetchEvents()
  }

  return {
    events,
    pending,
    error,
    refresh,
  }
}
