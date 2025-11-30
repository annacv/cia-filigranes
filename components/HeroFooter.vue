<script setup lang="ts">
import { useImageUrl } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useScroll } from "~/composables/use-scroll.composable";
import type { ImageRoute, ContentType } from "~/types";
import { computed } from "vue";

const props = defineProps({
  alt: {
    type: String,
    required: true
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
    default: 'center center'
  }
});

const { isMobile, isSmallTablet } = useResponsive()
const { hasReachedBottom } = useScroll()
const imageUrl = useImageUrl(props.imageName, props.imageRoute);
const { gradientOverlayValue } = useColor(props.contentType);

const mobileHeight = '400px';
const smallTabletHeight = '600px';
const desktopHeight = '800px';
const deviceHeight = computed(() => {
  if (isSmallTablet.value) return smallTabletHeight
  return isMobile.value ? mobileHeight : desktopHeight
});

const mobileClip = '6%';
const desktopClip = '9%';
const deviceClip = computed(() => isMobile.value ? mobileClip : desktopClip);
const deviceClipPath = computed(() => `polygon(0 0, 100% ${deviceClip.value}, 100% 100% , 0% 100%)`);
</script>

<template>
  <ClientOnly>
    <div
      class="mt-10 lg:mt-20 w-full bg-no-repeat bg-cover bg-blend-hard-light shadow transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="hasReachedBottom ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
      :style="{
        backgroundImage: `linear-gradient(to right bottom, ${gradientOverlayValue}), url('${imageUrl}')`,
        backgroundPosition: backgroundPosition,
        clipPath: deviceClipPath,
        height: deviceHeight,
      }"
    >
      <!-- Added img tag for Accessibility for screen readers -->
      <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" >
    </div>
    <template #fallback>
      <!-- Fallback placeholder with mobile height to prevent layout shift -->
      <div class="mt-10 lg:mt-20 w-full bg-black" :style="{ height: '400px' }"/>
    </template>
  </ClientOnly>
</template>

