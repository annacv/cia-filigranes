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
