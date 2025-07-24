<script setup lang="ts">
import { getImageUrl, type ImageRoute} from "~/composables/use-get-image-url.composable";
import {computed } from "vue";
import { CONTACT } from "~/constants";

const props = defineProps({
  alt: {
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
  },
  description: {
    type: String,
    required: true
  }
});

const { isMobile } = useDevice()
const imageUrl = getImageUrl(props.imageName, props.imageRoute);

const mobileHeight = '374px';
const desktopHeight = '820px';
const deviceHeight = computed(() => isMobile ? mobileHeight : desktopHeight);

const mobileClip = '15%';
const desktopClip = '25%';
const deviceClip = computed(() => isMobile ? mobileClip : desktopClip);
const deviceClipPath = computed(() => `polygon(0 0, 100% ${deviceClip.value}, 100% 100% , 0% 100%)`);
</script>

<template>
  <div class="grid-layout">
    <div class="layout-cols text-center">
      <h2 class="w-full font-thin text-4xl font-sans text-neutral-900 pt-8 pb-4 2xl:pb-8">
        {{ title }}
      </h2>
      <i18n-t
        class="max-w-[90%] md:max-w-[532px] m-auto text-lg lg:text-2xl 2xl:text-3xl font-sans text-neutral-900 pb-8"
        tag="p"
        scope="global"
        :keypath="description"
      >
        <template #email>
          <a class="font-bold" :href="`mailto:${CONTACT.email}`">
            {{ CONTACT.email }}
          </a>
        </template>
        <template #phone>
          <a class="font-bold" :href="`tel:${CONTACT.phones.albert}`">
            {{ CONTACT.phones.albert }}
          </a>
        </template>
      </i18n-t>
    </div>
  </div>
  <div
    class="w-full bg-no-repeat bg-cover bg-position-[center, 80%] bg-blend-hard-light shadow transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :style="{
      backgroundImage: `linear-gradient(to right bottom, rgb(200 13 13 / 0.72), rgb(20 2 4 / 0.66)), url('${imageUrl}')`,
      backgroundPosition: 'center 30%',
      clipPath: deviceClipPath,
      height: deviceHeight,
    }"
  >
    <!-- Added img tag for Accessibility for screen readers -->
    <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" />
  </div>
</template>

