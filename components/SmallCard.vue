<script setup lang="ts">
import { ref, computed } from 'vue';
import type { CardLink, ContentType, CardImage } from "~/types";
import { useImageAlt } from "~/composables/use-image-alt.composable";

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

const { isMobile } = useResponsive();
const imageAlt = computed(() => useImageAlt(props.contentType, props.title));
const isTouched = ref(false);
</script>

<template>
  <ClientOnly>
    <div
      class="relative group"
      :class="contentType === 'performances'
        ? 'w-[298px] xs:w-[310px] sm:w-[320px] xl:w-[720px] 2xl:w-[720px] h-[298px] xs:h-[310px] sm:h-[320px] xl:h-[360px] 2xl:h-[420px]'
        : 'w-[298px] xs:w-[310px] sm:w-[320px] xl:w-[360px] 2xl:w-[420px] aspect-square'"
    >
      <NuxtLinkLocale
        :to="link.href"
        class="w-full h-full transition-all duration-800 ease-in-out block"
      >
        <CardImage
          :image="image"
          :content-type="contentType"
          :image-alt="imageAlt"
          :use-internal-touch-state="true"
          @touch-start="isTouched = true"
          @touch-end="isTouched = false"
        />
        <div class="w-full h-full absolute inset-0 pointer-events-none">
          <!-- Mobile blend mode overlay -->
          <div
            v-if="isMobile"
            class="absolute inset-0 pointer-events-none transition-all duration-700"
            :class="isTouched ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
          />
          <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end gap-4 transition-shadow duration-300">
            <h3 class="text-2xl xl:text-3xl text-left font-grotesk font-bold uppercase text-white leading-7 max-w-[75%] 2xl:max-w-[73%]">
              {{ title }}
            </h3>
          </div>
        </div>
      </NuxtLinkLocale>
    </div>
  </ClientOnly>
</template>
