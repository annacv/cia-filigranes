import type { CalendarApiResponse } from '~/types'
import { transformGoogleCalendarEvents } from '~/utils/calendar-events'

const CALENDAR_HISTORY_MAX_RESULTS = 700

export const useCalendarHistory = () => {
  const config = useRuntimeConfig()

  const { data, pending, error, refresh } = useAsyncData(
    'calendar-history-events',
    () => {
      const apiKey = config.public.googleCalendarApiKey
      const calendarId = config.public.googleCalendarId

      if (!apiKey || !calendarId) {
        throw new Error('Calendar API is not configured')
      }

      const currentYear = new Date().getFullYear()
      const timeMin = new Date(`${currentYear}-01-01T00:00:00.000Z`).toISOString()
      const params = new URLSearchParams({
        key: apiKey,
        singleEvents: 'true',
        orderBy: 'startTime',
        timeMin,
        maxResults: String(CALENDAR_HISTORY_MAX_RESULTS),
      })

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params.toString()}`

      return $fetch<CalendarApiResponse>(url).then((response) => {
        return transformGoogleCalendarEvents(response.items || [])
      })
    },
    {
      default: () => [],
      server: false,
    },
  )

  return {
    events: data,
    pending,
    error,
    refresh,
  }
}
