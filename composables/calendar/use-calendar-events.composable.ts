import type { CalendarEvent } from '~/types'
import { transformGoogleCalendarEvents } from '~/utils/calendar-events'
import { fetchGoogleCalendarEvents } from '~/utils/google-calendar'

export { getMatchedContentKeyByTitle } from '~/utils/calendar-events'

const CALENDAR_EVENTS_ENDPOINT = '/api/calendar/events'
const DEFAULT_MAX_RESULTS = 80
const SESSION_CACHE_KEY = 'filigranes-calendar-events'

let inFlightEventsRequest: Promise<void> | null = null

interface UseCalendarEventsOptions {
  maxResults?: number
}

interface SessionCachedData {
  events: CalendarEvent[]
  maxResults?: number
  timestamp: number
}

const getSessionCachedEvents = (): SessionCachedData | null => {
  try {
    const cached = sessionStorage.getItem(SESSION_CACHE_KEY)
    if (!cached) return null
    return JSON.parse(cached) as SessionCachedData
  } catch {
    return null
  }
}

const setSessionCachedEvents = (events: CalendarEvent[], maxResults: number): void => {
  try {
    sessionStorage.setItem(SESSION_CACHE_KEY, JSON.stringify({
      events,
      maxResults,
      timestamp: Date.now(),
    }))
  } catch {
    // sessionStorage might be unavailable, ignore
  }
}

/**
 * Composable for fetching and caching normalized calendar events.
 * Fetches prerender snapshots from the internal calendar endpoint on the server
 * and live Google Calendar data in the browser.
 * Results are shared through Nuxt state and cached per session in the browser.
 *
 * @param options - Optional configuration
 * @param options.maxResults - Maximum number of events to fetch (default: 20)
 * @returns Object containing events array, pending state, error state, and refresh function
 */
export const useCalendarEvents = (options?: UseCalendarEventsOptions) => {
  const maxResults = options?.maxResults ?? DEFAULT_MAX_RESULTS
  const config = useRuntimeConfig()
  const events = useState<CalendarEvent[]>('calendar-events-events', () => [])
  const pending = useState('calendar-events-pending', () => false)
  const errorMessage = useState<string | null>('calendar-events-error-message', () => null)
  const hasLoadedSharedEvents = useState('calendar-events-has-loaded', () => false)
  const hasLoadedSessionEvents = useState('calendar-events-session-loaded', () => false)
  const sharedLoadedMaxResults = useState('calendar-events-loaded-max-results', () => 0)
  const error = computed<Error | null>(() => {
    return errorMessage.value ? new Error(errorMessage.value) : null
  })

  const applySharedEvents = (nextEvents: CalendarEvent[], fetchedMaxResults: number, fromClientSession = false) => {
    events.value = nextEvents
    hasLoadedSharedEvents.value = true
    sharedLoadedMaxResults.value = Math.max(sharedLoadedMaxResults.value, fetchedMaxResults)
    if (fromClientSession && import.meta.client) {
      hasLoadedSessionEvents.value = true
    }
  }

  const hasSufficientSharedEvents = () => {
    if (!hasLoadedSharedEvents.value) return false
    return sharedLoadedMaxResults.value >= maxResults
  }

  const hasSufficientSessionEvents = () => {
    if (!hasLoadedSessionEvents.value) return false
    return sharedLoadedMaxResults.value >= maxResults
  }

  const getFetchQuery = () => {
    return maxResults === DEFAULT_MAX_RESULTS ? undefined : { maxResults }
  }

  const fetchPrerenderSnapshot = async () => {
    const requestFetch = useRequestFetch()
    return await requestFetch(CALENDAR_EVENTS_ENDPOINT, {
      query: getFetchQuery()
    }) as CalendarEvent[]
  }

  const fetchLiveCalendarEvents = async () => {
    const apiKey = config.public.googleCalendarApiKey
    const calendarId = config.public.googleCalendarId

    if (!apiKey || !calendarId) {
      throw new Error('Calendar API is not configured')
    }

    const now = new Date().toISOString()
    const response = await fetchGoogleCalendarEvents({
      apiKey,
      calendarId,
      timeMin: now,
      maxResults,
    })

    return transformGoogleCalendarEvents(response.items || [])
  }

  const fetchEvents = async (forceRefresh = false) => {
    if (import.meta.server) {
      if (!forceRefresh && hasSufficientSharedEvents()) {
        pending.value = false
        return
      }

      pending.value = true
      errorMessage.value = null

      try {
        const response = await fetchPrerenderSnapshot()
        applySharedEvents(response, maxResults)
      } catch (e) {
        console.error('[useCalendarEvents] Failed to fetch prerender snapshot:', e)
        errorMessage.value = e instanceof Error ? e.message : 'Failed to fetch calendar events'
      } finally {
        pending.value = false
      }
      return
    }

    if (!forceRefresh) {
      const cachedEvents = getSessionCachedEvents()
      if (cachedEvents && (cachedEvents.maxResults === undefined || cachedEvents.maxResults >= maxResults)) {
        applySharedEvents(cachedEvents.events, cachedEvents.maxResults ?? maxResults, true)
        pending.value = false
        errorMessage.value = null
        return
      }

      if (hasSufficientSessionEvents()) {
        pending.value = false
        return
      }
    }

    const hasExistingEvents = hasLoadedSharedEvents.value && events.value.length > 0

    if (!forceRefresh && hasExistingEvents && hasLoadedSessionEvents.value && sharedLoadedMaxResults.value >= maxResults) {
      pending.value = false
      return
    }

    if (inFlightEventsRequest) {
      return inFlightEventsRequest
    }

    if (!hasExistingEvents) {
      pending.value = true
      errorMessage.value = null
    }

    inFlightEventsRequest = (async () => {
      try {
        const response = await fetchLiveCalendarEvents()
        applySharedEvents(response, maxResults, true)
        setSessionCachedEvents(response, maxResults)
      } catch (e) {
        console.error('[useCalendarEvents] Failed to fetch events:', e)
        if (!hasExistingEvents) {
          errorMessage.value = e instanceof Error ? e.message : 'Failed to fetch calendar events'
        }
      } finally {
        pending.value = false
        inFlightEventsRequest = null
      }
    })()

    return inFlightEventsRequest
  }

  /**
   * Force refresh events, bypassing cache
   */
  const refresh = () => fetchEvents(true)

  const ensureLoaded = () => fetchEvents(false)

  // Initial fetch on client side when the page was not prerendered with events.
  if (import.meta.client) {
    void ensureLoaded()
  }

  return {
    events,
    pending,
    error,
    ensureLoaded,
    refresh,
  }
}
