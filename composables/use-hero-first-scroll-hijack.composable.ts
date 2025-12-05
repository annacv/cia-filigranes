import { watch, nextTick } from 'vue'
import { tryOnMounted, tryOnBeforeUnmount } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core'
import { useState } from '#app'
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, HERO_COVER_ANIMATION_DURATION_MS } from '~/constants'

const SCROLL_DETECTION_ENABLE_DELAY_MS = 100
const ANCHOR_ID = 'main-content-anchor'
const HERO_COVER_ANIMATION_BUFFER_MS = 200
const HERO_COVER_ANIMATION_TIMEOUT_MS = HERO_COVER_ANIMATION_DURATION_MS + HERO_COVER_ANIMATION_BUFFER_MS
const ANIMATION_FOLLOW_MAX_ATTEMPTS = 20
const ANIMATION_FOLLOW_INTERVAL_MS = 30
const ANIMATION_HEIGHT_DIFFERENCE_THRESHOLD = 20
const SCROLL_DIFFERENCE_THRESHOLD = 5

let activeInstanceCount = 0
let wheelHandler: ((e: Event) => void) | null = null
let touchStartHandler: ((e: Event) => void) | null = null
let touchMoveHandler: ((e: Event) => void) | null = null
let initialTouchY: number | null = null
let lastTouchYDuringAnimation: number | null = null
let isHandlingScrollAnimation = false
let preventScrollHandler: ((e: Event) => void) | null = null
let preventScrollEventType: 'wheel' | 'touchmove' | null = null
let animationCleanupTimeout: ReturnType<typeof setTimeout> | null = null
let scrollWatcherStop: (() => void) | null = null
let followAnimationInterval: ReturnType<typeof setInterval> | null = null
let pageFinishUnsubscribe: (() => void) | null = null

/**
 * Global scroll hijack composable for hero first scroll behavior
 * 
 * This composable sets up a singleton scroll hijack that intercepts the first
 * scroll gesture from the top of the page and scrolls to the main content anchor.
 * 
 * @returns { scrollToAnchor }
 */
