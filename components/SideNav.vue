<template>
  <div
    class="z-20 overflow-y-scroll fixed top-0 right-0 bg-black h-full box-border w-full md:w-[50%] lg:w-[35%] py-10 px-8 md:px-10"
  >
    <div class="flex justify-between items-center mb-10">
      <LangSwitcher />
      <TheBurger
        :isOpen="isOpen"
        class="sidenav__burger"
        @toggle="emit('toggle')"
      />
    </div>
    <NavMenu @toggle="emit('toggle')" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggle']);
const props = defineProps({
  isOpen: Boolean
});
</script>

<style lang="scss">
  .sidenav {
    .navbar {
      &__menu-list {
        flex-flow: column nowrap;
        padding: 0 0 2rem;
      }

      &__menu-item {
        margin: 0.75rem 0;
      }

      &__menu-item > a {
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    &__burger {
      .burger {
        &__bar {
          &--1 {
            transform: rotate(-45deg) translateY(4px);
          }

          &--2 {
            transform: rotate(45deg) translate(-1px, -5px);
          }

          &--3 {
            display: none;
          }
        }
      }
    }
  }
</style>
