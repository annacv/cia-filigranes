<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const cover = ref();
const isScrolled = ref(false);
const isFixed = ref(false);
const hasSoftLight = ref(false);
const coverHeight = ref(0);
const isAtTop = ref(true);

const finalClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
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
    class="hero-cover bg-blend-hard-light grid grid-cols-12 content-center"
    :class="{
      'bg-blend-soft-light': hasSoftLight,
      'scrolled-cover': isScrolled,
      'fixed-cover': isFixed,
      'at-top': isAtTop
    }"
  >
    <div
      class="col-start-8 col-span-4 place-self-end transition-all duration-500"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-cover {
  height: 100vh;
  background-size: cover;
  z-index: 9;
  background-position: center 20%;
  transition:
    clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    background-blend-mode 0.5s ease,
    background-position 0.5s ease;
  background-image:
    linear-gradient(to right bottom, rgb(200 13 13 / 72%), rgb(14 2 4 / 66%)),
    url('/_nuxt/assets/images/007.JPG');

  // Initial state (top of page)
  clip-path: v-bind('initialClipPath');

  // When scrolled down
  &.scrolled-cover {
    clip-path: v-bind('scrolledClipPath');
  }

  // When fixed at top
  &.fixed-cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 124px;
    clip-path: v-bind('fixedClipPath');
    background-position: center center;
  }

  // When back at top
  &.at-top {
    clip-path: v-bind('initialClipPath');
  }
}

/* Ensure smooth transitions */
* {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Optional: Add reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .hero-cover {
    transition: none;
  }
}
</style>
