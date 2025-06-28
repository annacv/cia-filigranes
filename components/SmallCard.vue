<script setup lang="ts">
import { ref } from 'vue';
import { getImageUrl } from "~/composables/use-get-image-url.composable";

const props = defineProps({
  cardType: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
});

const { t } = useI18n()
const { isDesktop } = useDevice()
const imageSrc = getImageUrl(props.imageName).value;

const bgColor = computed(() => props.cardType === 'performance' ? 'bg-tertiary-500/40' : props.cardType === 'show' ? 'bg-primary-700/40': 'bg-secondary-700/40');

const isFlipped = ref(false);
const toggleFlip = () => {
  isFlipped.value = !isFlipped.value;
};
</script>

<template>
  <ClientOnly>
  <div
    class="relative overflow-hidden h-[298px] 2xl:h-[350px]"
    :class="cardType === 'performance' ? 'w-[350px] 2xl:w-[700px]' : 'w-[298px] 2xl:w-[350px]'"
    @mouseenter="toggleFlip"
    @mouseleave="toggleFlip"
  >
    <div
      class="w-full h-full transition-transform duration-800 ease-in-out"
      :class="{ 'rotate-y-180': isFlipped && isDesktop }"
      style="transform-style: preserve-3d;"
    >
      <!-- Img for card front and back -->
      <img
        class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-all duration-700"
        :class="isFlipped
          ? 'brightness-125 saturate-150'
          : 'brightness-75 saturate-100'"
        :src="imageSrc"
        :alt="t('commonAlt', {title: title})"
        loading="lazy"
        draggable="false"
      />

      <!-- Front -->
      <div class="card-face backface-hidden z-10">
        <div
          v-if="!isFlipped"
          class="absolute inset-0 pointer-events-none transition-all duration-700"
          :class="bgColor"
        ></div>
        <div class="absolute inset-0  bg-gradient-to-r from-black/25 to-black/15 pointer-events-none"></div>
        <h3 class="absolute bottom-4 left-4 max-w-[274px] 2xl:max-w-[326px] text-3xl text-left">
          <span class="font-grotesk font-bold uppercase text-white wrap-break-word">
            {{ title }}
          </span>
        </h3>
      </div>

      <!-- Back -->
      <div class="card-face backface-hidden rotate-y-180 z-20 flex items-end justify-center p-4">
        <div class="absolute inset-0 bg-gradient-to-r from-black/35 to-black/25 pointer-events-none"></div>
        <div class="relative w-[90%] text-center">
          <div class="flex gap-4 justify-center">
            <a
              href="#"
              class="inline-block px-8 py-4 text-gray-800 bg-white  hover:bg-gray-100 transition-colors"
              @click.prevent="toggleFlip"
            >
              {{ t('button.dossier') }}
            </a>
            <a
              href="#"
              class="inline-block px-8 py-4 text-gray-800 bg-white  hover:bg-gray-100 transition-colors"
              @click.prevent="toggleFlip"
            >
              {{ t('button.info') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  </ClientOnly>
</template>

<style scoped>
.card-face {
  @apply absolute w-full h-full top-0 left-0  overflow-hidden;
}
</style>
