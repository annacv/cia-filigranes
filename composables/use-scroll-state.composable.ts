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
  // Track initial scroll position at mount to prevent state persistence
  const initialScrollY = ref<number>(0)

  let resizeObserver: ResizeObserver | null = null
  let updateScrollHeight: (() => void) | null = null
  let enableDetectionFrameId: number | null = null

  tryOnMounted(() => {
    // Check actual scroll position at mount before any delays
    // This prevents using stale windowScrollY values from previous route
    initialScrollY.value = window.scrollY

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
    
    // Enable scroll detection after hydration using requestAnimationFrame
    // Wait for 2 frames to ensure browser is ready and scroll position is stable
    // Also actively prevent browser scroll restoration during this period
    let frameCount = 0
    let lastScrollY = window.scrollY
    const enableDetection = () => {
      frameCount++
      const currentScrollY = window.scrollY
      
      // Detect if browser restored scroll position (scroll changed unexpectedly)
      // If scroll was restored, reset it and keep initialScrollY at 0
      if (currentScrollY !== lastScrollY && currentScrollY > 0 && lastScrollY === 0) {
        window.scrollTo(0, 0)
        lastScrollY = 0
        // Don't update initialScrollY - keep it at 0
      } else {
        lastScrollY = currentScrollY
      }
      
      if (frameCount < 3) {
        enableDetectionFrameId = requestAnimationFrame(enableDetection)
      } else {
        // Final check: if scroll is still not 0, reset it one more time
        // But keep initialScrollY at 0 (the value we captured at mount)
        if (window.scrollY > 0) {
          window.scrollTo(0, 0)
        }
        // Keep initialScrollY at the value captured at mount (should be 0)
        // Don't update it here even if scroll was restored
        enableScrollDetection.value = true
        enableDetectionFrameId = null
      }
    }
    enableDetectionFrameId = requestAnimationFrame(enableDetection)
  })

  tryOnBeforeUnmount(() => {
    if (enableDetectionFrameId !== null) {
      cancelAnimationFrame(enableDetectionFrameId)
      enableDetectionFrameId = null
    }
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
    // During delay period, use initial scroll position checked at mount
    // This prevents using stale windowScrollY values from previous route
    if (!enableScrollDetection.value) {
      return initialScrollY.value > 0
    }
    // After delay, use reactive windowScrollY for real-time updates
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

