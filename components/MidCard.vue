<script setup lang="ts">
import { ref } from 'vue';
import type { ImageRoute, CardLink, CardImage, ContentType } from "~/types";
import { getImageUrl } from "~/composables/use-get-image-url.composable";
import { useGetColor } from "~/composables/use-get-color.composable";
import { useGetImageAlt } from "~/composables/use-get-image-alt.composable";

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

const { t } = useI18n()
const { gradientColorClass } = useGetColor(props.contentType);
const imageAlt = useGetImageAlt(props.contentType, props.title);

const hoveredImageIndex = ref<number | null>(null);

const setImageHover = (index: number) => {
  hoveredImageIndex.value = index;
};

const clearImageHover = () => {
  hoveredImageIndex.value = null;
};

const setImageSrc = (imageName :string, imageRoute: ImageRoute) => {
  return getImageUrl(imageName, imageRoute).value;
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
          class="relative aspect-square overflow-hidden"
          @mouseenter="setImageHover(index)"
          @mouseleave="clearImageHover"
        >
          <img
            class="w-full h-full object-cover object-center pointer-events-none transition-all duration-700"
            :class="hoveredImageIndex === index
            ? 'brightness-110 saturate-110 scale-105'
            : 'brightness-70 saturate-100 scale-100'"
            :src="setImageSrc(image.imageName, image.imageRoute)"
            :alt="imageAlt"
            loading="lazy"
            draggable="false"
          />
          <div
            v-if="hoveredImageIndex !== index"
            class="absolute inset-0 pointer-events-none transition-all duration-700"
            :class="gradientColorClass"
          ></div>
        </div>
      </NuxtLinkLocale>
    </div>
  </ClientOnly>
</template>
