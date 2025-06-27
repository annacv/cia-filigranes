<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useScroll } from '@vueuse/core'

const cover = ref<HTMLElement | null>(null)
const coverHeight = ref(0)

const initialClipPath = 'polygon(0 0, 100% 0, 100% 86%, 0% 100%)'
const scrolledClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
const fixedClipPath = 'polygon(0 0, 100% 0, 100% 110px, 0% 110px)'

const isScrolled = ref(false)
const isFixed = ref(false)
const hasSoftLight = ref(false)

onMounted(() => {
  if (cover.value) coverHeight.value = cover.value.offsetHeight
})

const {
  y,
  isScrolling,
  arrivedState,
  directions,
} = useScroll(window, {
  throttle: 16, // ~60fps
  onScroll: () => {
    // At top
    if (arrivedState.top) {
      isScrolled.value = false
      isFixed.value = false
      hasSoftLight.value = false
      return
    }

    // Scrolled state (after leaving the top)
    const progress = Math.min(y.value / coverHeight.value, 1)
    isScrolled.value = progress > 0.01
    hasSoftLight.value = isScrolled.value && !isFixed.value

    // Fixed state (when scrolled past 80% of cover)
    isFixed.value = progress >= 0.8
  }
})

const currentClipPath = computed(() => {
  if (isFixed.value) return fixedClipPath
  if (isScrolled.value) return scrolledClipPath
  return arrivedState.top ? initialClipPath : scrolledClipPath
})
</script>

<template>
  <div v-if="isFixed" class="h-[110px]"></div>
  <div
    ref="cover"
    class="z-10 h-screen bg-blend-hard-light grid grid-cols-12 content-center bg-cover bg-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :style="{
      backgroundImage: `linear-gradient(to right bottom, rgb(200 13 13 / 72%), rgb(14 2 4 / 66%)), url('/_nuxt/assets/images/007.JPG')`,
      clipPath: currentClipPath,
      backgroundPosition: isFixed ? 'center center' : 'center 20%',
      backgroundBlendMode: hasSoftLight ? 'soft-light' : 'hard-light'
    }"
    :class="{ 'h-[110px] fixed w-full top-0 left-0': isFixed }"
  >
    <div
      v-if="!isFixed"
      class="col-start-8 col-span-4 place-self-end transition-opacity duration-500"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
