<script setup lang="ts">
import { ref, computed } from 'vue'
import { useImageUrl } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import type { CardImage, ContentType } from "~/types";

const props = defineProps({
  alt: {
    type: String,
    default: ''
  },
  contentType: {
    type: String as PropType<ContentType>,
    required: false
  },
  extraContent: {
    type: Boolean,
    default: false
  },
  showMore: {
    type: Boolean,
    default: false
  },
  image: {
    type: Object as PropType<CardImage>,
    required: true
  },
  isReversed: {
    type: Boolean,
    default: false
  },
  techCard: {
    type: Array as () => Record<string, any>[],
    required: true,
    default: () => []
  },
  artCard: {
    type: Array as () => Record<string, any>[],
    required: true,
    default: () => []
  },
})

const emit = defineEmits(['viewMore'])

const { isMobile } = useDevice()
const { t } = useI18n()
const isHovered = ref(false)
const imageUrl = useImageUrl(props.image.imageName, props.image.imageRoute);
const { gradientOverlayValue } = useColor(props.contentType);

const initialClipPath = 'polygon(80% 100%, 0% 100%, 20% 0, 100% 0)';
const reversedClipPath = 'polygon(20% 100%, 100% 100%, 80% 0, 0% 0)';
const currentClipPath = computed(() => props.isReversed ? reversedClipPath : initialClipPath)

const buttonText = computed(() => props.showMore ? t('button.goBack') : t('button.viewMore'))

const toggleHover = () => {
  isHovered.value = !isHovered.value;
};
</script>

<template>
  <div
    class="p-0 grid-layout bg-neutral-0 text-neutral-900"
    @mouseenter="toggleHover"
    @mouseleave="toggleHover"
  >
    <div class="layout-cols flex gap-5">
      <div class="flex flex-col gap-5 w-[20%] p-4 pr-0 lg:py-12 2xl:py-24">
        <Transition
          name="fade"
          mode="out-in"
        >
          <ul
            :key="`art-${showMore ? 'more' : 'less'}`"
            class="flex flex-col gap-5 w-full"
          >
            <li
              v-for="item in artCard"
              :key="item.title"
              class="flex flex-col gap-2 text-sm lg:text-base"
            >
              <p class="font-bold">{{ item.title }}</p>
              <p class="font-light">{{ item.description }}</p>
            </li>
          </ul>
        </Transition>
      </div>
    
      <div
        class="w-[55%] h-min-[400px] md:h-auto bg-no-repeat bg-cover items-center shadow transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
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
      <div class="flex flex-col justify-between gap-5 w-[24%] py-4 lg:py-12 2xl:py-24">
        <Transition
          name="fade"
          mode="out-in"
        >
          <ul
            :key="`tech-${showMore ? 'more' : 'less'}`"
            class="flex flex-col gap-5 w-full"
          >
            <li
              v-for="item in techCard"
              :key="item.title"
              class="flex flex-col gap-2 text-sm lg:text-base"
            >
              <p class="font-bold">{{ item.title }}</p>
              <p class="font-light">{{ item.description }}</p>
            </li>
          </ul>
        </Transition>
        <FiliButton
          v-if="extraContent"
          class="mt-1"
          buttonClass="text-primary-500 border-primary-300 rounded-none border-t-0 border-x-0 !p-1 hover:border-primary-500 justify-self-end"
          :text="buttonText"
          @click="emit('viewMore')"
        >
          <template #text>
            {{ buttonText }}
          </template>
        </FiliButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
