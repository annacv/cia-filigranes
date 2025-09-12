<script setup lang="ts">
import { ref, computed } from 'vue'
import { getImageUrl } from "~/composables/use-get-image-url.composable";

const props = defineProps({
  alt: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    required: false
  },
  imageName: {
    type: String,
    required: true
  },
  imageRoute: {
    type: String as PropType<ImageRoute>,
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
  synopsis: {
    type: Array as () => Record<string, any>[],
    required: true,
    default: () => []
  },
})

const { isMobile } = useDevice()
const isHovered = ref(false)
const imageUrl = getImageUrl(props.imageName, props.imageRoute);

const rightStart = 'xl:col-start-2 lg:col-span-3 xl:col-span-3'
const leftStart = 'xl:col-start-5 xl:col-span-12'

const initialClipPath = 'polygon(100% 100%, 4% 100%, 20% 0, 100% 0)';
const reversedClipPath = 'polygon(0 100%, 50% 100%, 100% 0, 0 0)';
const currentClipPath = computed(() => props.isReversed ? reversedClipPath : initialClipPath)

const getColors = computed(() => props.bgColor ? `${props.bgColor} text-neutral-100` : 'bg-neutral-0 text-neutral-900')

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
    <div
      :class="[
        'flex flex-col gap-4 col-start-1 col-span-6 p-5 lg:py-20 2xl:py-36',
        !isReversed ? rightStart : leftStart
      ]"
    >
      <p
        class="text-base lg:text-xl"
        :class="showFullContent ? 'flex flex-col gap-4' : 'line-clamp-5'">
        <span
          v-for="item in showFullContent ? synopsis : synopsis.slice(0, 1)"
          :key="item.paragraph"
        >
          {{ item.paragraph }}
        </span>
      </p>

      <slot name="extra-left-content"></slot>
    </div>
    <div
      class="h-[400px] lg:h-auto bg-no-repeat bg-cover items-center shadow transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :class="[
        isHovered || isMobile ? 'bg-blend-soft-light' : 'bg-blend-hard-light',
        'col-start-1 col-span-6',
        !isReversed ? leftStart : rightStart
      ]"
      :style="{
        backgroundImage: `linear-gradient(to right bottom, rgb(200 13 13 / 0.72), rgb(20 2 4 / 0.66)), url('${imageUrl}')`,
        backgroundPosition: 'center center',
        clipPath: !isMobile ? currentClipPath : 'none',
      }"
    >
      <!-- Added img tag for Accessibility for screen readers -->
      <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" />
    </div>
  </div>
</template>
