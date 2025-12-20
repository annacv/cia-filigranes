<script setup lang="ts">
import { computed } from 'vue'
import { getImageUrlsForPreload } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useScrollState } from "~/composables/use-scroll-state.composable";
import { useHeroFirstScrollHijack } from "~/composables/hero-scroll/use-hero-first-scroll-hijack.composable";
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, HERO_COVER_ANIMATION_DURATION_MS } from "~/constants";
import type { ImageRoute, ContentType } from "~/types";

const props = defineProps({
  alt: {
    type: String,
    default: ''
  },
  imageName: {
    type: String,
    required: true
  },
  imageRoute: {
    type: String as PropType<ImageRoute>,
    required: true
  },
  contentType: {
    type: String as PropType<ContentType>,
    default: 'shows'
  },
  backgroundPosition: {
    type: String,
    default: 'center 30%'
  }
})

const { isMobile } = useResponsive()
const { isScrolled } = useScrollState()
useHeroFirstScrollHijack()
const { gradientOverlayValue } = useColor(props.contentType);

// Resolve image URLs during SSR for LCP optimization
const { data: imageUrls } = await useAsyncData(
  `hero-image-${props.imageName}-${props.imageRoute}`,
  () => getImageUrlsForPreload(props.imageName, props.imageRoute),
  {
    server: true,
    default: () => ({ mobile: undefined, desktop: undefined })
  }
);

const mobileImageUrl = computed(() => imageUrls.value?.mobile);
const desktopImageUrl = computed(() => imageUrls.value?.desktop);
const currentImageUrl = computed(() => isMobile.value ? mobileImageUrl.value : desktopImageUrl.value);
const imageSrcset = computed(() => {
  const parts: string[] = [];
  if (mobileImageUrl.value) {
    parts.push(`${mobileImageUrl.value} 1023w`);
  }
  if (desktopImageUrl.value) {
    parts.push(`${desktopImageUrl.value} 1024w`);
  }
  return parts.length > 0 ? parts.join(', ') : undefined;
});

// Preload images in head during SSR
useHead({
  link: computed(() => {
    const links = [];
    if (mobileImageUrl.value) {
      links.push({
        rel: 'preload',
        as: 'image' as const,
        href: mobileImageUrl.value,
        media: '(max-width: 1023px)',
        fetchpriority: 'high' as const
      });
    }
    if (desktopImageUrl.value) {
      links.push({
        rel: 'preload',
        as: 'image' as const,
        href: desktopImageUrl.value,
        media: '(min-width: 1024px)',
        fetchpriority: 'high' as const
      });
    }
    return links;
  })
});

const mobileClip = '94%';
const desktopClip = '86%';
const transitionDuration = computed(() => `${HERO_COVER_ANIMATION_DURATION_MS}ms`);

const deviceFixedHeight = computed(() => isMobile.value ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT);
const deviceClip = computed(() => isMobile.value ? mobileClip : desktopClip);

const initialClipPath = computed(() => `polygon(0% 0%, 100% 0%, 100% ${deviceClip.value}, 0% 100%)`);
const fixedClipPath = computed(() => `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`);

const currentClipPath = computed(() => isScrolled.value ? fixedClipPath.value : initialClipPath.value);
const currentHeight = computed(() => isScrolled.value ? deviceFixedHeight.value : '100dvh');
const imagePosition = computed(() => isScrolled.value ? 'center center' : props.backgroundPosition);
</script>

<template>
  <div
    data-hero-cover
    class="sticky top-0 w-full z-10 grid-layout items-center shadow transition-all ease-[cubic-bezier(0.4,0,0.2,1)] relative overflow-hidden"
    :style="{
      clipPath: currentClipPath,
      height: currentHeight,
      transitionDuration: transitionDuration
    }"
  >
    <picture v-if="currentImageUrl" class="absolute inset-0 w-full h-full">
      <source v-if="mobileImageUrl" :srcset="mobileImageUrl" media="(max-width: 1023px)" />
      <source v-if="desktopImageUrl" :srcset="desktopImageUrl" media="(min-width: 1024px)" />
      <img
        :src="currentImageUrl"
        :alt="alt"
        :srcset="imageSrcset"
        sizes="100vw"
        fetchpriority="high"
        loading="eager"
        decoding="async"
        class="w-full h-full object-cover transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
        :style="{
          objectPosition: imagePosition,
          transitionDuration: transitionDuration
        }"
      />
    </picture>
    
    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 w-full h-full transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="isScrolled ? 'mix-blend-soft-light' : 'mix-blend-hard-light'"
      :style="{
        background: `linear-gradient(to right bottom, ${gradientOverlayValue})`,
        transitionDuration: transitionDuration
      }"
    />
    
    <div
      class="layout-cols transition-opacity duration-500 relative z-10"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <div class="flex justify-end">
        <slot name="content"/>
      </div>
    </div>
  </div>
</template>
