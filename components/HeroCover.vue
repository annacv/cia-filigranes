<script setup lang="ts">
import { computed } from 'vue'
import { useImageUrl } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useScroll } from "~/composables/use-scroll.composable";
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
  }
})

const { isMobile } = useDevice()
const { isScrolled } = useScroll()
const imageUrl = useImageUrl(props.imageName, props.imageRoute);
const { gradientOverlayValue } = useColor(props.contentType);

const mobileHeight = '72px';
const desktopHeight = '87px';
const deviceFixedHeight = computed(() => isMobile ? mobileHeight : desktopHeight);

const mobileClip = '94%';
const desktopClip = '86%';
const deviceClip = computed(() => isMobile ? mobileClip : desktopClip);

const initialClipPath = computed(() => `polygon(0% 0%, 100% 0%, 100% ${deviceClip.value}, 0% 100%)`);
const fixedClipPath = computed(() => `polygon(0% 0%, 100% 0%, 100% ${deviceFixedHeight.value}, 0% ${deviceFixedHeight.value})`)

const currentClipPath = computed(() => isScrolled.value ? fixedClipPath.value : initialClipPath.value)
const currentHeight = computed(() => isScrolled.value ? deviceFixedHeight.value : '100dvh')
</script>

<template>
  <div v-if="isScrolled" class="bg-black" :style="{ height: currentHeight }"></div>
  <div
    class="sticky top-0 w-full z-10 bg-no-repeat bg-cover grid grid-cols-6 xl:grid-cols-12 items-center shadow transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :class="isScrolled ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
    :style="{
        backgroundImage: `linear-gradient(to right bottom, ${gradientOverlayValue}), url('${imageUrl}')`,
      backgroundPosition: isScrolled ? 'center center' : 'center 30%',
      clipPath: currentClipPath,
      height: currentHeight
    }"
  >
    <!-- Added img tag for Accessibility for screen readers -->
    <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" />
    <div
      class="flex justify-end col-start-1 col-span-6 xl:col-start-8 xl:col-span-4 transition-opacity duration-500"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
