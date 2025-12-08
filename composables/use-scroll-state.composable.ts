import { computed, readonly, ref, type Ref } from 'vue'
import { useWindowScroll, useWindowSize, useElementSize } from '@vueuse/core'
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

  // Use reactive sources for all values that affect bottom detection
  const { y: windowScrollY } = useWindowScroll()
  const { height: windowHeight } = useWindowSize()
  const documentElementRef = ref<HTMLElement | null>(null)
  const { height: documentScrollHeight } = useElementSize(documentElementRef)

  tryOnMounted(() => {
    documentElementRef.value = document.documentElement
    
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
    
    return windowScrollY.value + windowHeight.value >= documentScrollHeight.value - BOTTOM_THRESHOLD
  })

  return {
    isScrolled: readonly(isScrolled),
    hasReachedBottom: readonly(hasReachedBottom)
  }
}

