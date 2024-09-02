<template>
  <div class="burger">
    <div
      aria-label="menu"
      class="burger__toggle hover:opacity-75"
      role="button"
      @click="emit('toggle')"
    >
      <div
        :class="{
          'burger__bar': true,
          'burger__bar--1': true,
          'rotate-45': isOpen
        }"
        class="bg-white"
      ></div>
      <div
        :class="{
          'burger__bar': true,
          'burger__bar--2': true,
          'opacity-0': isOpen
        }"
        class="bg-white"
      ></div>
      <div
        :class="{
          'burger__bar': true,
          'burger__bar--3': true,
          '-rotate-45': isOpen
        }"
        class="bg-white"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggle']);
const props = defineProps({
  isOpen: Boolean
});
</script>

<style lang="scss">
.burger {
  &__toggle {
    display: block;
    position: relative;
    z-index: 1;
    cursor: pointer;
    width: 1.5rem;
    height: 50%;
    text-indent: 100%;
    content: '';
  }

  &__bar {
    transition: transform 0.3s, opacity 0.3s;
    margin-bottom: 0.25rem;
    border-radius: 0.125rem;
    width: 100%;
    height: 0.1875rem;

    /* Custom classes for toggled state */
    &.rotate-45 {
      transform: rotate(45deg);
    }

    &.opacity-0 {
      opacity: 0;
    }

    &.-rotate-45 {
      transform: rotate(-45deg);
    }
  }
}
</style>
