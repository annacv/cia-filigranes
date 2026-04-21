import type { ContentType } from '~/types'
import type { CalendarEvent } from '~/types/agenda'
import { useDateFormat } from '~/composables/calendar/use-date-format.composable'
import { useImageAlt } from '~/composables/use-image-alt.composable'
import { getRouteTranslationKeyByTitle } from '~/utils/calendar-events'

const MAIN_COLOR_MAP: Record<ContentType, string> = {
  shows: 'bg-primary-500',
  workshops: 'bg-secondary-500',
  performances: 'bg-tertiary-500',
  filipersones: 'bg-primary-500',
  contact: 'bg-primary-500',
}

const FOOTER_COLOR_MAP: Record<ContentType, string> = {
  shows: 'bg-primary-400',
  workshops: 'bg-secondary-400',
  performances: 'bg-tertiary-400',
  filipersones: 'bg-primary-400',
  contact: 'bg-primary-400',
}

type CalendarEventTitleSource = Pick<CalendarEvent, 'title' | 'eventType'>

export const useCalendarDisplay = (event?: ComputedRef<CalendarEvent | undefined>) => {
  const { t, te } = useI18n()
  const { formatEventTime } = useDateFormat()

  const getDisplayTitle = (eventTitleSource: CalendarEventTitleSource): string => {
    const routeTranslationKey = getRouteTranslationKeyByTitle(eventTitleSource.title, eventTitleSource.eventType)
    const translatedBaseTitle = routeTranslationKey && te(routeTranslationKey)
      ? t(routeTranslationKey)
      : eventTitleSource.title

    if (eventTitleSource.eventType === 'workshops' && te('workshops.commonTitle')) {
      return t('workshops.commonTitle', { title: translatedBaseTitle })
    }

    return translatedBaseTitle
  }

  const imageAlt = computed(() => {
    if (!event?.value) return ''

    return useImageAlt(event.value.eventType, event.value.title)
  })

  const reservationLabel = computed(() => {
    if (!event?.value) return ''

    return event.value.eventType === 'workshops'
      ? t('agenda.reservationPlace')
      : t('agenda.reservationEntry')
  })

  const mainColor = computed(() => {
    if (!event?.value) return 'bg-primary-500'

    return MAIN_COLOR_MAP[event.value.eventType] ?? 'bg-primary-500'
  })

  const footerColor = computed(() => {
    if (!event?.value) return 'bg-primary-400'

    return FOOTER_COLOR_MAP[event.value.eventType] ?? 'bg-primary-400'
  })

  const displayTitle = computed(() => {
    if (!event?.value) return ''
    return getDisplayTitle(event.value)
  })

  return {
    displayTitle,
    footerColor,
    formatEventTime,
    getDisplayTitle,
    imageAlt,
    mainColor,
    reservationLabel,
  }
}
