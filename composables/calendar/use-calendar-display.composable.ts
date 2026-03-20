import type { CalendarEvent, ContentType } from '~/types'
import { useDateFormat } from '~/composables/calendar/use-date-format.composable'
import { useImageAlt } from '~/composables/use-image-alt.composable'

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

export const useCalendarDisplay = (event?: ComputedRef<CalendarEvent | undefined>) => {
  const { t } = useI18n()
  const { formatEventTime } = useDateFormat()

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

  return {
    footerColor,
    formatEventTime,
    imageAlt,
    mainColor,
    reservationLabel,
  }
}
