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

  const heroCover = document.querySelector('[data-hero-cover]') as HTMLElement | null   // Find HeroCover to monitor its animation
  const finalHeroHeight = parseFloat(isMobile ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT)
  const scrollMarginTop = parseFloat(window.getComputedStyle(anchor).scrollMarginTop) || 0
  let animationInterval: ReturnType<typeof setInterval> | null = null
  let lastScrollY = window.scrollY
  
  /**
   * Follows the anchor as it moves up during HeroCover animation
   * Prevents user scroll from getting ahead during the animation
   */
  const followAnchorAnimation = () => {
    if (animationInterval) clearInterval(animationInterval)
    
    let attempts = 0
    const maxAttempts = ANIMATION_FOLLOW_MAX_ATTEMPTS
    const interval = ANIMATION_FOLLOW_INTERVAL_MS
    
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
        lastScrollY = targetScrollY
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
  let isHandlingScrollAnimation = false
  
  /**
   * Watch for scroll changes from top (0) to > 0 and scroll to anchor on first scroll:
   * - Listen to wheel event to catch the start of scroll gesture early.
   * - This is crucial for strong scroll gestures (trackpad/mouse wheel).
   */
  const setupWheelHandler = () => {
    if (wheelHandler) window.removeEventListener('wheel', wheelHandler, { capture: true })
    
    wheelHandler = (e: Event) => {
      const wheelEvent = e as WheelEvent

      if (hasHandledFirstScroll.value) {
        if (isHandlingScrollAnimation && wheelEvent.deltaY > 0) {
          wheelEvent.preventDefault()
          wheelEvent.stopPropagation()
        }
        return
      }

      if (!enableScrollDetection.value) return
      if (scrollY.value !== 0) return
      if (wheelEvent.deltaY <= 0) return

      hasHandledFirstScroll.value = true
      isHandlingScrollAnimation = true
      
      wheelEvent.preventDefault()
      wheelEvent.stopPropagation()
      
      // Remove the wheel listener since we only want to trigger once
      if (wheelHandler) {
        window.removeEventListener('wheel', wheelHandler, { capture: true })
        wheelHandler = null
      }

      const preventScrollDuringAnimation = (e: Event) => {
        const we = e as WheelEvent
        if (we.deltaY > 0 && isHandlingScrollAnimation) {
          we.preventDefault()
          we.stopPropagation()
        }
      }
      
      window.addEventListener('wheel', preventScrollDuringAnimation, { capture: true, passive: false })
    
      scrollToAnchor()
      
      setTimeout(() => {
        isHandlingScrollAnimation = false
        window.removeEventListener('wheel', preventScrollDuringAnimation, { capture: true })
      }, HERO_COVER_ANIMATION_TIMEOUT_MS)
    }

    // Use capture phase and non-passive to allow preventDefault()
    window.addEventListener('wheel', wheelHandler, { capture: true, passive: false })
  }
  
  // Initial setup
  setupWheelHandler()
  
  // Watch for when user returns to top - reset the flag so scroll-to-anchor can trigger again
  watch(
    scrollY,
    (newScrollY, oldScrollY) => {
      if (!enableScrollDetection.value) return

      if (newScrollY === 0 && hasHandledFirstScroll.value) {
        hasHandledFirstScroll.value = false
        setupWheelHandler()
        return
      }
      
      // Fallback: also watch scrollY for cases where wheel event doesn't fire (first scroll)
      if (!hasHandledFirstScroll.value && oldScrollY === 0 && newScrollY > 0) {
        hasHandledFirstScroll.value = true

        if (wheelHandler) {
          window.removeEventListener('wheel', wheelHandler, { capture: true })
          wheelHandler = null
        }

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
    hasReachedBottom: readonly(hasReachedBottom),
    scrollY: readonly(scrollY),
    scrollProgress: readonly(scrollProgress),
    hasHandledFirstScroll: readonly(hasHandledFirstScroll)
  }
}
