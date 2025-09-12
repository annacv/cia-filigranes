<template>
  <div
    class="flex justify-center rounded-full z-[100]"
    :class="[{'border' : !isOpen }, isOpen ? 'w-[24px] h-[24px] m-1' : 'w-[32px] h-[32px]']"
  >
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
    @apply bg-white w-full h-[2px] rounded-sm;
    transform-origin: center;
    transition: transform 0.3s, opacity 0.3s;
    &--1 {
      transform: rotate(-45deg) translate(0, 4px);
    }
    &--2 {
      transform: rotate(45deg) translate(0, -4px);
    }
  }
}
</style>
