import type { CalendarApiResponse } from '~/types'

interface FetchGoogleCalendarEventsOptions {
  apiKey: string
  calendarId: string
  timeMin?: string
  maxResults: number
}

export const fetchGoogleCalendarEvents = async ({
  apiKey,
  calendarId,
  timeMin,
  maxResults,
}: FetchGoogleCalendarEventsOptions): Promise<CalendarApiResponse> => {
  const params = new URLSearchParams({
    key: apiKey,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: String(maxResults),
  })

  if (timeMin) {
    params.set('timeMin', timeMin)
  }

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params.toString()}`
  return await $fetch<CalendarApiResponse>(url)
}
