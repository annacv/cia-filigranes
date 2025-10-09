import { ref, type Ref, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useIntersection80() {
  const isVisibleAt80Percent = ref(false)
  let cleanup: (() => void) | null = null

  const setupIntersectionObserver = (target: Ref<HTMLElement | undefined>) => {
    // Clean up previous observer if exists
    if (cleanup) cleanup()
    const { stop } = useIntersectionObserver(
      target,
      ([entry]) => {
        if (entry) {
          if (entry.intersectionRatio >= 0.8) {
            isVisibleAt80Percent.value = true
          } else if (entry.intersectionRatio === 0) {
            isVisibleAt80Percent.value = false
          }
        }
      },
      { threshold: [0, 0.8, 1] }
    )
    cleanup = stop
  }

  // Stop the observer when the component unmounts
  onUnmounted(() => {
    if (cleanup) cleanup()
  })

  return { isVisibleAt80Percent, setupIntersectionObserver }
}
