<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CardImage, ContentType } from "~/types";
import { useImageSrcset } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";

const props = withDefaults(defineProps<{
  image: CardImage;
  contentType: ContentType;
  imageAlt: string;
  // Touch state: can be managed internally or externally
  index?: number;
  touchedIndex?: number | null;
  useInternalTouchState?: boolean;
}>(), {
  index: undefined,
  touchedIndex: null,
  useInternalTouchState: false
});

const emit = defineEmits<{
  touchStart: [index?: number];
  touchEnd: [];
}>();

const { isMobile } = useResponsive();
const imageData = useImageSrcset(props.image.imageName, props.image.imageRoute);
const { gradientColorClass } = useColor(props.contentType);

// Internal touch state (for SmallCard-like usage)
const isTouched = ref(false);

// Determine if this image is currently touched
const isImageTouched = computed(() => {
  if (props.useInternalTouchState) {
    return isTouched.value;
  }
  // External touch state (for MidCard-like usage)
  return props.index !== undefined && props.touchedIndex === props.index;
});

const handleTouchStart = () => {
  if (isMobile.value) {
    if (props.useInternalTouchState) {
      isTouched.value = true;
      emit('touchStart');
    } else if (props.index !== undefined) {
      emit('touchStart', props.index);
    }
  }
};

const handleTouchEnd = () => {
  if (isMobile.value) {
    if (props.useInternalTouchState) {
      requestAnimationFrame(() => {
        isTouched.value = false;
        emit('touchEnd');
      });
    } else {
      emit('touchEnd');
    }
  }
};
</script>

<template>
  <div
    class="relative w-full h-full overflow-hidden group/image"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <img
      class="w-full h-full object-cover object-center pointer-events-none transition-all duration-700 brightness-70 saturate-100 scale-100"
      :class="isMobile 
        ? (isImageTouched ? 'brightness-110 saturate-110 scale-105' : 'brightness-70 saturate-100 scale-100')
        : 'group-hover/image:brightness-110 group-hover/image:saturate-110 group-hover/image:scale-105'"
      :src="imageData.src"
      :srcset="imageData.srcset"
      :sizes="imageData.sizes"
      :alt="imageAlt"
      width="420"
      height="443"
      style="aspect-ratio: 420 / 443;"
      loading="lazy"
      decoding="async"
      draggable="false"
    >
    <div
      class="absolute inset-0 pointer-events-none transition-all duration-700"
      :class="[
        gradientColorClass,
        isMobile 
          ? (isImageTouched ? 'opacity-0' : 'opacity-100')
          : 'group-hover/image:opacity-0'
      ]"
    />
  </div>
</template>

