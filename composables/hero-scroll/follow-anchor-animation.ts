import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '~/constants'
import { heroScrollRuntime } from './runtime'

const ANIMATION_HEIGHT_DIFFERENCE_THRESHOLD = 20
const SCROLL_DIFFERENCE_THRESHOLD = 5
const ANIMATION_FOLLOW_MAX_FRAMES = 60 // ~1 second at 60fps

export interface FollowAnimationOptions {
  finalHeroHeight: number
  scrollMarginTop: number
  maxFrames?: number
}

/**
 * Pure DOM helper that follows the anchor as it moves up during HeroCover animation
 * Uses requestAnimationFrame for smoother, frame-based animation tracking
 * 
 * @param heroCover - The hero cover element with [data-hero-cover] attribute
 * @param anchor - The anchor element to follow (typically #main-content-anchor)
 * @param options - Configuration options
 * @returns Cleanup function to cancel the animation loop
 */
export function followAnchorAnimation(
  heroCover: HTMLElement,
  anchor: HTMLElement,
  options: FollowAnimationOptions
): () => void {
  const { finalHeroHeight, scrollMarginTop, maxFrames = ANIMATION_FOLLOW_MAX_FRAMES } = options

  let frameCount = 0
  let animationFrameId: number | null = null
  const initialDocumentHeight = document.documentElement.scrollHeight

  const cancel = (): void => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  const frame = (): void => {
    frameCount++

    // Guard against heroCover disappearing mid-animation
    if (!heroCover || !document.body.contains(heroCover)) {
      cancel()
      return
    }

    if (!document.body.contains(anchor)) {
      cancel()
      return
    }

    // Early exit if document height shrinks significantly
    const currentDocumentHeight = document.documentElement.scrollHeight
    if (currentDocumentHeight < initialDocumentHeight * 0.5) {
      cancel()
      return
    }

    const currentHeroHeight = parseFloat(window.getComputedStyle(heroCover).height) || finalHeroHeight
    const heightDifference = currentHeroHeight - finalHeroHeight
    const isAnimating = heightDifference > ANIMATION_HEIGHT_DIFFERENCE_THRESHOLD
    const anchorRect = anchor.getBoundingClientRect()
    const currentAnchorTop = anchorRect.top + window.scrollY
    const targetScrollY = Math.max(1, currentAnchorTop - scrollMarginTop)
    const currentScrollY = window.scrollY
    const scrollDifference = Math.abs(targetScrollY - currentScrollY)

    // Only scroll if target is different from current and we're not too far ahead
    if (scrollDifference > SCROLL_DIFFERENCE_THRESHOLD) {
      window.scrollTo(0, targetScrollY)
    }

    if (!isAnimating || frameCount >= maxFrames) {
      cancel()

      heroScrollRuntime.animationCompletedAt = Date.now()

      // Final scroll to ensure we're at the correct position
      const finalAnchorRect = anchor.getBoundingClientRect()
      const finalAnchorTop = finalAnchorRect.top + window.scrollY
      const finalTargetScrollY = Math.max(1, finalAnchorTop - scrollMarginTop)
      
      window.scrollTo(0, finalTargetScrollY)
      return
    }

    animationFrameId = requestAnimationFrame(frame)
  }

  // Start the animation loop
  animationFrameId = requestAnimationFrame(frame)

  return cancel
}

/**
 * Scrolls to the main content anchor and follows the animation
 * 
 * @param anchorId - The ID of the anchor element (default: 'main-content-anchor')
 * @returns Cleanup function or null if anchor not found
 */
export function scrollToAnchor(anchorId = 'main-content-anchor'): (() => void) | null {
  if (typeof window === 'undefined') return null

  const isMobile = window.innerWidth < 1024
  const anchor = document.getElementById(anchorId)

  if (!anchor) return null
  if (!document.body.contains(anchor)) return null

  // Find HeroCover to monitor its animation
  const heroCover = document.querySelector('[data-hero-cover]') as HTMLElement | null
  if (!heroCover) return null

  const finalHeroHeight = parseFloat(isMobile ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT)
  const scrollMarginTop = parseFloat(window.getComputedStyle(anchor).scrollMarginTop) || 0

  return followAnchorAnimation(heroCover, anchor, {
    finalHeroHeight,
    scrollMarginTop,
  })
}
