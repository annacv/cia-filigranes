<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CardLink, CardImage, ContentType } from "~/types";
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
const imageAlt = computed(() => useImageAlt(props.contentType, props.title));
const handleImageTouchStart = (index?: number) => {
  if (index !== undefined) {
    touchedImageIndex.value = index;
  }
};

const handleImageTouchEnd = () => {
  requestAnimationFrame(() => {
    touchedImageIndex.value = null;
  });
}
</script>

<template>
  <ClientOnly>
    <div class="relative h-[298px] xs:h-[310px] sm:h-[320px] xl:h-[360px] 2xl:h-[420px]">
      <NuxtLinkLocale
        :to="link.href"
        class="flex gap-1 w-full h-full transition-all duration-800 ease-in-out"
      >
        <CardImage
          v-for="(image, index) in props.images"
          class="w-[298px] xs:w-[310px] sm:w-[320px] xl:w-[360px] 2xl:w-[420px] aspect-square"
          :key="index"
          :image="image"
          :content-type="props.contentType"
          :image-alt="imageAlt"
          :index="index"
          :touched-index="touchedImageIndex"
          @touch-start="handleImageTouchStart"
          @touch-end="handleImageTouchEnd"
        />
      </NuxtLinkLocale>
    </div>
  </ClientOnly>
</template>
