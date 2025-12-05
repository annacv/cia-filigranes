import { computed, readonly, type Ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useState } from '#app'
import { tryOnMounted } from '@vueuse/core'

const BOTTOM_THRESHOLD = 200

/**
 * SSR-safe scroll state composable
 * Provides reactive scroll state that is safe for server-side rendering
 * Uses Nuxt's useState for request-scoped state management
 * 
 * @returns { isScrolled, hasReachedBottom }
 */
export function useScrollState(): {
  isScrolled: Readonly<Ref<boolean>>
  hasReachedBottom: Readonly<Ref<boolean>>
} {
  const enableScrollDetection = useState('scroll:enableDetection', () => false)

  // Early return for SSR - return inert refs
  if (import.meta.server) {
    return {
      isScrolled: readonly(computed(() => false)),
      hasReachedBottom: readonly(computed(() => false))
    }
  }

  // Use useWindowScroll directly for reactivity
  const { y: windowScrollY } = useWindowScroll()

  tryOnMounted(() => {
    // Enable scroll detection after hydration
    setTimeout(() => {
      enableScrollDetection.value = true
    }, 100)
  })

  const isScrolled = computed(() => {
    if (!enableScrollDetection.value) return false
    return windowScrollY.value > 0
  })

  const hasReachedBottom = computed(() => {
    if (!enableScrollDetection.value) return false
    if (typeof window === 'undefined') return false
    
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    return windowScrollY.value + windowHeight >= documentHeight - BOTTOM_THRESHOLD
  })

  return {
    isScrolled: readonly(isScrolled),
    hasReachedBottom: readonly(hasReachedBottom)
  }
}

