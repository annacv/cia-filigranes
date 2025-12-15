import { ref, computed, watchEffect, type ComputedRef } from "vue";
import type { ImageRoute } from "~/types";
import { GLOB_IMPORTS } from "~/constants";

const mobileMap: Record<ImageRoute, Record<string, () => Promise<string>>> = {
  '': GLOB_IMPORTS.mobileImages,
  'espectacles': GLOB_IMPORTS.mobileShowImages,
  'tallers': GLOB_IMPORTS.mobileTallerImages,
  'animacions': GLOB_IMPORTS.mobileAnimacionsImages,
  'contacte': GLOB_IMPORTS.mobileContacteImages,
  'filipersones': GLOB_IMPORTS.mobileFilipersonesImages,
};

const desktopMap: Record<ImageRoute, Record<string, () => Promise<string>>> = {
  '': GLOB_IMPORTS.desktopImages,
  'espectacles': GLOB_IMPORTS.desktopShowImages,
  'tallers': GLOB_IMPORTS.desktopTallerImages,
  'animacions': GLOB_IMPORTS.desktopAnimacionsImages,
  'contacte': GLOB_IMPORTS.desktopContacteImages,
  'filipersones': GLOB_IMPORTS.desktopFilipersonesImages,
};

/**
 * Loads an image URL from a lazy-loaded import function.
 * @param {() => Promise<string>} load - The function that loads the image module.
 * @returns {Promise<string | undefined>} The resolved image URL or undefined if not found.
 */
async function loadImageUrl(load: () => Promise<string>): Promise<string | undefined> {
  try {
    return await load();
  } catch (error) {
    console.warn('Failed to load image:', error);
    return undefined;
  }
}

/**
 * Gets the image URL directly from the image map (non-reactive, for preloading).
 * @param {string} imageName - The file name, e.g., "avatar-1.jpg"
 * @param {ImageRoute} route - The route where the image is allocated in the assets' folder.
 * @param {boolean} isMobile - Whether to get mobile or desktop version.
 * @returns {Promise<string | undefined>} The resolved image URL or undefined if not found.
 */
async function getImageUrlDirect(imageName: string, route: ImageRoute, isMobile: boolean): Promise<string | undefined> {
  const imageMap = isMobile ? mobileMap : desktopMap;
  const images = imageMap[route] || {};
  const imageKey = Object.keys(images).find(path => {
    const filename = path.split('/').pop() || path;
    return filename === `${imageName}.webp` || filename.startsWith(`${imageName}.`);
  });
  if (!imageKey || !images[imageKey]) {
    console.warn(`Image ${imageName} not found in route ${route}. Available keys:`, Object.keys(images).slice(0, 5));
    return undefined;
  }
  return loadImageUrl(images[imageKey]);
}

/**
 * Returns the image URL for a given image name.
 * @param {string} imageName - The file name, e.g., "avatar-1.jpg"
 * @param {ImageRoute} route - The route where the image is allocated in the assets' folder.
 * @returns {ComputedRef<string | undefined>} The resolved image URL or undefined if not found.
 */
export function useImageUrl(imageName: string, route: ImageRoute): ComputedRef<string | undefined> {
  const { isMobile } = useResponsive();
  const imageUrl = ref<string | undefined>(undefined);
  const imageMap = computed(() => isMobile.value ? mobileMap : desktopMap);
  const images = computed(() => imageMap.value[route] || {});

  watchEffect(async () => {
    const currentImages = images.value;
    const imageKeys = Object.keys(currentImages);
    const imageKey = imageKeys.find(path => {
      const filename = path.split('/').pop() || path;
      return filename === `${imageName}.webp` || filename.startsWith(`${imageName}.`);
    });

    if (!imageKey || !currentImages[imageKey]) {
      console.warn(`[useImageUrl] Image ${imageName} not found in route ${route}`, {
        imageName,
        route,
        availableKeys: imageKeys.slice(0, 10),
      });
      imageUrl.value = undefined;
      return;
    }

    imageUrl.value = await loadImageUrl(currentImages[imageKey]);
  });

  return computed(() => imageUrl.value);
}

/**
 * Gets both mobile and desktop image URLs for preloading.
 * @param {string} imageName - The file name, e.g., "avatar-1.jpg"
 * @param {ImageRoute} route - The route where the image is allocated in the assets' folder.
 * @returns {Promise<{ mobile: string | undefined, desktop: string | undefined }>} Promise that resolves to an object with mobile and desktop URLs.
 */
export async function getImageUrlsForPreload(imageName: string, route: ImageRoute): Promise<{ mobile: string | undefined, desktop: string | undefined }> {
  const [mobile, desktop] = await Promise.all([
    getImageUrlDirect(imageName, route, true),
    getImageUrlDirect(imageName, route, false)
  ]);
  return { mobile, desktop };
}
