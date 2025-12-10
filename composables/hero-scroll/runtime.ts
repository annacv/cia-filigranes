/**
 * Runtime state for the hero scroll hijack singleton
 * 
 * This object groups all module-level state variables to make the singleton
 * pattern explicit and easier to reason about.
 */
export interface HeroScrollRuntime {
  activeInstanceCount: number
  wheelHandler: ((e: Event) => void) | null
  touchStartHandler: ((e: Event) => void) | null
  touchMoveHandler: ((e: Event) => void) | null
  initialTouchY: number | null
  lastTouchYDuringAnimation: number | null
  isHandlingScrollAnimation: boolean
  preventScrollHandler: ((e: Event) => void) | null
  preventScrollEventType: 'wheel' | 'touchmove' | null
  animationCleanupTimeout: ReturnType<typeof setTimeout> | null
  scrollDetectionEnableFrameId: number | null
  scrollWatcherStop: (() => void) | null
  followAnimationCleanup: (() => void) | null
  pageFinishUnsubscribe: (() => void) | null
}

export const heroScrollRuntime: HeroScrollRuntime = {
  activeInstanceCount: 0,
  wheelHandler: null,
  touchStartHandler: null,
  touchMoveHandler: null,
  initialTouchY: null,
  lastTouchYDuringAnimation: null,
  isHandlingScrollAnimation: false,
  preventScrollHandler: null,
  preventScrollEventType: null,
  animationCleanupTimeout: null,
  scrollDetectionEnableFrameId: null,
  scrollWatcherStop: null,
  followAnimationCleanup: null,
  pageFinishUnsubscribe: null,
}