export function useHeroFirstScrollHijack(): {
  scrollToAnchor: () => void
} {
  // Early return for SSR - return no-op function
  if (import.meta.server) {
    return {
      scrollToAnchor: () => {}
    }
  }

  // SSR-safe state using useState for request-scoped isolation
  const enableScrollDetection = useState('hero-scroll:enableDetection', () => false)
  const hasHandledFirstScroll = useState('hero-scroll:hasHandledFirstScroll', () => false)
  const { y: windowScrollY } = useWindowScroll()

  /**
   * Scrolls to the main content anchor and follows the animation
   */
  const scrollToAnchor = (): void => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth < 1024
    const anchor = document.getElementById(ANCHOR_ID)
    
    if (!anchor) return
    if (!document.body.contains(anchor)) return

    // Find HeroCover to monitor its animation
    const heroCover = document.querySelector('[data-hero-cover]') as HTMLElement | null
    const finalHeroHeight = parseFloat(isMobile ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT)
    const scrollMarginTop = parseFloat(window.getComputedStyle(anchor).scrollMarginTop) || 0
    
    /**
     * Follows the anchor as it moves up during HeroCover animation
     * Prevents user scroll from getting ahead during the animation
     */
    const followAnchorAnimation = (): void => {
      const maxAttempts = ANIMATION_FOLLOW_MAX_ATTEMPTS
      const interval = ANIMATION_FOLLOW_INTERVAL_MS

      let attempts = 0
      const initialDocumentHeight = document.documentElement.scrollHeight
      
      const clearFollowInterval = (): void => {
        if (followAnimationInterval) {
          clearInterval(followAnimationInterval)
          followAnimationInterval = null
        }
      }
    
      clearFollowInterval()
      
      followAnimationInterval = setInterval(() => {
        attempts++
        
        // Guard against heroCover disappearing mid-animation
        if (!heroCover || !document.body.contains(heroCover)) {
          clearFollowInterval()
          return
        }

        if (!document.body.contains(anchor)) {
          clearFollowInterval()
          return
        }

        // Early exit if document height shrinks significantly
        const currentDocumentHeight = document.documentElement.scrollHeight
        if (currentDocumentHeight < initialDocumentHeight * 0.5) {
          clearFollowInterval()
          return
        }

        // Get current hero height (defaults to 0 if fails)
        const currentHeroHeight = parseFloat(window.getComputedStyle(heroCover).height) || 0

        const heightDifference = currentHeroHeight - finalHeroHeight
        const isAnimating = heightDifference > ANIMATION_HEIGHT_DIFFERENCE_THRESHOLD
        const anchorRect = anchor.getBoundingClientRect()
        const currentAnchorTop = anchorRect.top + window.scrollY
        const targetScrollY = Math.max(0, currentAnchorTop - scrollMarginTop)
        const currentScrollY = window.scrollY
        const scrollDifference = Math.abs(targetScrollY - currentScrollY)
        
        // Only scroll if target is different from current and we're not too far ahead
        if (scrollDifference > SCROLL_DIFFERENCE_THRESHOLD) {
          window.scrollTo(0, targetScrollY)
        }
        
        if (!isAnimating || attempts >= maxAttempts) {
          clearFollowInterval()
          
          // Final scroll to ensure we're at the correct position
          const finalAnchorRect = anchor.getBoundingClientRect()
          const finalAnchorTop = finalAnchorRect.top + window.scrollY
          const finalTargetScrollY = Math.max(0, finalAnchorTop - scrollMarginTop)
          window.scrollTo(0, finalTargetScrollY)
        }
      }, interval)
    }

    followAnchorAnimation()
  }

  /**
   * Extracts deltaY from a wheel event
   */
  const getWheelDeltaY = (e: Event): number | null => {
    const wheelEvent = e as WheelEvent
    return wheelEvent.deltaY
  }

  /**
   * Calculates deltaY from a touch event
   */
  const getTouchDeltaY = (e: Event, initialY: number | null): number | null => {
    const touchEvent = e as TouchEvent
    if (initialY === null || touchEvent.touches.length === 0 || !touchEvent.touches[0]) return null
    return touchEvent.touches[0].clientY - initialY
  }

  /**
   * Gets the current touch Y position from a touch event
   */
  const getCurrentTouchY = (e: Event): number | null => {
    const touchEvent = e as TouchEvent
    if (touchEvent.touches.length === 0 || !touchEvent.touches[0]) return null
    return touchEvent.touches[0].clientY
  }

  /**
   * Cleans up the scroll prevention handler and timeout
   */
  const cleanupScrollPrevention = (resetFlag = true): void => {
    if (animationCleanupTimeout) {
      clearTimeout(animationCleanupTimeout)
      animationCleanupTimeout = null
    }

    if (preventScrollHandler && preventScrollEventType) {
      window.removeEventListener(preventScrollEventType, preventScrollHandler, { capture: true })
      preventScrollHandler = null
      preventScrollEventType = null
    }

    if (resetFlag) {
      isHandlingScrollAnimation = false
      lastTouchYDuringAnimation = null
    }
  }

  /**
   * Handles scroll-to-anchor trigger
   */
  const handleScrollToAnchor = (e: Event, eventType: 'wheel' | 'touchmove'): void => {
    e.preventDefault()
    e.stopPropagation()
    cleanupScrollPrevention(false)

    // Clean up main handlers - we only want to trigger once
    if (wheelHandler) {
      window.removeEventListener('wheel', wheelHandler, { capture: true })
      wheelHandler = null
    }
    if (touchStartHandler) {
      window.removeEventListener('touchstart', touchStartHandler, { capture: true })
      touchStartHandler = null
    }
    if (touchMoveHandler) {
      window.removeEventListener('touchmove', touchMoveHandler, { capture: true })
      touchMoveHandler = null
    }
    initialTouchY = null

    // Initialize touch tracking for animation prevention
    if (eventType === 'touchmove') {
      const currentY = getCurrentTouchY(e)
      if (currentY !== null) {
        lastTouchYDuringAnimation = currentY
      }
    }

    // Set up scroll prevention during animation
    preventScrollEventType = eventType
    preventScrollHandler = (preventEvent: Event) => {
      if (!isHandlingScrollAnimation) return

      if (eventType === 'wheel') {
        const wheelEvent = preventEvent as WheelEvent
        if (wheelEvent.deltaY > 0) {
          wheelEvent.preventDefault()
          wheelEvent.stopPropagation()
        }
      } else {
        const touchEvent = preventEvent as TouchEvent
        const currentY = getCurrentTouchY(touchEvent)

        if (currentY !== null && lastTouchYDuringAnimation !== null && currentY < lastTouchYDuringAnimation) {
          touchEvent.preventDefault()
          touchEvent.stopPropagation()
          lastTouchYDuringAnimation = currentY
        } else if (currentY !== null) {
          lastTouchYDuringAnimation = currentY
        }
      }
    }

    window.addEventListener(eventType, preventScrollHandler, { capture: true, passive: false })

    scrollToAnchor()

    animationCleanupTimeout = setTimeout(() => {
      cleanupScrollPrevention()
    }, HERO_COVER_ANIMATION_TIMEOUT_MS)
  }

  /**
   * Checks if scroll should be prevented during animation
   */
  const shouldPreventScrollDuringAnimation = (e: Event, eventType: 'wheel' | 'touchmove'): boolean => {
    if (!isHandlingScrollAnimation) return false

    if (eventType === 'wheel') {
      const wheelEvent = e as WheelEvent
      return wheelEvent.deltaY > 0
    } else {
      const currentY = getCurrentTouchY(e)
      return currentY !== null && lastTouchYDuringAnimation !== null && currentY < lastTouchYDuringAnimation
    }
  }

  /**
   * Checks if scroll-to-anchor should trigger
   */
  const shouldTriggerScrollToAnchor = (e: Event, eventType: 'wheel' | 'touchmove'): boolean => {
    if (!enableScrollDetection.value) return false
    if (windowScrollY.value !== 0) return false

    if (eventType === 'wheel') {
      const deltaY = getWheelDeltaY(e)
      return deltaY !== null && deltaY > 0
    } else {
      const deltaY = getTouchDeltaY(e, initialTouchY)
      return deltaY !== null && deltaY < 0
    }
  }

  /**
   * Setup wheel event handler
   */
  const setupWheelHandler = (): void => {
    if (wheelHandler) window.removeEventListener('wheel', wheelHandler, { capture: true })

    wheelHandler = (e: Event) => {
      const wheelEvent = e as WheelEvent

      if (hasHandledFirstScroll.value) {
        if (shouldPreventScrollDuringAnimation(e, 'wheel')) {
          wheelEvent.preventDefault()
          wheelEvent.stopPropagation()
        }
        return
      }

      if (!shouldTriggerScrollToAnchor(e, 'wheel')) return

      hasHandledFirstScroll.value = true
      isHandlingScrollAnimation = true
      handleScrollToAnchor(e, 'wheel')
    }

    // Use capture phase and non-passive to allow preventDefault()
    window.addEventListener('wheel', wheelHandler, { capture: true, passive: false })
  }

  /**
   * Setup touch event handlers
   */
  const setupTouchHandler = (): void => {
    if (touchStartHandler) {
      window.removeEventListener('touchstart', touchStartHandler, { capture: true })
      touchStartHandler = null
    }
    if (touchMoveHandler) {
      window.removeEventListener('touchmove', touchMoveHandler, { capture: true })
      touchMoveHandler = null
    }
    initialTouchY = null
    lastTouchYDuringAnimation = null

    touchStartHandler = (e: Event) => {
      if (hasHandledFirstScroll.value) return
      if (!enableScrollDetection.value) return
      if (windowScrollY.value !== 0) return

      // Capture initial touch position
      const currentY = getCurrentTouchY(e)
      if (currentY !== null) {
        initialTouchY = currentY
      }
    }

    touchMoveHandler = (e: Event) => {
      const touchEvent = e as TouchEvent

      if (hasHandledFirstScroll.value) {
        if (shouldPreventScrollDuringAnimation(e, 'touchmove')) {
          touchEvent.preventDefault()
          touchEvent.stopPropagation()
        }
        // Always update lastTouchYDuringAnimation for tracking
        const currentY = getCurrentTouchY(e)
        if (currentY !== null) {
          lastTouchYDuringAnimation = currentY
        }
        return
      }

      if (!shouldTriggerScrollToAnchor(e, 'touchmove')) return

      hasHandledFirstScroll.value = true
      isHandlingScrollAnimation = true
      handleScrollToAnchor(e, 'touchmove')
    }

    // Use capture phase and non-passive to allow preventDefault()
    window.addEventListener('touchstart', touchStartHandler, { capture: true, passive: false })
    window.addEventListener('touchmove', touchMoveHandler, { capture: true, passive: false })
  }

  /**
   * Clean up all scroll handlers
   */
  const cleanupScrollHandlers = (): void => {
    if (wheelHandler) {
      window.removeEventListener('wheel', wheelHandler, { capture: true })
      wheelHandler = null
    }
    if (touchStartHandler) {
      window.removeEventListener('touchstart', touchStartHandler, { capture: true })
      touchStartHandler = null
    }
    if (touchMoveHandler) {
      window.removeEventListener('touchmove', touchMoveHandler, { capture: true })
      touchMoveHandler = null
    }
    if (followAnimationInterval) {
      clearInterval(followAnimationInterval)
      followAnimationInterval = null
    }
    cleanupScrollPrevention()
    initialTouchY = null
  }

  /**
   * Sets up scroll hijacking handlers and watchers
   */
  const setupScrollHijacking = (): void => {
    // Hook into page navigation to reset scroll hijack state after navigation
    // Using page:finish ensures this runs after app.vue scrolls to (0, 0)
    const nuxtApp = useNuxtApp()
    pageFinishUnsubscribe = nuxtApp.hook('page:finish', () => {
      hasHandledFirstScroll.value = false
      setupWheelHandler()
      setupTouchHandler()
    })

    // Enable scroll detection after a delay to ensure hydration is complete
    setTimeout(() => {
      enableScrollDetection.value = true
    }, SCROLL_DETECTION_ENABLE_DELAY_MS)

    // Initial setup
    setupWheelHandler()
    setupTouchHandler()

    // Watch windowScrollY (reactive) for when user returns to top
    // Reset the flag so scroll-to-anchor can trigger again
    scrollWatcherStop = watch(
      windowScrollY,
      (newScrollY, oldScrollY) => {
        if (!enableScrollDetection.value) return

        if (newScrollY === 0 && hasHandledFirstScroll.value) {
          hasHandledFirstScroll.value = false
          setupWheelHandler()
          setupTouchHandler()
          return
        }
        
        // Fallback: also watch for cases where wheel/touch events don't fire (first scroll)
        if (!hasHandledFirstScroll.value && oldScrollY === 0 && newScrollY > 0) {
          hasHandledFirstScroll.value = true
          cleanupScrollHandlers()

          nextTick(() => {
            scrollToAnchor()
          })
        }
      },
      { immediate: false }
    )
  }

  /**
   * Cleans up scroll hijacking handlers and watchers
   */
  const teardownScrollHijacking = (): void => {
    cleanupScrollHandlers()
    if (followAnimationInterval) {
      clearInterval(followAnimationInterval)
      followAnimationInterval = null
    }
    if (scrollWatcherStop) {
      scrollWatcherStop()
      scrollWatcherStop = null
    }
    if (pageFinishUnsubscribe) {
      pageFinishUnsubscribe()
      pageFinishUnsubscribe = null
    }
    hasHandledFirstScroll.value = false
    enableScrollDetection.value = false
  }

  tryOnMounted(() => {
    activeInstanceCount++
    if (activeInstanceCount === 1) setupScrollHijacking()
  })

  tryOnBeforeUnmount(() => {
    activeInstanceCount--
    if (activeInstanceCount === 0) teardownScrollHijacking()
  })

  return {
    scrollToAnchor
  }
}

