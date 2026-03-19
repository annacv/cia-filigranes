import { getMatchedContentKeyByTitle, useCalendarEvents } from '~/composables/calendar/use-calendar-events.composable'

export const useContentSchedule = (contentType: 'shows' | 'workshops' | 'performances') => {
  const { events } = useCalendarEvents()

  const getScheduleDateForContentKey = (contentKey: string) => {
    const matchingEvent = events.value.find((event) => {
      return (
        event.eventType === contentType &&
        getMatchedContentKeyByTitle(event.title, event.eventType) === contentKey
      )
    })

    return matchingEvent?.start
  }

  const scheduleDate = computed(() => {
    const matchingEvent = events.value.find((event) => {
      return event.eventType === contentType
    })

    return matchingEvent?.start
  })

  return {
    getScheduleDateForContentKey,
    scheduleDate,
  }
}
