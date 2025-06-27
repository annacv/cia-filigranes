<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

const { isMobile } = useDevice()
const isScrolled = ref(false)

const mobileHeight = '110px';
const desktopHeight = '210px';
const deviceFixedHeight = computed(() => isMobile ? mobileHeight : desktopHeight);

const initialClipPath = 'polygon(0 0, 100% 0, 100% 86%, 0% 100%)'
const fixedClipPath = computed(() => `polygon(0 0, 100% 0, 100% ${deviceFixedHeight.value}, 0% ${deviceFixedHeight.value})`)

const currentClipPath = computed(() =>
  isScrolled.value ? fixedClipPath.value : initialClipPath
)

const currentHeight = computed(() =>
  isScrolled.value ? deviceFixedHeight.value : '100vh'
)

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
    class="sticky top-0 w-full z-10 bg-cover bg-center grid grid-cols-12 items-center shadow transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :class="isScrolled ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
    :style="{
      backgroundImage: `linear-gradient(to right bottom, rgb(200 13 13 / 72%), rgb(14 2 4 / 66%)), url('${imageUrl}')`,
      backgroundPosition: isScrolled ? 'center center' : 'center 20%',
      clipPath: currentClipPath,
      height: currentHeight,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <!-- Added img tag for Accessibility for screen readers -->
    <img :src="imageUrl" :alt="alt" style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px); white-space: nowrap;" aria-hidden="false" />
    <div
      class="col-start-9 col-span-4 2xl:col-start-8 justify-self-end p-8 2xl:p-0 transition-opacity duration-500"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
