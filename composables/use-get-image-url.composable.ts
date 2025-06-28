import { computed } from "vue";
import type { ComputedRef } from "vue";

const mobileImages = import.meta.glob('~/assets/images/mobile/*.webp', {
  eager: true,
  import: 'default',
})

const desktopImages = import.meta.glob('~/assets/images/desktop/*.webp', {
  eager: true,
  import: 'default',
})

/**
 * Returns the image URL for a given image name.
 * @param {string} imageName - The file name, e.g., "avatar-1.jpg"
 * @returns {string | undefined} The resolved image URL or undefined if not found.
 */
export function getImageUrl(imageName :string) :ComputedRef<string | undefined> {
  const { isMobile } = useDevice()

  return computed(() => {
    const imageKey = Object.keys(isMobile ? mobileImages : desktopImages).find(path => path.includes(`/${imageName}.webp`))
    if (!imageKey) {
      console.warn(`Image ${imageName} not found in:`, Object.keys(isMobile ? mobileImages : desktopImages))
      return ''
    }
    const url = isMobile ? mobileImages[imageKey] : desktopImages[imageKey]
    return typeof url === 'string' ? url : undefined
  })
}
