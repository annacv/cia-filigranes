<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ImageRoute, CardLink, CardImage, ContentType } from "~/types";
import { useImageUrl } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useImageAlt } from "~/composables/use-image-alt.composable";

const props = defineProps({
  contentType: {
    type: String as PropType<ContentType>,
    required: true
  },
  images: {
    type: Array as PropType<CardImage[]>,
    required: true
  },
  link: {
    type: Object as PropType<CardLink>,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const touchedImageIndex = ref<number | null>(null)

const { isMobile } = useDevice()
const { gradientColorClass } = useColor(props.contentType);
const { imageAlt: getImageAlt } = useImageAlt(props.contentType);

const imageAlt = computed(() => getImageAlt(props.title));

const handleImageTouchStart = (index: number) => {
  if (isMobile) {
    touchedImageIndex.value = index
  }
}

const handleImageTouchEnd = () => {
  if (isMobile) {
    requestAnimationFrame(() => {
      touchedImageIndex.value = null
    })
  }
}
</script>

<template>
  <ClientOnly>
    <div class="relative h-[298px] sm:h-[320px] xl:h-[360px] 2xl:h-[420px]">
      <NuxtLinkLocale
        :to="link.href"
        class="flex gap-1 w-full h-full transition-all duration-800 ease-in-out"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="relative aspect-square overflow-hidden group/image"
          @touchstart.passive="handleImageTouchStart(index)"
          @touchend.passive="handleImageTouchEnd"
        >
          <img
            class="w-full h-full object-cover object-center pointer-events-none transition-all duration-700 brightness-70 saturate-100 scale-100"
            :class="isMobile 
              ? (touchedImageIndex === index ? 'brightness-110 saturate-110 scale-105' : 'brightness-70 saturate-100 scale-100')
              : 'group-hover/image:brightness-110 group-hover/image:saturate-110 group-hover/image:scale-105'"
            :src="useImageUrl(image.imageName, image.imageRoute).value"
            :alt="imageAlt"
            loading="lazy"
            draggable="false"
          >
          <div
            class="absolute inset-0 pointer-events-none transition-all duration-700"
            :class="[
              gradientColorClass,
              isMobile 
                ? (touchedImageIndex === index ? 'opacity-0' : 'opacity-100')
                : 'group-hover/image:opacity-0'
            ]"
          />
        </div>
      </NuxtLinkLocale>
    </div>
  </ClientOnly>
</template>
