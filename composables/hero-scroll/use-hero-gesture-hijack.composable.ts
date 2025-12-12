import { heroScrollRuntime } from './runtime'
import { HERO_COVER_ANIMATION_DURATION_MS } from '~/constants'

const HERO_COVER_ANIMATION_BUFFER_MS = 300
const HERO_COVER_ANIMATION_TIMEOUT_MS = HERO_COVER_ANIMATION_DURATION_MS + HERO_COVER_ANIMATION_BUFFER_MS

export interface UseHeroGestureHijackOptions {
  enableScrollDetection: { value: boolean }
  hasHandledFirstScroll: { value: boolean }
  windowScrollY: { value: number }
  onScrollToAnchor: () => void
}

export interface UseHeroGestureHijackReturn {
  setup: () => void
  teardown: () => void
  cleanupScrollPrevention: (resetFlag?: boolean) => void
}

function getWheelDeltaY(e: Event): number | null {
  const wheelEvent = e as WheelEvent
  return wheelEvent.deltaY
}

function getTouchDeltaY(e: Event, initialY: number | null): number | null {
  const touchEvent = e as TouchEvent
  if (initialY === null || touchEvent.touches.length === 0 || !touchEvent.touches[0]) return null
  return touchEvent.touches[0].clientY - initialY
}

function getCurrentTouchY(e: Event): number | null {
  const touchEvent = e as TouchEvent
  if (touchEvent.touches.length === 0 || !touchEvent.touches[0]) return null
  return touchEvent.touches[0].clientY
}

/**
 * Manages wheel and touch gesture hijacking for hero scroll behavior
 * 
 * Handles:
 * - Wheel and touch event listeners
 * - Decision logic for triggering scroll-to-anchor
 * - Scroll prevention during animation
 * - Coordination with runtime state
 */
