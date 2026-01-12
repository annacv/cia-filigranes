<script setup lang="ts">
import { useImageUrl } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useIntersection80 } from "~/composables/use-intersection-percentage.composable";
import type { CardImage, ContentType } from "~/types";
import ArrowRight from "~/assets/icons/arrow-right.svg";
import ArrowDown from "~/assets/icons/arrow-down.svg";

const props = defineProps({
  alt: {
    type: String,
    default: ''
  },
  backgroundPosition: {
    type: String,
    default: 'center center'
  },
  contentType: {
    type: String as PropType<ContentType>,
    required: false,
    default: undefined
  },
  image: {
    type: Object as PropType<CardImage>,
    required: true
  },
  isReversed: {
    type: Boolean,
    default: false
  },
  isFullReversed: {
    type: Boolean,
    default: false
  },
  showFullContent: {
    type: Boolean,
    default: false
  },
  description: {
    type: Array as () => Record<string, unknown>[],
    required: false,
    default: () => []
  },
  title: {
    type: String,
    required: false,
    default: ''
  },
  infoButton: {
    type: Object,
    default: () => null
  },
  downloadButton: {
    type: Object,
    default: () => null
  },
  shouldClip: {
    type: Boolean,
    default: false
  }
})

const isHovered = ref(false)
const componentRef = ref<HTMLElement>()
const imageRef = ref<HTMLElement>()

const { isMobile } = useResponsive()
const { t } = useI18n()
const imageUrl = useImageUrl(props.image.imageName, props.image.imageRoute);
const { bgColorClass, gradientOverlayValue } = useColor(props.contentType);
const { isVisibleAt80Percent, setupIntersectionObserver } = useIntersection80()

const initialClipPath = 'polygon(100% 100%, 4% 100%, 20% 0%, 100% 0%)';
const reversedClipPath = 'polygon(0% 100%, 80% 100%, 96% 0%, 0% 0%)';
const fullReversedClipPath = 'polygon(0% 100%, 96% 100%, 80% 0%, 0% 0%)';

const mobileClip = computed(() => props.shouldClip ? 'polygon(0% 0%, 100% 0%, 100% 96%, 50% 100%, 0% 96%)' : 'none');
const currentClipPath = computed(() => props.isFullReversed ? fullReversedClipPath : props.isReversed ? reversedClipPath : initialClipPath)

const getColors = computed(() => {
  if (props.contentType && props.contentType !== 'contact') {
    return `${bgColorClass.value} text-neutral-100`;
  }
  if (props.contentType === 'contact') {
    return `${bgColorClass.value} text-neutral-900`
  }
  return 'bg-neutral-0 text-neutral-900';
})

const hoverState = computed(() => isMobile.value ? isVisibleAt80Percent.value : isHovered.value)
const toggleHover = () => isHovered.value = !isHovered.value;

// Setup intersection observer reactively when ref becomes available
watchEffect(() => {
  if (imageRef.value) {
    setupIntersectionObserver(imageRef);
  }
});
</script>

<template>
  <div
    ref="componentRef"
    :class="`p-0 grid-layout ${getColors} contain-card`"
    :style="{ clipPath: isMobile ? mobileClip : 'none' }"
    @mouseenter="toggleHover()"
    @mouseleave="toggleHover()"
  >
    <div
      :class="[
        'flex flex-col lg:flex-row gap-0 xl:gap-5',
        { 'min-h-[464px]': !isMobile },
        isReversed || isFullReversed ? 'layout-cols--to-left lg:flex-row-reverse' : 'layout-cols--to-right']"
    >
      <div class="w-full lg:w-[50%] xl:w-[36%] flex flex-col gap-4 px-5 py-10 lg:py-20 2xl:py-36">
        <slot name="content">
          <h2 v-if="title" class="font-grotesk uppercase text-4xl lg:text-5xl">
            {{ title }}
          </h2>
          <p
            v-if="description"
            class="text-lg lg:text-xl"
            :class="showFullContent ? 'flex flex-col gap-4' : 'line-clamp-5'">
            <span
              v-for="item in showFullContent ? description : description.slice(0, 1)"
              :key="item.paragraph as string"
            >
              {{ item.paragraph }}
            </span>
          </p>
        </slot>

        <div v-if="infoButton || downloadButton" class="flex mt-4 gap-4">
          <FiliButton
            v-if="downloadButton"
            :href="downloadButton.href"
            button-class="button-outline-neutral self-start"
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
          <FiliButton
            v-if="infoButton"
            :href="infoButton.href"
            :button-class="`${infoButton.class} self-start`"
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
        </div>
      </div>
      <div
        v-if="imageUrl"
        ref="imageRef"
        class="w-full h-[400px] lg:h-auto bg-no-repeat bg-cover items-center shadow transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :class="[
          hoverState ? 'bg-blend-soft-light' : 'bg-blend-hard-light'
        ]"
        :style="{
          backgroundImage: `linear-gradient(to right bottom, ${gradientOverlayValue}), url('${imageUrl}')`,
          backgroundPosition: backgroundPosition,
          clipPath: isMobile ? 'none' : currentClipPath
        }"
      >
        <!-- Added img tag for Accessibility for screen readers -->
        <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" >
      </div>
    </div>
  </div>
</template>
