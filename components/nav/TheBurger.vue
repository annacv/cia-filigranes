<script setup lang="ts">
const emit = defineEmits(['toggle']);
const props = defineProps({
  isOpen: Boolean,
});

const { t } = useI18n();

const ariaLabel = computed(() =>
  props.isOpen ? t('aria.menuClose') : t('aria.menuOpen'),
);
</script>

<template>
  <div
    class="flex justify-center rounded-full z-[100]"
    :class="[{ border: !isOpen }, isOpen ? 'w-[24px] h-[24px] m-1' : 'w-[32px] h-[32px]']"
  >
    <button
      type="button"
      class="flex flex-col relative justify-between bg-transparent border-0 hover:opacity-75 z-[1] cursor-pointer py-2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      :class="isOpen ? 'w-8' : 'w-4'"
      :aria-label="ariaLabel"
      :aria-expanded="isOpen"
      aria-controls="site-side-nav"
      @click="emit('toggle')"
    >
      <span
        :class="{ 'burger__bar--1': isOpen }"
        class="burger__bar"
        aria-hidden="true"
      />
      <span
        :class="{ 'burger__bar--2': isOpen }"
        class="burger__bar"
        aria-hidden="true"
      />
      <span
        :class="{ 'burger__bar--3 hidden': isOpen }"
        class="burger__bar"
        aria-hidden="true"
      />
    </button>
  </div>
</template>

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
