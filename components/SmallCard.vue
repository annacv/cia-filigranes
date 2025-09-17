<script setup lang="ts">
import { ref } from 'vue';
import type { CardLink, ContentType, CardImage } from "~/types";
import { getImageUrl } from "~/composables/use-get-image-url.composable";
import { useGetColor } from "~/composables/use-get-color.composable";
import { useGetImageAlt } from "~/composables/use-get-image-alt.composable";
import { useI18n } from "vue-i18n";

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

const { t } = useI18n()
const imageSrc = getImageUrl(props.image.imageName, props.image.imageRoute);
const { gradientColorClass } = useGetColor(props.contentType);
const imageAlt = useGetImageAlt(props.contentType, props.title);

const isHovered = ref(false);
const toggleHover = () => {
  isHovered.value = !isHovered.value;
};
</script>

<template>
  <ClientOnly>
  <div
    class="relative"
    :class="contentType === 'performances'
  ? 'w-[298px] sm:w-[320px] xl:w-[720px] 2xl:w-[720px] h-[298px] sm:h-[320px] xl:h-[360px] 2xl:h-[420px]'
  : 'w-[298px] sm:w-[320px] xl:w-[360px] 2xl:w-[420px] aspect-square'"
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
  >
    <NuxtLinkLocale
      :to="link.href"
      class="w-full h-full transition-all duration-800 ease-in-out block"
    >
      <img
        class="object-cover object-center pointer-events-none transition-all duration-700"
        :class="isHovered
          ? 'brightness-110 saturate-110 w-[105%] h-[105%]'
          : 'brightness-70 saturate-100 w-full h-full'"
        :src="imageSrc"
        :alt="imageAlt"
        loading="lazy"
        draggable="false"
      />

      <div class="w-full h-full">
        <div
          v-if="!isHovered"
          class="absolute inset-0 pointer-events-none transition-all duration-700"
          :class="gradientColorClass"
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
