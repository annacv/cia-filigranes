import { transformGoogleCalendarEvents } from '~/utils/calendar-events'
import { fetchGoogleCalendarEvents } from '~/utils/google-calendar'

const CALENDAR_HISTORY_MAX_RESULTS = 700

export const useCalendarHistory = () => {
  const config = useRuntimeConfig()

  const { data, pending, error, refresh } = useAsyncData(
    'calendar-history-events',
    async () => {
      const apiKey = config.public.googleCalendarApiKey
      const calendarId = config.public.googleCalendarId

      if (!apiKey || !calendarId) {
        throw new Error('Calendar API is not configured')
      }

      const currentYear = new Date().getFullYear()
      const timeMin = new Date(`${currentYear}-01-01T00:00:00.000Z`).toISOString()
      const response = await fetchGoogleCalendarEvents({
        apiKey,
        calendarId,
        timeMin,
        maxResults: CALENDAR_HISTORY_MAX_RESULTS,
      })

      return transformGoogleCalendarEvents(response.items || [])
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
