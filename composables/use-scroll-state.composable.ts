import { computed, readonly, ref, type Ref } from 'vue'
import { useWindowScroll, useWindowSize } from '@vueuse/core'
import { useState } from '#app'
import { tryOnMounted, tryOnBeforeUnmount } from '@vueuse/core'

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
  const documentScrollHeight = ref<number>(0)

  let resizeObserver: ResizeObserver | null = null
  let updateScrollHeight: (() => void) | null = null

  tryOnMounted(() => {
    documentScrollHeight.value = document.documentElement.scrollHeight

    // Use ResizeObserver to track changes to document scrollHeight
    // This fires when content is added/removed or layout changes
    resizeObserver = new ResizeObserver(() => {
      documentScrollHeight.value = document.documentElement.scrollHeight
    })
    resizeObserver.observe(document.body)

    // Listen to scroll and resize events to catch dynamic content changes
    updateScrollHeight = () => {
      documentScrollHeight.value = document.documentElement.scrollHeight
    }
    window.addEventListener('scroll', updateScrollHeight, { passive: true })
    window.addEventListener('resize', updateScrollHeight, { passive: true })
    
    // Enable scroll detection after hydration
    setTimeout(() => {
      enableScrollDetection.value = true
    }, 100)
  })

  tryOnBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
    if (updateScrollHeight) {
      window.removeEventListener('scroll', updateScrollHeight)
      window.removeEventListener('resize', updateScrollHeight)
      updateScrollHeight = null
    }
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

