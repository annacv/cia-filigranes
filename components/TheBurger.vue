<template>
  <div class="burger">
    <div
      aria-label="menu"
      class="burger__toggle"
      role="button"
      @click="emit('toggle')"
    >
      <div class="burger__bar burger__bar--1 bg-white"></div>
      <div class="burger__bar burger__bar--2 bg-white"></div>
      <div class="burger__bar burger__bar--3 bg-white"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggle'])
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
    transition: transform 0.3s, opacity 0.3s, -webkit-transform 0.3s;
    margin-bottom: 0.25rem;
    border-radius: 0.125rem;
    width: 100%;
    height: 0.1875rem;
  }
}

.burger-close {
  .burger {
    &__bar {
      &--1 {
        transform: rotate(-45deg) translateY(4px);
      }

      &--2 {
        transform: rotate(45deg) translate(-1px, -5px);
      }

      &--3 {
        opacity: 0;
      }
    }
  }
}
</style>