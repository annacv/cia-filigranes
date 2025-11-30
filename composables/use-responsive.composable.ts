import { computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'

/**
 * Combines user agent detection (from @nuxtjs/device) with viewport width detection
 * to provide accurate responsive state that works in Chrome DevTools responsive mode.
 * 
 * Strategy:
 * - Prioritizes viewport width for responsive design (works in DevTools)
 * - Falls back to device detection for edge cases (tablets in landscape/external displays)
 * 
 * Breakpoint: 1024px (matches Tailwind's lg breakpoint)
 * - Mobile/Tablet: viewport < 1024px
 * - Desktop: viewport >= 1024px
 */
export function useResponsive() {
  const device = useDevice()
  const isViewportBelowLg = useMediaQuery('(max-width: 1023px)')
  const isViewportAtLeastMd = useMediaQuery('(min-width: 768px)')
  
  const isMobile = computed(() => {
    if (isViewportBelowLg.value) {
      return true
    }
    // If viewport is desktop-sized but device is mobile, still consider mobile
    // (handles cases where mobile device is in landscape or connected to external display)
    return device.isMobile
  })
  
  const isMobileOrTablet = computed(() => {
    if (isViewportBelowLg.value) {
      return true
    }
    // If viewport is desktop-sized but device is mobile/tablet, still consider mobile/tablet
    // (handles cases where tablet is in landscape or connected to external display)
    return device.isMobileOrTablet
  })
  
  // Small tablets: >= 768px (md) and < 1024px (lg)
  const isSmallTablet = computed(() => {
    return isViewportAtLeastMd.value && isViewportBelowLg.value
  })
  
  return {
    isMobile,
    isMobileOrTablet,
    isSmallTablet,
    device
  }
}

