<template>
  <div ref="cover" class="hero-cover" :class="{ 'soft-light': hasSoftLight, 'scrolled-cover': isScrolled, 'fixed-cover': isFixed }">
    <div class="hero-cover__text-box">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const cover = ref();
const isScrolled = ref(false);
const isFixed = ref(false);
const hasSoftLight = ref(false);

onMounted(() => {
  const coverImage = cover.value;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const intersectionRatio = entry.intersectionRatio;

      if (!isScrolled.value && intersectionRatio < 1) {
        isScrolled.value = true;
        hasSoftLight.value = true;
      }

      if (intersectionRatio <= 0.35985347628593445) {
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

<style lang="scss">
.hero-cover {
  position: relative;
  height: 95vh;
  background-position: center 20%;
  background-blend-mode: hard-light;
  //background-blend-mode: soft-light;
  // background-image: url(../assets/images/007.jpg);
  // background-image: linear-gradient(to right bottom,
  //     rgba(200, 13, 13, 0.2),
  //     rgba(188, 27, 54, 0.2)),
  //   url(../assets/images/007.jpg);
  background-image: linear-gradient(to right bottom, rgb(200 13 13 / 72%), rgb(14 2 4 / 66%)), url(/_nuxt/assets/images/007.JPG);
  background-size: cover;
  transition: clip-path 1s ease, background-blend-mode 0.5s ease;
  z-index: 9;
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
}

.soft-light {
  background-blend-mode: soft-light;
}

.scrolled-cover {
  clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 75%);
}

.fixed-cover {
  position: fixed;
  top: -62vh;
  left: 0;
  width: 100%;
}

.hero-cover__text-box {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
