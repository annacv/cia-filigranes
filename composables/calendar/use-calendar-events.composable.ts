import type { CalendarEvent, CalendarApiResponse, GoogleCalendarEvent, ContentType, CardImage } from '~/types'
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
  // Espectacles "fora de carta" o pendents d'afegir a la web
  'germans filigranes': 'germans-filigranes',
  'els germans filigranes': 'germans-filigranes',
  'vendaval': 'vendaval',
  // Col·laboracions:
  'el circ filikrusty': 'circ-filikrusty',
  'heeelp': 'heeelp',
  'help': 'heeelp',
  'fingerlight': 'fingerlight',
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

// Uses the same base keys as HighlightPerformances
const PERFORMANCES_TITLE_TO_IMAGE_KEY: Record<string, string> = {
  'animacions a la carta': 'caixes-1',
  'animacio amb malabars de foc': 'foc',
  'animacio circ d epoca': 'circ-epoca',
  'animacio malabars amb caixes': 'caixes-1',
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

const getTitleMapByEventType = (eventType: ContentType): Record<string, string> | null => {
  return eventType === 'shows'
    ? SHOWS_TITLE_TO_IMAGE_KEY
    : eventType === 'workshops'
      ? WORKSHOPS_TITLE_TO_IMAGE_KEY
      : eventType === 'performances'
        ? PERFORMANCES_TITLE_TO_IMAGE_KEY
        : null
}

const getImageRouteByEventType = (eventType: ContentType) => {
  return eventType === 'shows'
    ? 'espectacles'
    : eventType === 'workshops'
      ? 'tallers'
      : 'animacions'
}

export const getMatchedContentKeyByTitle = (title: string, eventType: ContentType): string | undefined => {
  const normalizedTitle = normalizeTitle(title)
  const titleMap = getTitleMapByEventType(eventType)
  if (!titleMap) return undefined

  const exact = titleMap[normalizedTitle]
  if (exact) return exact

  const matched = Object.entries(titleMap).find(([candidate]) => {
    return normalizedTitle.includes(candidate)
  })

  return matched?.[1]
}

const getEventImageByTitle = (title: string, eventType: ContentType): CardImage | undefined => {
  const matchedContentKey = getMatchedContentKeyByTitle(title, eventType)
  if (!matchedContentKey) return undefined

  return getImageByRoute(getImageRouteByEventType(eventType), matchedContentKey)
}

const getFallbackImageForType = (eventType: ContentType): CardImage | undefined => {
  switch (eventType) {
    case 'shows':
      return getImageByRoute('espectacles', 'fallback')
    case 'workshops':
      return getImageByRoute('tallers', 'fallback')
    case 'performances':
      return getImageByRoute('animacions', 'caixes-1')
    default:
      return undefined
  }
}

/** Matches first http:// or https:// URL in text; returns { link, raw } so description can be stripped of the exact raw match */
const extractUrlFromDescription = (description: string | undefined): { link: string; raw: string } | undefined => {
  if (!description || typeof description !== 'string') return undefined
  const match = description.match(/https?:\/\/[^\s]+/)
  if (!match) return undefined
  const raw = match[0]
  const link = raw.replace(/[.,;:)\]]+$/, '')
  return { link, raw }
}

/**
 * Transforms a Google Calendar API event to a normalized CalendarEvent format
 */
const transformEvent = (event: GoogleCalendarEvent): CalendarEvent => {
  const isAllDay = !event.start.dateTime
  const normalizedSummary = event.summary.replace(/@/g, 'o')

  // Use a fully normalized version of the summary for type detection so
  // accents and punctuation don't affect matching.
  const typeDetectionSource = normalizeTitle(event.summary)
  const typeWords = typeDetectionSource.split(' ')

  const hasEspectacle = typeDetectionSource.includes('espectacle') || typeDetectionSource.includes('espectacles')
  const hasNumero = typeDetectionSource.includes('numero')
  const hasWorkshopTerm = typeWords.some((word) => word === 'taller' || word === 'tallers')
  const hasPerformanceTerm = typeDetectionSource.includes('animacio') || typeDetectionSource.includes('animacions')

  // Priority rules:
  // 1) "espectacle" → shows
  // 2) "número" (numero) or "animació" → performances
  // 3) "taller(s)" → workshops
  // 4) fallback → shows
  let eventType: ContentType
  if (hasEspectacle) {
    eventType = 'shows'
  } else if (hasNumero || hasPerformanceTerm) {
    eventType = 'performances'
  } else if (hasWorkshopTerm) {
    eventType = 'workshops'
  } else {
    eventType = 'shows'
  }

  const titleForDisplay = hasEspectacle
    ? normalizedSummary.replace(/^\s*Espectacle\s+/i, '')
    : normalizedSummary

  const urlResult = extractUrlFromDescription(event.description)
  const description = event.description
    ? (urlResult ? event.description.replace(urlResult.raw, '').replace(/\s+/g, ' ').trim() : event.description)
    : undefined
  return {
    id: event.id,
    eventType,
    title: titleForDisplay,
    description: description || undefined,
    location: event.location,
    image: getEventImageByTitle(normalizedSummary, eventType) ?? getFallbackImageForType(eventType),
    reservationLink: urlResult?.link,
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
