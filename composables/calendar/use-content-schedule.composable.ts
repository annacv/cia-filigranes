import { getMatchedContentKeyByTitle, useCalendarEvents } from '~/composables/calendar/use-calendar-events.composable'
import type { ContentType } from '~/types'

type SchedulableContentType = Extract<ContentType, 'shows' | 'workshops' | 'performances'>

export const isSchedulableContentType = (contentType: ContentType): contentType is SchedulableContentType => {
  return contentType === 'shows' || contentType === 'workshops' || contentType === 'performances'
}

export const useContentSchedule = (contentType?: SchedulableContentType) => {
  const { events } = useCalendarEvents()

  const scheduleDatesByType = computed(() => {
    const datesByType: Record<SchedulableContentType, Map<string, string>> = {
      performances: new Map<string, string>(),
      shows: new Map<string, string>(),
      workshops: new Map<string, string>(),
    }

    for (const event of events.value) {
      if (!isSchedulableContentType(event.eventType)) continue

      const matchedContentKey = getMatchedContentKeyByTitle(event.title, event.eventType)
      if (matchedContentKey && !datesByType[event.eventType].has(matchedContentKey)) {
        datesByType[event.eventType].set(matchedContentKey, event.start)
      }
    }

    return datesByType
  })

  const firstScheduleDateByType = computed(() => {
    const datesByType: Partial<Record<SchedulableContentType, string>> = {}

    for (const event of events.value) {
      if (!isSchedulableContentType(event.eventType) || datesByType[event.eventType]) continue
      datesByType[event.eventType] = event.start
    }

    return datesByType
  })

  const getScheduleDateForContentKey = (contentKey: string, targetContentType = contentType) => {
    if (!targetContentType) return undefined
    return scheduleDatesByType.value[targetContentType].get(contentKey)
  }

  const scheduleDate = computed(() => {
    if (!contentType) {
      return undefined
    }

    return firstScheduleDateByType.value[contentType]
  })

  return {
    getScheduleDateForContentKey,
    scheduleDate,
  }
}
