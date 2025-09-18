<script setup lang="ts">
import { getImageUrl } from "~/composables/use-get-image-url.composable";
import { useGetColor } from "~/composables/use-get-color.composable";
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
  }
});

const { isMobile } = useDevice()
const { hasReachedBottom } = useScroll()
const imageUrl = getImageUrl(props.imageName, props.imageRoute);
const { gradientOverlayValue } = useGetColor(props.contentType);

const mobileHeight = '400px';
const desktopHeight = '900px';
const deviceHeight = computed(() => isMobile ? mobileHeight : desktopHeight);

const mobileClip = '6%';
const desktopClip = '9%';
const deviceClip = computed(() => isMobile ? mobileClip : desktopClip);
const deviceClipPath = computed(() => `polygon(0 0, 100% ${deviceClip.value}, 100% 100% , 0% 100%)`);
</script>

<template>
  <div
    class="mt-24 w-full bg-no-repeat bg-cover bg-blend-hard-light shadow transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :class="hasReachedBottom ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
    :style="{
      backgroundImage: `linear-gradient(to right bottom, ${gradientOverlayValue}), url('${imageUrl}')`,
      backgroundPosition: 'center center',
      clipPath: deviceClipPath,
      height: deviceHeight,
    }"
  >
    <!-- Added img tag for Accessibility for screen readers -->
    <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" />
  </div>
</template>

