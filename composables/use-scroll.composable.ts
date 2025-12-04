import { computed, readonly, ref, watch, nextTick } from 'vue'
import { useScroll as useVueUseScroll } from '@vueuse/core'
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, HERO_COVER_ANIMATION_DURATION_MS } from '~/constants'

const SCROLL_DETECTION_ENABLE_DELAY_MS = 100
const BOTTOM_THRESHOLD = 200

const ANCHOR_ID = 'main-content-anchor'
const HERO_COVER_ANIMATION_BUFFER_MS = 200
const HERO_COVER_ANIMATION_TIMEOUT_MS = HERO_COVER_ANIMATION_DURATION_MS + HERO_COVER_ANIMATION_BUFFER_MS
const ANIMATION_FOLLOW_MAX_ATTEMPTS = 20
const ANIMATION_FOLLOW_INTERVAL_MS = 30
const ANIMATION_HEIGHT_DIFFERENCE_THRESHOLD = 20
const SCROLL_DIFFERENCE_THRESHOLD = 5

// SSR-safe scroll state
const { y: scrollY } = useVueUseScroll(
  typeof window !== 'undefined' ? window : null
)

const enableScrollDetection = ref(false)
const hasHandledFirstScroll = ref(false)

// Enable scroll detection after a delay to ensure hydration is complete
if (import.meta.client) {
  setTimeout(() => {
    enableScrollDetection.value = true
  }, SCROLL_DETECTION_ENABLE_DELAY_MS)
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

const scrollToAnchor = () => {
  if (typeof window === 'undefined') return

  const isMobile = window.innerWidth < 1024
  const anchor = document.getElementById(ANCHOR_ID)
  
  if (!anchor) return

  // Find HeroCover to monitor its animation
  const heroCover = document.querySelector('[data-hero-cover]') as HTMLElement | null
  const finalHeroHeight = parseFloat(isMobile ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT)
  const scrollMarginTop = parseFloat(window.getComputedStyle(anchor).scrollMarginTop) || 0
  
  /**
   * Follows the anchor as it moves up during HeroCover animation
   * Prevents user scroll from getting ahead during the animation
   */
  const followAnchorAnimation = () => {
    const maxAttempts = ANIMATION_FOLLOW_MAX_ATTEMPTS
    const interval = ANIMATION_FOLLOW_INTERVAL_MS

    let attempts = 0
    let animationInterval: ReturnType<typeof setInterval> | null = null
    
    animationInterval = setInterval(() => {
      attempts++
      
      const currentHeroHeight = heroCover ? parseFloat(window.getComputedStyle(heroCover).height) : 0
      const heightDifference = currentHeroHeight - finalHeroHeight
      const isAnimating = heightDifference > ANIMATION_HEIGHT_DIFFERENCE_THRESHOLD
      
      // Recalculate anchor position with current HeroCover state
      const currentAnchorTop = anchor.offsetTop
      const targetScrollY = currentAnchorTop - scrollMarginTop
      
      // Only scroll if target is different from current and we're not too far ahead
      const currentScrollY = window.scrollY
      const scrollDifference = Math.abs(targetScrollY - currentScrollY)
      
      if (scrollDifference > SCROLL_DIFFERENCE_THRESHOLD) {
        window.scrollTo(0, targetScrollY)
      }
      
      if (!isAnimating || attempts >= maxAttempts) {
        if (animationInterval) {
          clearInterval(animationInterval)
          animationInterval = null
        }
        
        // Final scroll to ensure we're at the correct position
        const finalAnchorTop = anchor.offsetTop
        const finalTargetScrollY = finalAnchorTop - scrollMarginTop
        window.scrollTo(0, finalTargetScrollY)
      }
    }, interval)
  }

  followAnchorAnimation()
}

if (import.meta.client) {
  let wheelHandler: ((e: Event) => void) | null = null
  let touchStartHandler: ((e: Event) => void) | null = null
  let touchMoveHandler: ((e: Event) => void) | null = null
  let initialTouchY: number | null = null
  let lastTouchYDuringAnimation: number | null = null
  let isHandlingScrollAnimation = false
  let preventScrollHandler: ((e: Event) => void) | null = null
  let preventScrollEventType: 'wheel' | 'touchmove' | null = null

  /**
   * Extracts deltaY from a wheel event
   * @param e - The wheel event
   * @returns The deltaY value or null
   */
  const getWheelDeltaY = (e: Event): number | null => {
    const wheelEvent = e as WheelEvent
    return wheelEvent.deltaY
  }

  /**
   * Calculates deltaY from a touch event
   * @param e - The touch event
   * @param initialY - The initial touch Y position
   * @returns The calculated deltaY or null if unable to calculate
   */
  const getTouchDeltaY = (e: Event, initialY: number | null): number | null => {
    const touchEvent = e as TouchEvent
    if (!initialY || touchEvent.touches.length === 0 || !touchEvent.touches[0]) return null
    return touchEvent.touches[0].clientY - initialY
  }

  /**
   * Gets the current touch Y position from a touch event
   * @param e - The touch event
   * @returns The current touch Y position or null if not available
   */
  const getCurrentTouchY = (e: Event): number | null => {
    const touchEvent = e as TouchEvent
    if (touchEvent.touches.length === 0 || !touchEvent.touches[0]) return null
    return touchEvent.touches[0].clientY
  }

  /**
   * Handles scroll-to-anchor trigger
   * Prevents default scroll, cleans up handlers, sets up scroll prevention during animation,
   * and triggers the scroll-to-anchor animation
   * @param e - The event that triggered the scroll-to-anchor
   * @param eventType - The type of event ('wheel' or 'touchmove')
   */
  const handleScrollToAnchor = (e: Event, eventType: 'wheel' | 'touchmove') => {
    // Prevent default scroll
    e.preventDefault()
    e.stopPropagation()

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
        // Touch: currentY < lastTouchYDuringAnimation means scrolling down (finger moves up on screen)
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

    // Clean up after animation
    setTimeout(() => {
      isHandlingScrollAnimation = false
      lastTouchYDuringAnimation = null
      if (preventScrollHandler && preventScrollEventType) {
        window.removeEventListener(preventScrollEventType, preventScrollHandler, { capture: true })
        preventScrollHandler = null
        preventScrollEventType = null
      }
    }, HERO_COVER_ANIMATION_TIMEOUT_MS)
  }

  /**
   * Checks if scroll should be prevented during animation
   * This prevents user scroll from interfering with the programmatic scroll-to-anchor animation
   * @param e - The scroll event
   * @param eventType - The type of event ('wheel' or 'touchmove')
   * @returns True if scroll should be prevented, false otherwise
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
   * Checks if user is at top (scrollY === 0) and scrolling down (deltaY > 0 for wheel, deltaY < 0 for touch)
   * @param e - The scroll event
   * @param eventType - The type of event ('wheel' or 'touchmove')
   * @returns True if scroll-to-anchor should trigger, false otherwise
   */
  const shouldTriggerScrollToAnchor = (e: Event, eventType: 'wheel' | 'touchmove'): boolean => {
    if (!enableScrollDetection.value) return false
    if (scrollY.value !== 0) return false

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
   * Watch for scroll changes from top (0) to > 0 and scroll to anchor on first scroll.
   * Listen to wheel event to catch the start of scroll gesture early.
   * This is crucial for strong scroll gestures (trackpad/mouse wheel).
   */
  const setupWheelHandler = () => {
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
   * Watch for touch scroll gestures from top (0) to > 0 and scroll to anchor on first scroll.
   * Listen to touchstart to capture initial touch position.
   * Listen to touchmove to detect scroll direction and prevent natural scroll during animation.
   * This is crucial for touch scrolling on mobile/tablet devices.
   */
  const setupTouchHandler = () => {
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
      if (scrollY.value !== 0) return

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
          const currentY = getCurrentTouchY(e)
          if (currentY !== null) {
            lastTouchYDuringAnimation = currentY
          }
        } else {
          const currentY = getCurrentTouchY(e)
          if (currentY !== null) {
            lastTouchYDuringAnimation = currentY
          }
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

  // Initial setup
  setupWheelHandler()
  setupTouchHandler()
  
  /**
   * Clean up all scroll handlers
   * Removes all event listeners and resets state variables
   */
  const cleanupScrollHandlers = () => {
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
    if (preventScrollHandler && preventScrollEventType) {
      window.removeEventListener(preventScrollEventType, preventScrollHandler, { capture: true })
      preventScrollHandler = null
      preventScrollEventType = null
    }
    initialTouchY = null
    lastTouchYDuringAnimation = null
  }

  /**
   * Watch for when user returns to top - reset the flag so scroll-to-anchor can trigger again
   * Also provides fallback for cases where wheel/touch events don't fire (first scroll)
   */
  watch(
    scrollY,
    (newScrollY, oldScrollY) => {
      if (!enableScrollDetection.value) return

      if (newScrollY === 0 && hasHandledFirstScroll.value) {
        hasHandledFirstScroll.value = false
        setupWheelHandler()
        setupTouchHandler()
        return
      }
      
      // Fallback: also watch scrollY for cases where wheel/touch events don't fire (first scroll)
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

export function useScroll() {
  return {
    isScrolled: readonly(isScrolled),
    hasReachedBottom: readonly(hasReachedBottom)
  }
}
