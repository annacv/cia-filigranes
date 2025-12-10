/**
 * Hero Scroll Hijack - Global Singleton Scroll Behavior
 * 
 * This module implements a singleton scroll hijack that intercepts the first scroll
 * gesture from the top of the page and smoothly scrolls to the main content anchor
 * while following the hero cover animation.
 * 
 * ## Architecture
 * 
 * This is a global singleton that coordinates:
 * - Wheel and touch gesture detection
 * - SSR-safe state management via Nuxt useState
 * - Nuxt page navigation lifecycle
 * - Hero cover animation following
 * 
 * ## Dependencies
 * 
 * - Requires `[data-hero-cover]` element in the DOM
 * - Requires `#main-content-anchor` element in the DOM
 * - Uses Nuxt `page:finish` hook for navigation reset
 * - Uses VueUse `useWindowScroll` for scroll position tracking
 * 
 * ## Behavior
 * 
 * 1. On mount, sets up wheel and touch event listeners
 * 2. When user scrolls from top (scrollY === 0), intercepts the gesture
 * 3. Scrolls to `#main-content-anchor` while hero cover animates
 * 4. Follows the anchor position during animation using requestAnimationFrame
 * 5. Prevents additional scroll during animation
 * 6. Resets on navigation or when user scrolls back to top
 * 
 * ## Module Structure
 * 
 * - `runtime.ts` - Singleton runtime state object
 * - `use-hero-scroll-state.composable.ts` - State management and Nuxt hooks
 * - `use-hero-gesture-hijack.composable.ts` - Wheel/touch event handling
 * - `follow-anchor-animation.ts` - Animation following helper
 * 
 * ## Usage
 * 
 * ```ts
 * const { scrollToAnchor } = useHeroFirstScrollHijack()
 * // scrollToAnchor can be called manually if needed
 * ```
 * 
 * The composable automatically sets up on mount and tears down on unmount.
 * Multiple instances coordinate via the singleton runtime state.
 */

import { tryOnMounted, tryOnBeforeUnmount } from '@vueuse/core'
import { heroScrollRuntime } from './runtime'
import { useHeroScrollState } from './use-hero-scroll-state.composable'
import { useHeroGestureHijack } from './use-hero-gesture-hijack.composable'
import { scrollToAnchor } from './follow-anchor-animation'

/**
 * Global scroll hijack composable for hero first scroll behavior
 * 
 * This composable sets up a singleton scroll hijack that intercepts the first
 * scroll gesture from the top of the page and scrolls to the main content anchor.
 * 
 * @returns { scrollToAnchor } - Function to manually trigger scroll to anchor
 */
export function useHeroFirstScrollHijack(): {
  scrollToAnchor: () => void
} {
  // Early return for SSR - return no-op function
  if (import.meta.server) {
    return {
      scrollToAnchor: () => {},
    }
  }

  const state = useHeroScrollState()

  const handleScrollToAnchor = (): void => {
    if (heroScrollRuntime.followAnimationCleanup) {
      heroScrollRuntime.followAnimationCleanup()
      heroScrollRuntime.followAnimationCleanup = null
    }

    const cleanup = scrollToAnchor()
    if (cleanup) {
      heroScrollRuntime.followAnimationCleanup = cleanup
    }
  }

  const gestureHijack = useHeroGestureHijack({
    enableScrollDetection: state.enableScrollDetection,
    hasHandledFirstScroll: state.hasHandledFirstScroll,
    windowScrollY: state.windowScrollY,
    onScrollToAnchor: handleScrollToAnchor,
  })

  // Setup function that coordinates all pieces
  const setupScrollHijacking = (): void => {
    state.setup(
      () => {
        // onScrollToTopReset callback
        gestureHijack.setup()
      },
      () => {
        // onScrollDetected callback (fallback when events don't fire)
        gestureHijack.teardown()
        handleScrollToAnchor()
      }
    )

    gestureHijack.setup()
  }

  // Teardown function that cleans up all pieces
  const teardownScrollHijacking = (): void => {
    gestureHijack.teardown()
    state.teardown()

    if (heroScrollRuntime.followAnimationCleanup) {
      heroScrollRuntime.followAnimationCleanup()
      heroScrollRuntime.followAnimationCleanup = null
    }
  }

  tryOnMounted(() => {
    heroScrollRuntime.activeInstanceCount++
    if (heroScrollRuntime.activeInstanceCount === 1) {
      setupScrollHijacking()
    }
  })

  tryOnBeforeUnmount(() => {
    heroScrollRuntime.activeInstanceCount--
    if (heroScrollRuntime.activeInstanceCount === 0) {
      teardownScrollHijacking()
    }
  })

  return {
    scrollToAnchor: handleScrollToAnchor,
  }
}
