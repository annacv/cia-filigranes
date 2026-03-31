import { EVENT_TYPE_ITEMS } from '~/constants'
import { getMatchedContentKeyByTitle, useCalendarEvents } from '~/composables/calendar/use-calendar-events.composable'
import { useCalendarLayout } from '~/composables/calendar/use-calendar-layout.composable'
import type { ContentType, EventTypeItem } from '~/types'

const ALL_SHOWS_FILTER_VALUE = 'all-shows'
const ALL_WORKSHOPS_FILTER_VALUE = 'all-workshops'

type AgendaFilterContentType = Extract<ContentType, 'shows' | 'workshops'>

interface UseContentAgendaOptions {
  allFilterLabelKey: string
  allFilterValue: string
  contentKey: string
  contentType: AgendaFilterContentType
}

const getIndicatorClasses = (contentType: AgendaFilterContentType) => {
  const filterItem = EVENT_TYPE_ITEMS.find((item) => item.value === contentType)

  return {
    activeIndicatorClass: filterItem?.activeIndicatorClass ?? 'bg-primary-500',
    inactiveIndicatorClass: filterItem?.inactiveIndicatorClass ?? 'bg-primary-300',
  }
}

const useContentAgenda = ({ allFilterLabelKey, allFilterValue, contentKey, contentType }: UseContentAgendaOptions) => {
  const { t } = useI18n()
  const { events: sharedEvents, pending, error } = useCalendarEvents()
  const { maxVisibleEvents } = useCalendarLayout()
  const contentIndicatorClasses = getIndicatorClasses(contentType)

  const selectedPrimaryFilter = ref<string>(contentKey)
  const showOnlyOpenToPublic = ref(false)

  const primaryFilterOptions = computed<EventTypeItem[]>(() => ([
    {
      value: contentKey,
      labelKey: `routes.${contentKey}`,
      ...contentIndicatorClasses,
    },
    {
      value: allFilterValue,
      labelKey: allFilterLabelKey,
      ...contentIndicatorClasses,
    },
  ]))

  const events = computed(() => {
    return sharedEvents.value.filter((event) => event.eventType === contentType)
  })

  const hasScheduledContent = computed(() => {
    return events.value.some((event) => {
      return getMatchedContentKeyByTitle(event.title, event.eventType) === contentKey
    })
  })

  const filteredEvents = computed(() => {
    return events.value.filter((event) => {
      if (
        selectedPrimaryFilter.value === contentKey &&
        getMatchedContentKeyByTitle(event.title, event.eventType) !== contentKey
      ) return false
      if (showOnlyOpenToPublic.value && event.isClosedGroupEvent) return false
      return true
    })
  })

  const hasActiveFilters = computed(() => {
    return selectedPrimaryFilter.value !== contentKey || showOnlyOpenToPublic.value
  })

  return {
    error,
    events,
    filteredEvents,
    hasActiveFilters,
    hasScheduledContent,
    maxVisibleEvents,
    pending,
    primaryFilterOptions,
    selectedPrimaryFilter,
    showOnlyOpenToPublic,
  }
}

export const useShowAgenda = (contentKey: string) => {
  const agenda = useContentAgenda({
    contentKey,
    contentType: 'shows',
    allFilterLabelKey: 'agenda.filters.allShows',
    allFilterValue: ALL_SHOWS_FILTER_VALUE,
  })

  return {
    ...agenda,
    liveShowFilterOptions: agenda.primaryFilterOptions,
    selectedLiveShowFilter: agenda.selectedPrimaryFilter,
  }
}

export const useWorkshopAgenda = (contentKey: string) => {
  const agenda = useContentAgenda({
    contentKey,
    contentType: 'workshops',
    allFilterLabelKey: 'agenda.filters.allWorkshops',
    allFilterValue: ALL_WORKSHOPS_FILTER_VALUE,
  })

  return {
    ...agenda,
    selectedWorkshopFilter: agenda.selectedPrimaryFilter,
    workshopFilterOptions: agenda.primaryFilterOptions,
  }
}
