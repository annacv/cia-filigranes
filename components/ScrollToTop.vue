<script setup lang="ts">
import ArrowUp from "assets/icons/arrow-up.svg";
import { useScrollState } from "~/composables/use-scroll-state.composable";

const { hasReachedBottom } = useScrollState();

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 scale-90 translate-y-2"
    enter-to-class="opacity-100 scale-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 scale-100 translate-y-0"
    leave-to-class="opacity-0 scale-90 translate-y-2"
  >
    <button
      v-if="hasReachedBottom"
      class="fixed w-[40px] h-[40px] bottom-[200px] right-5 xl:bottom-[250px] xl:right-6 z-50 bg-primary-500 hover:bg-primary-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1"
      :aria-label="$t('button.scrollToTop')"
      type="button"
      @click="scrollToTop"
    >
      <ArrowUp class="text-white" />
    </button>
  </Transition>
</template>
