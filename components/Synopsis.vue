<script setup lang="ts">
import { ref, computed } from 'vue'
import { useImageUrl } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import type { CardImage, ContentType } from "~/types";
import ArrowRight from "assets/icons/arrow-right.svg";
import ArrowDown from "assets/icons/arrow-down.svg";

const props = defineProps({
  alt: {
    type: String,
    default: ''
  },
  contentType: {
    type: String as PropType<ContentType>,
    required: false
  },
  image: {
    type: Object as PropType<CardImage>,
    required: true
  },
  isReversed: {
    type: Boolean,
    default: false
  },
  showFullContent: {
    type: Boolean,
    default: false
  },
  description: {
    type: Array as () => Record<string, any>[],
    required: true,
    default: () => []
  },
  title: {
    type: String,
    required: false
  },
  infoButton: {
    type: Object,
    default: () => null
  },
  downloadButton: {
    type: Object,
    default: () => null
  }
})

const { isMobile } = useDevice()
const { t } = useI18n()
const isHovered = ref(false)
const imageUrl = useImageUrl(props.image.imageName, props.image.imageRoute);
const { bgColorClass, gradientOverlayValue } = useColor(props.contentType);

const initialClipPath = 'polygon(100% 100%, 4% 100%, 20% 0, 100% 0)';
const reversedClipPath = 'polygon(0 100%, 80% 100%, 96% 0, 0 0)';
const currentClipPath = computed(() => props.isReversed ? reversedClipPath : initialClipPath)

const getColors = computed(() => {
  if (props.contentType) {
    return `${bgColorClass.value} text-neutral-100`;
  }
  return 'bg-neutral-0 text-neutral-900';
})

const toggleHover = () => {
  isHovered.value = !isHovered.value;
};
</script>

<template>
  <div
    :class="`p-0 grid-layout ${getColors}`"
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
  >
    <div :class="[
      'flex flex-col md:flex-row gap-0 xl:gap-5',
      isReversed ? 'layout-cols--to-left md:flex-row-reverse' : 'layout-cols--to-right']"
    >
      <div class="w-full lg:w-[50%] xl:w-[36%] flex flex-col gap-4 p-5 lg:py-20 2xl:py-36">
        <h2 v-if="title" class="font-grotesk uppercase text-3xl lg:text-5xl">
          {{ title }}
        </h2>
        <p
          class="text-lg lg:text-xl"
          :class="showFullContent ? 'flex flex-col gap-4' : 'line-clamp-5'">
          <span
            v-for="item in showFullContent ? description : description.slice(0, 1)"
            :key="item.paragraph"
          >
            {{ item.paragraph }}
          </span>
        </p>

        <div v-if="infoButton || downloadButton" class="flex mt-4 gap-4">
          <FiliButton
            v-if="infoButton"
            :href="infoButton.href"
            :buttonClass="`${infoButton.class} self-start`"
            :text="t('button.info')"
            target="_top"
          >
            <template #text>
              {{ t('button.info') }}
            </template>
            <template #icon-right>
              <ArrowRight class="arrow-right self-end"/>
            </template>
          </FiliButton>
          <FiliButton
            v-if="downloadButton"
            :href="downloadButton.href"
            buttonClass="button-outline-neutral self-start"
            :text="t('button.dossier')"
            :download="downloadButton.download"
          >
            <template #text>
              {{ t('button.dossier') }}
            </template>
            <template #icon-right>
              <ArrowDown class="arrow-down self-end"/>
            </template>
          </FiliButton>
        </div>
      </div>
      <div
        class="w-full h-[400px] md:h-auto bg-no-repeat bg-cover items-center shadow transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :class="[
          isHovered || isMobile ? 'bg-blend-soft-light' : 'bg-blend-hard-light'
        ]"
        :style="{
          backgroundImage: `linear-gradient(to right bottom, ${gradientOverlayValue}), url('${imageUrl}')`,
          backgroundPosition: 'center center',
          clipPath: isMobile ? 'none' : currentClipPath
        }"
      >
        <!-- Added img tag for Accessibility for screen readers -->
        <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" />
      </div>
    </div>
  </div>
</template>
