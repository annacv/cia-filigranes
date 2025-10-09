<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import type { CardLink, ContentType, CardImage } from "~/types";
import { useImageUrl } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useImageAlt } from "~/composables/use-image-alt.composable";
import { useIntersection80 } from "~/composables/use-intersection-percentage.composable";

const props = defineProps({
  contentType: {
    type: String as PropType<ContentType>,
    required: true
  },
  image: {
    type: Object as PropType<CardImage>,
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

const componentRef = ref<HTMLElement>()
const isHovered = ref(false);

const { isMobile } = useDevice()
const imageSrc = useImageUrl(props.image.imageName, props.image.imageRoute);
const { gradientColorClass } = useColor(props.contentType);
const { imageAlt: getImageAlt } = useImageAlt(props.contentType);
const { isVisibleAt80Percent, setupIntersectionObserver } = useIntersection80()

const imageAlt = computed(() => getImageAlt(props.title));

const hoverState = computed(() => isMobile ? isVisibleAt80Percent.value : isHovered.value)
const toggleHover = () => isHovered.value = !isHovered.value;

// Setup intersection observer reactively when ref becomes available
watchEffect(() => {
  if (componentRef.value) {
    setupIntersectionObserver(componentRef);
  }
});
</script>

<template>
  <ClientOnly>
  <div
    ref="componentRef"
    class="relative"
    :class="contentType === 'performances'
  ? 'w-[298px] sm:w-[320px] xl:w-[720px] 2xl:w-[720px] h-[298px] sm:h-[320px] xl:h-[360px] 2xl:h-[420px]'
  : 'w-[298px] sm:w-[320px] xl:w-[360px] 2xl:w-[420px] aspect-square'"
    @mouseenter="toggleHover()"
    @mouseleave="toggleHover()"
  >
    <NuxtLinkLocale
      :to="link.href"
      class="w-full h-full transition-all duration-800 ease-in-out block"
    >
      <img
        class="object-cover object-center pointer-events-none transition-all duration-700"
        :class="hoverState
          ? 'brightness-110 saturate-110 w-[105%] h-[105%]'
          : 'brightness-70 saturate-100 w-full h-full'"
        :src="imageSrc"
        :alt="imageAlt"
        loading="lazy"
        draggable="false"
      />

      <div class="w-full h-full">
        <div
          v-if="!hoverState"
          class="absolute inset-0 pointer-events-none transition-all duration-700"
          :class="gradientColorClass"
        ></div>
        <!-- Mobile blend mode overlay -->
        <div
          v-if="isMobile"
          class="absolute inset-0 pointer-events-none transition-all duration-700"
          :class="hoverState ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
        ></div>
        <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end gap-4 transition-shadow duration-300'">
          <h3 class="text-2xl xl:text-3xl text-left font-grotesk font-bold uppercase text-white wrap-break-word hyphens-auto leading-7 max-w-[75%] 2xl:max-w-[73%]">
            {{ title }}
          </h3>
        </div>
      </div>
    </NuxtLinkLocale>
  </div>
  </ClientOnly>
</template>
