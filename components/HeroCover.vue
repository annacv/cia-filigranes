<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const cover = ref();
const isScrolled = ref(false);
const isFixed = ref(false);
const hasSoftLight = ref(false);
const coverHeight = ref(0);

const finalClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
const initialClipPath = 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)';
const scrolledClipPath = 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)';
const fixedClipPath = 'polygon(0 0, 100% 0, 100% 124px, 0% 124px)';

onMounted(() => {
  const coverImage = cover.value;

  if (coverImage) {
    coverHeight.value = coverImage.offsetHeight;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const intersectionRatio = entry.intersectionRatio;

      if (!isScrolled.value && intersectionRatio < 1) {
        isScrolled.value = true;
        hasSoftLight.value = true;
      }

      console.log(intersectionRatio);

      if (intersectionRatio <= 0.20) {
        isFixed.value = true;
        hasSoftLight.value = false;
      }
    });
  }, {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    root: null,
  });

  observer.observe(coverImage);

  onBeforeUnmount(() => {
    if (coverImage) {
      observer.unobserve(coverImage);
    }
  });
});
</script>

<template>
  <div v-if="isFixed" :style="{ height: coverHeight + 'px' }">
  <!--  Spacer for fixed cover -->
  </div>
  <div ref="cover" class="hero-cover bg-blend-hard-light grid grid-cols-12 content-center"
    :class="{ 'bg-blend-soft-light': hasSoftLight, 'scrolled-cover': isScrolled, 'fixed-cover': isFixed }">
    <div class="col-start-8 col-span-4 place-self-end transition-[opacity]"
      :class="isScrolled ? 'opacity-0' : 'opacity-1'">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.hero-placeholder,
.hero-cover {
  height: 100vh;
  background-size: cover;
  z-index: 9;
}

.hero-cover {
  background-position: center 20%;
  transition: clip-path 0.5s ease, background-blend-mode 0.5s ease;
  background-image:
    linear-gradient(to right bottom, rgb(200 13 13 / 72%), rgb(14 2 4 / 66%)),
    url('/_nuxt/assets/images/007.JPG');
  clip-path: v-bind('isFixed ? fixedClipPath : isScrolled ? scrolledClipPath : initialClipPath');

  &.scrolled-cover {
    clip-path: v-bind('scrolledClipPath');
  }

  &.fixed-cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 124px;
    clip-path: v-bind('fixedClipPath');
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
