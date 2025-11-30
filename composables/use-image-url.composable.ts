import type { ComputedRef } from "vue";
import type { ImageRoute } from "~/types";
import { GLOB_IMPORTS } from "~/constants";

const mobileMap: Record<ImageRoute, Record<string, string>> = {
  '': GLOB_IMPORTS.mobileImages,
  'espectacles': GLOB_IMPORTS.mobileShowImages,
  'tallers': GLOB_IMPORTS.mobileTallerImages,
  'animacions': GLOB_IMPORTS.mobileAnimacionsImages,
  'contacte': GLOB_IMPORTS.mobileContacteImages,
  'filipersones': GLOB_IMPORTS.mobileFilipersonesImages,
};

const desktopMap: Record<ImageRoute, Record<string, string>> = {
  '': GLOB_IMPORTS.desktopImages,
  'espectacles': GLOB_IMPORTS.desktopShowImages,
  'tallers': GLOB_IMPORTS.desktopTallerImages,
  'animacions': GLOB_IMPORTS.desktopAnimacionsImages,
  'contacte': GLOB_IMPORTS.desktopContacteImages,
  'filipersones': GLOB_IMPORTS.desktopFilipersonesImages,
};

/**
 * Gets the image URL directly from the image map (non-reactive, for preloading).
 * @param {string} imageName - The file name, e.g., "avatar-1.jpg"
 * @param {ImageRoute} route - The route where the image is allocated in the assets' folder.
 * @param {boolean} isMobile - Whether to get mobile or desktop version.
 * @returns {string | undefined} The resolved image URL or undefined if not found.
 */
function getImageUrlDirect(imageName: string, route: ImageRoute, isMobile: boolean): string | undefined {
  const imageMap = isMobile ? mobileMap : desktopMap;
  const images = imageMap[route] || {};
  const imageKey = Object.keys(images).find(path => path.includes(`/${imageName}.webp`));
  if (!imageKey) {
    return undefined;
  }
  return images[imageKey];
}

/**
 * Returns the image URL for a given image name.
 * @param {string} imageName - The file name, e.g., "avatar-1.jpg"
 * @param {ImageRoute} route - The route where the image is allocated in the assets' folder.
 * @returns {string | undefined} The resolved image URL or undefined if not found.
 */
export function useImageUrl(imageName: string, route: ImageRoute): ComputedRef<string | undefined> {
  const { isMobile } = useResponsive();
  const imageMap = computed(() => isMobile.value ? mobileMap : desktopMap);
  const images = computed(() => imageMap.value[route] || {});

  return computed(() => {
    const imageKey = Object.keys(images.value).find(path => path.includes(`/${imageName}.webp`));
    if (!imageKey) {
      console.warn(`Image ${imageName} not found in:`, Object.keys(images.value));
      return undefined;
    }
    return images.value[imageKey];
  });
}

/**
 * Gets both mobile and desktop image URLs for preloading.
 * @param {string} imageName - The file name, e.g., "avatar-1.jpg"
 * @param {ImageRoute} route - The route where the image is allocated in the assets' folder.
 * @returns {{ mobile: string | undefined, desktop: string | undefined }} Object with mobile and desktop URLs.
 */
export function getImageUrlsForPreload(imageName: string, route: ImageRoute): { mobile: string | undefined, desktop: string | undefined } {
  return {
    mobile: getImageUrlDirect(imageName, route, true),
    desktop: getImageUrlDirect(imageName, route, false)
  };
}
