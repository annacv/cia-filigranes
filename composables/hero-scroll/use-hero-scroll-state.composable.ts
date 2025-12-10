import { watch, nextTick } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useState } from '#app'
import { heroScrollRuntime } from './runtime'

const SCROLL_DETECTION_ENABLE_DELAY_MS = 100

export interface UseHeroScrollStateReturn {
  enableScrollDetection: ReturnType<typeof useState<boolean>>
  hasHandledFirstScroll: ReturnType<typeof useState<boolean>>
  windowScrollY: ReturnType<typeof useWindowScroll>['y']
  setup: (onScrollToTopReset: () => void, onScrollDetected: () => void) => void
  teardown: () => void
}

/**
 * Manages hero scroll state and Nuxt lifecycle hooks
 * 
 * Handles:
 * - SSR-safe state using useState
 * - Nuxt page:finish hook for navigation reset
 * - Scroll detection enable delay
 * - Window scroll position watching for reset logic
 */
export function useHeroScrollState(): UseHeroScrollStateReturn {
  // SSR-safe state using useState for request-scoped isolation
  const enableScrollDetection = useState('hero-scroll:enableDetection', () => false)
  const hasHandledFirstScroll = useState('hero-scroll:hasHandledFirstScroll', () => false)
  const { y: windowScrollY } = useWindowScroll()

  const setup = (
    onScrollToTopReset: () => void,
    onScrollDetected: () => void
  ): void => {
    // Hook into page navigation to reset scroll hijack state after navigation
    // Using page:finish ensures this runs after app.vue scrolls to (0, 0)
    const nuxtApp = useNuxtApp()
    heroScrollRuntime.pageFinishUnsubscribe = nuxtApp.hook('page:finish', () => {
      // Clean up any ongoing scroll prevention from the previous page
      hasHandledFirstScroll.value = false
      onScrollToTopReset()
    })

    // Enable scroll detection after a delay to ensure hydration is complete
    heroScrollRuntime.scrollDetectionEnableTimeout = setTimeout(() => {
      enableScrollDetection.value = true
    }, SCROLL_DETECTION_ENABLE_DELAY_MS)

    // Watch windowScrollY (reactive) for when user returns to top
    // Reset the flag so scroll-to-anchor can trigger again
    heroScrollRuntime.scrollWatcherStop = watch(
      windowScrollY,
      (newScrollY, oldScrollY) => {
        if (!enableScrollDetection.value) return

        if (newScrollY === 0 && hasHandledFirstScroll.value) {
          hasHandledFirstScroll.value = false
          onScrollToTopReset()
          return
        }

        // Fallback: also watch for cases where wheel/touch events don't fire (first scroll)
        if (!hasHandledFirstScroll.value && oldScrollY === 0 && newScrollY > 0) {
          hasHandledFirstScroll.value = true

          nextTick(() => {
            onScrollDetected()
          })
        }
      },
      { immediate: false }
    )
  }

  const teardown = (): void => {
    if (heroScrollRuntime.scrollDetectionEnableTimeout) {
      clearTimeout(heroScrollRuntime.scrollDetectionEnableTimeout)
      heroScrollRuntime.scrollDetectionEnableTimeout = null
    }
    if (heroScrollRuntime.scrollWatcherStop) {
      heroScrollRuntime.scrollWatcherStop()
      heroScrollRuntime.scrollWatcherStop = null
    }
    if (heroScrollRuntime.pageFinishUnsubscribe) {
      heroScrollRuntime.pageFinishUnsubscribe()
      heroScrollRuntime.pageFinishUnsubscribe = null
    }
    hasHandledFirstScroll.value = false
    enableScrollDetection.value = false
  }

  return {
    enableScrollDetection,
    hasHandledFirstScroll,
    windowScrollY,
    setup,
    teardown,
  }
}

