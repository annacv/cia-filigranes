import { computed, readonly, ref } from 'vue'
import { useScroll as useVueUseScroll } from '@vueuse/core'

const BOTTOM_THRESHOLD = 500

// SSR-safe scroll state
const { y: scrollY } = useVueUseScroll(
  typeof window !== 'undefined' ? window : null
)

// Track if we should enable scroll detection (post-hydration)
const enableScrollDetection = ref(false)

// Enable scroll detection after a delay to ensure hydration is complete
if (process.client) {
  // Use a longer timeout to ensure hydration is completely finished
  setTimeout(() => {
    enableScrollDetection.value = true
  }, 100)
}

const isScrolled = computed(() => {
  if (!enableScrollDetection.value) return false // Always false during SSR and initial hydration
  return scrollY.value > 0
})

const hasReachedBottom = computed(() => {
  if (!enableScrollDetection.value) return false // Always false during SSR and initial hydration
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  return scrollY.value + windowHeight >= documentHeight - BOTTOM_THRESHOLD
})

const scrollProgress = computed(() => {
  if (!enableScrollDetection.value) return 0 // Always 0 during SSR and initial hydration
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  return Math.min(scrollY.value / (documentHeight - windowHeight), 1)
})

export function useScroll() {
  return {
    isScrolled: readonly(isScrolled),
    hasReachedBottom: readonly(hasReachedBottom),
    scrollY: readonly(scrollY),
    scrollProgress: readonly(scrollProgress)
  }
}