export function useHeroGestureHijack(
  options: UseHeroGestureHijackOptions
): UseHeroGestureHijackReturn {
  const { enableScrollDetection, hasHandledFirstScroll, windowScrollY, onScrollToAnchor } = options

  const cleanupScrollPrevention = (resetFlag = true): void => {
    if (heroScrollRuntime.animationCleanupTimeout) {
      clearTimeout(heroScrollRuntime.animationCleanupTimeout)
      heroScrollRuntime.animationCleanupTimeout = null
    }

    if (heroScrollRuntime.preventScrollHandler && heroScrollRuntime.preventScrollEventType) {
      window.removeEventListener(
        heroScrollRuntime.preventScrollEventType,
        heroScrollRuntime.preventScrollHandler,
        { capture: true }
      )
      heroScrollRuntime.preventScrollHandler = null
      heroScrollRuntime.preventScrollEventType = null
    }

    if (resetFlag) {
      heroScrollRuntime.isHandlingScrollAnimation = false
      heroScrollRuntime.lastTouchYDuringAnimation = null
      heroScrollRuntime.animationCompletedAt = null
    }
  }

  const shouldPreventScrollDuringAnimation = (e: Event, eventType: 'wheel' | 'touchmove'): boolean => {
    if (!heroScrollRuntime.isHandlingScrollAnimation) return false

    if (eventType === 'wheel') {
      const wheelEvent = e as WheelEvent
      return wheelEvent.deltaY > 0
    } else {
      const currentY = getCurrentTouchY(e)
      return (
        currentY !== null &&
        heroScrollRuntime.lastTouchYDuringAnimation !== null &&
        currentY < heroScrollRuntime.lastTouchYDuringAnimation
      )
    }
  }

  const shouldTriggerScrollToAnchor = (e: Event, eventType: 'wheel' | 'touchmove'): boolean => {
    if (!enableScrollDetection.value) return false
    if (windowScrollY.value !== 0) return false

    if (eventType === 'wheel') {
      const deltaY = getWheelDeltaY(e)
      return deltaY !== null && deltaY > 0
    } else {
      const deltaY = getTouchDeltaY(e, heroScrollRuntime.initialTouchY)
      return deltaY !== null && deltaY < 0
    }
  }

  const handleScrollToAnchor = (e: Event, eventType: 'wheel' | 'touchmove'): void => {
    e.preventDefault()
    e.stopPropagation()
    cleanupScrollPrevention(false)

    // Initialize touch tracking for animation prevention
    if (eventType === 'touchmove') {
      const currentY = getCurrentTouchY(e)
      if (currentY !== null) {
        heroScrollRuntime.lastTouchYDuringAnimation = currentY
      }
    }

    // Set up scroll prevention during animation FIRST - before removing main handlers
    // This ensures there's no gap where heavy gesture events can slip through
    heroScrollRuntime.preventScrollEventType = eventType
    heroScrollRuntime.preventScrollHandler = (preventEvent: Event) => {
      if (!heroScrollRuntime.isHandlingScrollAnimation) return

      if (eventType === 'wheel') {
        const wheelEvent = preventEvent as WheelEvent
        if (wheelEvent.deltaY > 0) {
          wheelEvent.preventDefault()
          wheelEvent.stopPropagation()
        }
      } else {
        const touchEvent = preventEvent as TouchEvent
        const currentY = getCurrentTouchY(touchEvent)

        if (
          currentY !== null &&
          heroScrollRuntime.lastTouchYDuringAnimation !== null &&
          currentY < heroScrollRuntime.lastTouchYDuringAnimation
        ) {
          touchEvent.preventDefault()
          touchEvent.stopPropagation()
          heroScrollRuntime.lastTouchYDuringAnimation = currentY
        } else if (currentY !== null) {
          heroScrollRuntime.lastTouchYDuringAnimation = currentY
        }
      }
    }

    window.addEventListener(eventType, heroScrollRuntime.preventScrollHandler, {
      capture: true,
      passive: false,
    })

    // Clean up main handlers - we only want to trigger once
    if (heroScrollRuntime.wheelHandler) {
      window.removeEventListener('wheel', heroScrollRuntime.wheelHandler, { capture: true })
      heroScrollRuntime.wheelHandler = null
    }
    if (heroScrollRuntime.touchStartHandler) {
      window.removeEventListener('touchstart', heroScrollRuntime.touchStartHandler, { capture: true })
      heroScrollRuntime.touchStartHandler = null
    }
    if (heroScrollRuntime.touchMoveHandler) {
      window.removeEventListener('touchmove', heroScrollRuntime.touchMoveHandler, { capture: true })
      heroScrollRuntime.touchMoveHandler = null
    }
    heroScrollRuntime.initialTouchY = null

    onScrollToAnchor()

    heroScrollRuntime.animationCleanupTimeout = setTimeout(() => {
      cleanupScrollPrevention()
    }, HERO_COVER_ANIMATION_TIMEOUT_MS)
  }

  const setupWheelHandler = (): void => {
    if (heroScrollRuntime.wheelHandler) {
      window.removeEventListener('wheel', heroScrollRuntime.wheelHandler, { capture: true })
    }

    heroScrollRuntime.wheelHandler = (e: Event) => {
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
      heroScrollRuntime.isHandlingScrollAnimation = true
      handleScrollToAnchor(e, 'wheel')
    }

    // Use capture phase and non-passive to allow preventDefault()
    window.addEventListener('wheel', heroScrollRuntime.wheelHandler, { capture: true, passive: false })
  }

  const setupTouchHandler = (): void => {
    if (heroScrollRuntime.touchStartHandler) {
      window.removeEventListener('touchstart', heroScrollRuntime.touchStartHandler, { capture: true })
      heroScrollRuntime.touchStartHandler = null
    }
    if (heroScrollRuntime.touchMoveHandler) {
      window.removeEventListener('touchmove', heroScrollRuntime.touchMoveHandler, { capture: true })
      heroScrollRuntime.touchMoveHandler = null
    }
    heroScrollRuntime.initialTouchY = null
    heroScrollRuntime.lastTouchYDuringAnimation = null

    heroScrollRuntime.touchStartHandler = (e: Event) => {
      if (hasHandledFirstScroll.value) return
      if (!enableScrollDetection.value) return
      if (windowScrollY.value !== 0) return

      const currentY = getCurrentTouchY(e)
      if (currentY !== null) {
        heroScrollRuntime.initialTouchY = currentY
      }
    }

    heroScrollRuntime.touchMoveHandler = (e: Event) => {
      const touchEvent = e as TouchEvent

      if (hasHandledFirstScroll.value) {
        if (shouldPreventScrollDuringAnimation(e, 'touchmove')) {
          touchEvent.preventDefault()
          touchEvent.stopPropagation()
        }
        // Always update lastTouchYDuringAnimation for tracking
        const currentY = getCurrentTouchY(e)
        if (currentY !== null) {
          heroScrollRuntime.lastTouchYDuringAnimation = currentY
        }
        return
      }

      if (!shouldTriggerScrollToAnchor(e, 'touchmove')) return

      hasHandledFirstScroll.value = true
      heroScrollRuntime.isHandlingScrollAnimation = true
      handleScrollToAnchor(e, 'touchmove')
    }

    // Use capture phase and non-passive to allow preventDefault()
    window.addEventListener('touchstart', heroScrollRuntime.touchStartHandler, {
      capture: true,
      passive: false,
    })
    window.addEventListener('touchmove', heroScrollRuntime.touchMoveHandler, {
      capture: true,
      passive: false,
    })
  }

  const cleanupScrollHandlers = (): void => {
    if (heroScrollRuntime.wheelHandler) {
      window.removeEventListener('wheel', heroScrollRuntime.wheelHandler, { capture: true })
      heroScrollRuntime.wheelHandler = null
    }
    if (heroScrollRuntime.touchStartHandler) {
      window.removeEventListener('touchstart', heroScrollRuntime.touchStartHandler, { capture: true })
      heroScrollRuntime.touchStartHandler = null
    }
    if (heroScrollRuntime.touchMoveHandler) {
      window.removeEventListener('touchmove', heroScrollRuntime.touchMoveHandler, { capture: true })
      heroScrollRuntime.touchMoveHandler = null
    }
    cleanupScrollPrevention()
    heroScrollRuntime.initialTouchY = null
  }

  const setup = (): void => {
    setupWheelHandler()
    setupTouchHandler()
  }

  const teardown = (): void => {
    cleanupScrollHandlers()
  }

  return {
    setup,
    teardown,
    cleanupScrollPrevention,
  }
}

