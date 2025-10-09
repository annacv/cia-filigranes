<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import type { ImageRoute, CardLink, CardImage, ContentType } from "~/types";
import { useImageUrl } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useImageAlt } from "~/composables/use-image-alt.composable";
import { useIntersection80 } from "~/composables/use-intersection-percentage.composable";

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

const hoveredImageIndex = ref<number | null>(null);
const imageObservers = props.images.map(() => useIntersection80());
const imageRefs = ref<HTMLElement[]>([]);

const { isMobile } = useDevice()
const { gradientColorClass } = useColor(props.contentType);
const { imageAlt: getImageAlt } = useImageAlt(props.contentType);

const imageAlt = computed(() => getImageAlt(props.title));

const setImageRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    imageRefs.value[index] = el;
  }
};

const setImageHover = (index: number) => {
  if (!isMobile) {
    hoveredImageIndex.value = index;
  }
};

const clearImageHover = () => {
  if (!isMobile) {
    hoveredImageIndex.value = null;
  }
};

const getImageHoverState = (index: number) => {
  if (isMobile) {
    return imageObservers[index]?.isVisibleAt80Percent.value || false;
  } else {
    return hoveredImageIndex.value === index;
  }
};

const getImageHoverClass = (index: number) => {
  const isHovered = getImageHoverState(index);
  return isHovered
    ? 'brightness-110 saturate-110 scale-105'
    : 'brightness-70 saturate-100 scale-100';
};

const setImageSrc = (imageName :string, imageRoute: ImageRoute) => {
  return useImageUrl(imageName, imageRoute).value;
}

// Setup intersection observers reactively when refs become available
watchEffect(() => {
  imageRefs.value.forEach((imageRef, index) => {
    if (imageRef && imageObservers[index]) {
      imageObservers[index].setupIntersectionObserver(ref(imageRef));
    }
  });
});
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
          :ref="(el) => setImageRef(el as HTMLElement, index)"
          class="relative aspect-square overflow-hidden"
          @mouseenter="setImageHover(index)"
          @mouseleave="clearImageHover"
        >
          <img
            class="w-full h-full object-cover object-center pointer-events-none transition-all duration-700"
            :class="getImageHoverClass(index)"
            :src="setImageSrc(image.imageName, image.imageRoute)"
            :alt="imageAlt"
            loading="lazy"
            draggable="false"
          />
          <div
            v-if="!getImageHoverState(index)"
            class="absolute inset-0 pointer-events-none transition-all duration-700"
            :class="gradientColorClass"
          ></div>
        </div>
      </NuxtLinkLocale>
    </div>
  </ClientOnly>
</template>
