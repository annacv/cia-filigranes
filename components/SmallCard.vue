<script setup lang="ts">
import { ref } from 'vue';
import type { ImageRoute } from "~/composables/use-get-image-url.composable";
import { getImageUrl } from "~/composables/use-get-image-url.composable";
import { useI18n } from "vue-i18n";
import ArrowRight from "assets/icons/arrow-right.svg";

// TODO: All types in one file source
export type CardButton = {
  class: string | object | any[];
  href: string;
  download?: {
    fileName: string;
    fileSource: string;
  };
}

const props = defineProps({
  button: {
    type: Object as PropType<CardButton>,
    required: true
  },
  cardType: {
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
  title: {
    type: String,
    required: true
  }
});

const { t } = useI18n()
const { isDesktop } = useDevice()

const bgColor = computed(() => props.cardType === 'performance' ? 'bg-tertiary-500/40' : props.cardType === 'show' ? 'bg-primary-700/40': 'bg-secondary-700/40');

const isHovered = ref(false);
const toggleFlip = () => {
  isHovered.value = !isHovered.value;
};

const imageSrc = getImageUrl(props.imageName, props.imageRoute).value;
</script>

<template>
  <ClientOnly>
  <div
    class="relative"
    :class="cardType === 'performance'
  ? 'w-[350px] xl:w-[608px] 2xl:w-[700px] h-[298px] xl:h-[350px] 2xl:h-[350px]'
  : 'w-[298px] xl:w-[350px] 2xl:w-[350px] aspect-square'"
    @mouseenter="toggleFlip"
    @mouseleave="toggleFlip"
  >
    <div class="w-full h-full transition-all duration-800 ease-in-out">
      <img
        class="object-cover object-center pointer-events-none transition-all duration-700"
        :class="isHovered && isDesktop
          ? 'brightness-125 saturate-150 w-[115%] h-[115%]'
          : 'brightness-75 saturate-100 w-full h-full'"
        :src="imageSrc"
        :alt="t('commonAlt', {title: title})"
        loading="lazy"
        draggable="false"
      />

      <div class="w-full h-full">
        <div
          v-if="!isHovered"
          class="absolute inset-0 pointer-events-none transition-all duration-700"
          :class="bgColor"
        ></div>
        <div
          :class="[
             'absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end gap-4 transition-shadow duration-300',
            { 'bg-gradient-to-t from-black/60 to-black/30' : isHovered && isDesktop }
          ]"
        >
          <h3 class="text-3xl 2xl:text-4xl text-left font-grotesk font-bold uppercase text-white wrap-break-word hyphens-auto leading-7">
            {{ title }}
          </h3>
          <FiliButton
            :href="button.href"
            :buttonClass="button.class"
            target="_top"
            :text="t('button.info')"
          >
            <template #icon-right>
              <ArrowRight class="arrow-right"/>
            </template>
          </FiliButton>
        </div>

      </div>
    </div>
  </div>
  </ClientOnly>
</template>
