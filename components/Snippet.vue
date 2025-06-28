
<script setup lang="ts">
import { ref } from 'vue';
import type { ImageRoute } from "~/composables/use-get-image-url.composable";
import { getImageUrl } from "~/composables/use-get-image-url.composable";
import ArrowDown from "assets/icons/arrow-down.svg";
import ArrowRight from "assets/icons/arrow-right.svg";
import {LOCALE_ROUTES, ROUTES_INDEX} from "~/constants";

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

const { t, locale } = useI18n()
// TODO: refactor to pass an object, also have an object as prop instead
const imageSrc = getImageUrl(props.imageName, props.imageRoute).value;

const bgColor = computed(() => props.cardType === 'performance' ? 'bg-tertiary-500/40' : props.cardType === 'show' ? 'bg-primary-700/40': 'bg-secondary-700/40');
const routes = ROUTES_INDEX;
const shows = routes.find(route => route.name === 'espectacles');
const workshops = routes.find(route => route.name === 'tallers');

const checkIfFileExists = async (path: string): Promise<boolean> => {
  try {
    const res = await fetch(path, { method: 'HEAD' })
    return res.ok
  } catch (err) {
    return false
  }
}

// const getButton = async (route: string, item?: string): Promise<CardButton> => {
//   const key = item ? `${route}/${item}` : route
//   const page = LOCALE_ROUTES[key as keyof typeof LOCALE_ROUTES]
//
//   const fileId = item || route
//   const fileName = `CiaFiligranes-${fileId}-${locale.value}.pdf`
//   const filePath = `/downloads/${fileName}`
//
//   const fileExists = await checkIfFileExists(filePath)
//
//   return {
//     class: route === 'espectacles'
//       ? 'button-outline-primary'
//       : route === 'tallers'
//         ? 'button-outline-secondary'
//         : 'button-outline-tertiary',
//     href: page[locale.value as 'ca' | 'es' | 'en'],
//     download: fileExists ? {
//       fileSource: filePath,
//       fileName
//     } : undefined
//   }
// }


</script>

<template>
  <!-- Back -->
  <div class="card-face backface-hidden rotate-y-180 z-20 flex items-end justify-center p-4">
    <div class="absolute inset-0 bg-gradient-to-r from-black/35 to-black/25 pointer-events-none"></div>
    <div class="relative w-[90%] text-center">
      <div class="flex gap-4 justify-center">
        <FiliButton
          v-if="button.download?.fileSource"
          :href="button.download.fileSource"
          buttonClass="button-outline-neutral"
          :download="button.download.fileName"
          :text="t('button.dossier')"
        >
          <template #icon-right>
            <ArrowDown class="arrow-down"/>
          </template>
        </FiliButton>
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
</template>
