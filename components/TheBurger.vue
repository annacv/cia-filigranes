<template>
  <div class="flex justify-center rounded-full w-[33px] h-[33px] z-[100]" :class="{'border' : !isOpen }">
  <div
    aria-label="menu"
    class="flex flex-col relative justify-between hover:opacity-75 w-4 z-[1] cursor-pointer indent-[100%] content-[''] py-2"
    :class="isOpen ? 'w-8' : 'w-4'"
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
    @apply bg-white w-full h-[3px] rounded-sm;
    transition: transform 0.3s, opacity 0.3s;
    &--1 {
      transform: rotate(-45deg) translate(-4px, 6px);
    }
    &--2 {
      transform: rotate(45deg) translate(-4px, -6px);
    }
  }
}
</style>
