import type { CalendarApiResponse } from '~/types'
import { transformGoogleCalendarEvents } from '~/utils/calendar-events'

const DEFAULT_MAX_RESULTS = 20

const parseMaxResults = (value: unknown) => {
  const normalizedValue = Array.isArray(value) ? value[0] : value
  const parsedValue = Number.parseInt(String(normalizedValue ?? DEFAULT_MAX_RESULTS), 10)

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return DEFAULT_MAX_RESULTS
  }

  return parsedValue
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
  const maxResults = parseMaxResults(getQuery(event).maxResults)
  const shouldFailSoft = import.meta.prerender

  if (!config.googleCalendarApiKey || !config.googleCalendarId) {
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
    const params = new URLSearchParams({
      key: config.googleCalendarApiKey,
      singleEvents: 'true',
      orderBy: 'startTime',
      timeMin: now,
      maxResults: String(maxResults),
    })

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.googleCalendarId)}/events?${params.toString()}`
    const response = await $fetch<CalendarApiResponse>(url)

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
