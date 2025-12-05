import { computed, readonly, watch, onMounted, type Ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useState } from '#app'

const BOTTOM_THRESHOLD = 200

/**
 * SSR-safe scroll state composable
 * Provides reactive scroll state that is safe for server-side rendering
 * Uses Nuxt's useState for request-scoped state management
 * 
 * @returns { isScrolled, hasReachedBottom } - Reactive scroll state flags
 */
export function useScrollState(): {
  isScrolled: Readonly<Ref<boolean>>
  hasReachedBottom: Readonly<Ref<boolean>>
} {
  // Use Nuxt's useState for SSR-safe, request-scoped state
  // This ensures state is isolated per request on the server
  const enableScrollDetection = useState('scroll:enableDetection', () => false)
  const scrollY = useState('scroll:y', () => 0)

  // Early return for SSR - return inert refs
  if (import.meta.server) {
    return {
      isScrolled: readonly(computed(() => false)),
      hasReachedBottom: readonly(computed(() => false))
    }
  }

  // Sync with VueUse's useWindowScroll on client
  const { y: windowScrollY } = useWindowScroll()
  
  // Watch and sync scroll position to useState
  watch(windowScrollY, (newY) => {
    scrollY.value = newY
  }, { immediate: true })

  // Enable scroll detection after hydration
  onMounted(() => {
    setTimeout(() => {
      enableScrollDetection.value = true
    }, 100)
  })

  const isScrolled = computed(() => {
    if (!enableScrollDetection.value) return false
    return scrollY.value > 0
  })

  const hasReachedBottom = computed(() => {
    if (!enableScrollDetection.value) return false
    if (typeof window === 'undefined') return false
    
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    return scrollY.value + windowHeight >= documentHeight - BOTTOM_THRESHOLD
  })

  return {
    isScrolled: readonly(isScrolled),
    hasReachedBottom: readonly(hasReachedBottom)
  }
}

