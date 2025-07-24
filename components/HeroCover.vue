<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { getImageUrl } from "~/composables/use-get-image-url.composable";

const props = defineProps({
  alt: {
    type: String,
    default: ''
  },
  imageName: {
    type: String,
    required: true
  },
  imageRoute: {
    type: String as PropType<ImageRoute>,
    required: true
  },
})

const { isMobile } = useDevice()
const isScrolled = ref(false)
const imageUrl = getImageUrl(props.imageName, props.imageRoute);

const mobileHeight = '72px';
const desktopHeight = '87px';
const deviceFixedHeight = computed(() => isMobile ? mobileHeight : desktopHeight);

const mobileClip = '94%';
const desktopClip = '86%';
const deviceClip = computed(() => isMobile ? mobileClip : desktopClip);

const initialClipPath = computed(() => `polygon(0 0, 100% 0, 100% ${deviceClip.value}, 0% 100%)`);
const fixedClipPath = computed(() => `polygon(0 0, 100% 0, 100% ${deviceFixedHeight.value}, 0% ${deviceFixedHeight.value})`)

const currentClipPath = computed(() => isScrolled.value ? fixedClipPath.value : initialClipPath.value)
const currentHeight = computed(() => isScrolled.value ? deviceFixedHeight.value : '100vh')

function onScroll() {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-if="isScrolled" class="h-[110px] lg:h-[210px] bg-black"></div>
  <div
    class="sticky top-0 w-full z-10 bg-no-repeat bg-cover grid grid-cols-6 xl:grid-cols-12 items-center shadow transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :class="isScrolled ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
    :style="{
      backgroundImage: `linear-gradient(to right bottom, rgb(200 13 13 / 0.72), rgb(20 2 4 / 0.66)), url('${imageUrl}')`,
      backgroundPosition: isScrolled ? 'center center' : 'center 30%',
      clipPath: currentClipPath,
      height: currentHeight
    }"
  >
    <!-- Added img tag for Accessibility for screen readers -->
    <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" />
    <div
      class="col-start-1 col-span-6 xl:col-start-8 xl:col-span-4 2xl:col-start-8 justify-self-end transition-opacity duration-500"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
