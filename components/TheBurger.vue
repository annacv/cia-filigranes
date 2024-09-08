<template>
  <div class="burger">
    <div
      aria-label="menu"
      class="block relative hover:opacity-75 h-1/2 w-6 z-[1] cursor-pointer indent-[100%] content-['']"
      role="button"
      @click="emit('toggle')"
    >
      <div
        :class="{'burger__bar--1': isOpen}"
        class="burger__bar"
      ></div>
      <div
        :class="{'burger__bar--2': isOpen}"
        class="burger__bar"
      ></div>
      <div
        :class="{'burger__bar--3 hidden': isOpen}"
        class="burger__bar"
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
  &__bar {
    @apply bg-white mb-1 w-full h-[0.1875rem] rounded-sm;
    transition: transform 0.3s, opacity 0.3s;

    &--1 {
      transform: rotate(-45deg) translateY(4px);
    }
    &--2 {
      transform: rotate(45deg) translate(-1px, -5px);
    }
  }
}
</style>
