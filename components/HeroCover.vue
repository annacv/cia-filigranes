<script setup lang="ts">
import { computed } from 'vue'
import { useImageUrl, getImageUrlsForPreload } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useScroll } from "~/composables/use-scroll.composable";
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
const { isScrolled } = useScroll()
const imageUrl = useImageUrl(props.imageName, props.imageRoute);
const { gradientOverlayValue } = useColor(props.contentType);

// Preload images for better performance
const { mobile: mobileImageUrl, desktop: desktopImageUrl } = getImageUrlsForPreload(props.imageName, props.imageRoute);

useHead({
  link: [
    ...(mobileImageUrl ? [{
      rel: 'preload',
      as: 'image' as const,
      href: mobileImageUrl,
      media: '(max-width: 1023px)'
    }] : []),
    ...(desktopImageUrl ? [{
      rel: 'preload',
      as: 'image' as const,
      href: desktopImageUrl,
      media: '(min-width: 1024px)'
    }] : [])
  ]
});

const deviceFixedHeight = computed(() => isMobile.value ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT);

const mobileClip = '94%';
const desktopClip = '86%';
const deviceClip = computed(() => isMobile.value ? mobileClip : desktopClip);

const initialClipPath = computed(() => `polygon(0% 0%, 100% 0%, 100% ${deviceClip.value}, 0% 100%)`);
const fixedClipPath = computed(() => `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`)

const currentClipPath = computed(() => isScrolled.value ? fixedClipPath.value : initialClipPath.value)
const currentHeight = computed(() => isScrolled.value ? deviceFixedHeight.value : '100dvh')
const transitionDuration = computed(() => `${HERO_COVER_ANIMATION_DURATION_MS}ms`)
</script>

<template>
  <ClientOnly>
    <div v-if="isScrolled" class="bg-black" :style="{ height: currentHeight }"/>
    <div
      data-hero-cover
      class="sticky top-0 w-full z-10 bg-no-repeat bg-cover grid-layout items-center shadow transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="isScrolled ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
      :style="{
        backgroundImage: `linear-gradient(to right bottom, ${gradientOverlayValue}), url('${imageUrl}')`,
        backgroundPosition: isScrolled ? 'center center' : backgroundPosition,
        clipPath: currentClipPath,
        height: currentHeight,
        transitionDuration: transitionDuration
      }"
    >
      <!-- Added img tag for Accessibility for screen readers -->
      <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" >
      <div
        class="layout-cols transition-opacity duration-500"
        :class="isScrolled ? 'opacity-0' : 'opacity-100'"
      >
        <div class="flex justify-end">
          <slot name="content"/>
        </div>
      </div>
    </div>
    <template #fallback>
      <!-- Fallback placeholder with same height to prevent layout shift -->
      <div class="sticky top-0 w-full z-10 bg-black" :style="{ height: '100dvh' }"/>
    </template>
  </ClientOnly>
</template>
