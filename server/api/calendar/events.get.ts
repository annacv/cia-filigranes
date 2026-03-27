import { transformGoogleCalendarEvents } from '~/utils/calendar-events'
import { fetchGoogleCalendarEvents } from '~/utils/google-calendar'

const DEFAULT_MAX_RESULTS = 20
const MAX_ALLOWED_RESULTS = 700

const parseMaxResults = (value: unknown) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value
  const parsedValue = Number.parseInt(String(normalizedValue ?? DEFAULT_MAX_RESULTS), 10)

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return DEFAULT_MAX_RESULTS
  }

  return Math.min(parsedValue, MAX_ALLOWED_RESULTS)
}

const parseIncludePast = (value: unknown) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value

  if (typeof normalizedValue !== 'string') {
    return false
  }

  return normalizedValue === 'true' || normalizedValue === '1'
}

const logFallback = (reason: string, error?: unknown) => {
  console.error(`[api/calendar/events] ${reason}`, error)
}

const createCalendarApiError = (statusCode: number, statusMessage: string) => {
  return createError({
    statusCode,
    statusMessage,
  })
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const query = getQuery(event)
  const maxResults = parseMaxResults(query.maxResults)
  const includePast = parseIncludePast(query.includePast)
  const shouldFailSoft = import.meta.prerender
  const googleCalendarApiKey = config.googleCalendarApiKey || config.public.googleCalendarApiKey
  const googleCalendarId = config.googleCalendarId || config.public.googleCalendarId

  if (!googleCalendarApiKey || !googleCalendarId) {
    const message = 'Missing Google Calendar API key or Calendar ID'

    if (shouldFailSoft) {
      console.warn(`[api/calendar/events] ${message}; returning empty prerender fallback`)
      return []
    }

    logFallback(message)
    throw createCalendarApiError(500, 'Calendar API is not configured')
  }

  try {
    const now = new Date().toISOString()
    const response = await fetchGoogleCalendarEvents({
      apiKey: googleCalendarApiKey,
      calendarId: googleCalendarId,
      maxResults,
      timeMin: includePast ? undefined : now,
    })

    return transformGoogleCalendarEvents(response.items || [])
  } catch (error) {
    if (shouldFailSoft) {
      logFallback('Failed to fetch events during prerender; returning empty fallback.', error)
      return []
    }

    logFallback('Failed to fetch events:', error)
    throw createCalendarApiError(502, 'Failed to fetch calendar events')
  }
})
