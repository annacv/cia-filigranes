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
const fallbackImageUrl = computed(() => desktopImageUrl.value || mobileImageUrl.value);

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

const transitionDuration = computed(() => `${HERO_COVER_ANIMATION_DURATION_MS}ms`);
const imagePosition = computed(() => isScrolled.value ? 'center center' : props.backgroundPosition);

const scrolledHeight = computed(() => {
  if (!isScrolled.value) return undefined
  if (import.meta.client && window.matchMedia('(min-width: 1024px)').matches) {
    return HEADER_DESKTOP_HEIGHT
  }
  return HEADER_MOBILE_HEIGHT
})
</script>

<template>
  <section
    data-hero-cover
    :aria-label="`Hero section ${contentType}`"
    :class="[
      'sticky top-0 w-full z-10 grid-layout items-center shadow relative overflow-hidden',
      'transition-[clip-path,height] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[clip-path,height]',
      isScrolled
        ? '[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]'
        : '[clip-path:polygon(0%_0%,100%_0%,100%_94%,0%_100%)] lg:[clip-path:polygon(0%_0%,100%_0%,100%_86%,0%_100%)]',
    ]"
    :style="{
      transitionDuration: transitionDuration,
      height: isScrolled ? scrolledHeight : '100dvh',
    }"
  >
    <picture v-if="fallbackImageUrl" class="absolute inset-0 w-full h-full">
      <source v-if="mobileImageUrl" :srcset="mobileImageUrl" media="(max-width: 1023px)" />
      <source v-if="desktopImageUrl" :srcset="desktopImageUrl" media="(min-width: 1024px)" />
      <img
        :src="fallbackImageUrl"
        :alt="alt"
        :srcset="imageSrcset"
        sizes="100vw"
        fetchpriority="high"
        loading="eager"
        decoding="sync"
        width="1920"
        height="1080"
        class="w-full h-full object-cover transition-[object-position] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-object-position"
        :style="{
          objectPosition: imagePosition,
          transitionDuration: transitionDuration,
        }"
      />
    </picture>
    
    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 w-full h-full"
      :class="isScrolled ? 'mix-blend-soft-light' : 'mix-blend-hard-light'"
      :style="{
        background: `linear-gradient(to right bottom, ${gradientOverlayValue})`,
      }"
    />
    
    <div
      class="layout-cols transition-opacity duration-500 relative z-10 will-change-opacity"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <div class="flex md:justify-end justify-start">
        <slot name="content"/>
      </div>
    </div>
  </section>
</template>
