<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const cover = ref();
const isScrolled = ref(false);
const isFixed = ref(false);
const hasSoftLight = ref(false);
const coverHeight = ref(0);
const isAtTop = ref(true);

const initialClipPath = 'polygon(0 0, 100% 0, 100% 86%, 0% 100%)';
const scrolledClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
const fixedClipPath = 'polygon(0 0, 100% 0, 100% 110px, 0% 110px)';

function updateCoverState(intersectionRatio: number) {
  if (isAtTop.value) {
    isFixed.value = false;
    isScrolled.value = false;
    hasSoftLight.value = false;
    return;
  }

  // If cover is not fully visible
  if (intersectionRatio < 1) {
    isScrolled.value = true;
    hasSoftLight.value = true;
  }

  // If cover is mostly out of view
  if (intersectionRatio <= 0.20) {
    isFixed.value = true;
    hasSoftLight.value = false;
  }
}

const handleScroll = () => {
  if (typeof window === 'undefined') return;
  isAtTop.value = window.scrollY < 10; // Small threshold
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const coverImage = cover.value;

  if (coverImage) {
    coverHeight.value = coverImage.offsetHeight;
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      updateCoverState(entry.intersectionRatio);
    });
  }, {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    root: null,
  });

  if (coverImage) {
    observer.observe(coverImage);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  const coverImage = cover.value;
  if (observer && coverImage) {
    observer.unobserve(coverImage);
  }
  window.removeEventListener('scroll', handleScroll);
});

watch(isAtTop, (newVal) => {
  if (newVal) {
    updateCoverState(1); // At top, intersectionRatio is 1
  }
}, { immediate: true });
</script>

<template>
  <div v-if="isFixed" :style="{ height: coverHeight + 'px' }">
    <!-- Spacer for fixed cover -->
  </div>
  <div
    ref="cover"
    class="z-10 h-screen bg-blend-hard-light grid grid-cols-12 content-center bg-cover bg-center transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
    :style="{
      backgroundImage: `linear-gradient(to right bottom, rgb(200 13 13 / 72%), rgb(14 2 4 / 66%)), url('/_nuxt/assets/images/007.JPG')`,
      clipPath: isFixed ? fixedClipPath : isScrolled ? scrolledClipPath : isAtTop ? initialClipPath : scrolledClipPath,
      backgroundPosition: isFixed ? 'center center' : 'center 20%',
      backgroundBlendMode: hasSoftLight ? 'soft-light' : 'hard-light'
    }"
    :class="{ 'h-[110px] fixed w-full top-0 left-0': isFixed }"
  >
    <div
      class="col-start-8 col-span-4 place-self-end transition-all duration-500"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
/* Ensure smooth transitions */
* {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
