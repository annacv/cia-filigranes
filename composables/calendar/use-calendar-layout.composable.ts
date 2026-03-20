import { useWindowSize } from '@vueuse/core'

export const useCalendarLayout = () => {
  const { width } = useWindowSize()

  const maxVisibleEvents = computed(() => {
    if (width.value >= 1536) return 4
    if (width.value >= 1024) return 3
    return 2
  })

  const eventsPerPage = computed(() => {
    return maxVisibleEvents.value === 4 ? 8 : 6
  })

  return {
    eventsPerPage,
    maxVisibleEvents,
  }
}
