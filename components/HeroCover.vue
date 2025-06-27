<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const isScrolled = ref(false)

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

const initialClipPath = 'polygon(0 0, 100% 0, 100% 86%, 0% 100%)'
const fixedClipPath = 'polygon(0 0, 100% 0, 100% 110px, 0% 110px)'

const currentClipPath = computed(() =>
  isScrolled.value ? fixedClipPath : initialClipPath
)
const currentHeight = computed(() =>
  isScrolled.value ? '110px' : '100vh'
)
</script>

<template>
  <div v-if="isScrolled" class="h-[110px] bg-black"></div>
  <div
    class="sticky top-0 w-full z-10 bg-cover bg-center grid grid-cols-12 items-center shadow transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :class="isScrolled ? 'bg-blend-soft-light' : 'bg-blend-hard-light'"
    :style="{
      backgroundImage: `linear-gradient(to right bottom, rgb(200 13 13 / 72%), rgb(14 2 4 / 66%)), url('/_nuxt/assets/images/007.JPG')`,
      backgroundPosition: isScrolled ? 'center center' : 'center 20%',
      clipPath: currentClipPath,
      height: currentHeight
    }"
  >
    <div
      class="col-start-9 col-span-4 justify-self-end p-8 transition-opacity duration-500"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
