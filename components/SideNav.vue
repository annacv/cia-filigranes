<template>
  <div class="sidenav__container">
    <div
      class="sidenav__backdrop"
      @click="emit('toggle')"
    />
    <transition name="slide-side">
      <div
        class="sidenav"
      >
        <div class="sidenav__header">
          <LangSwitcher/>
          <div class="burger-container">
            <TheBurger
              class="burger-close"
              @toggle="emit('toggle')"
            />
          </div>
        </div>
        <div @click="emit('toggle')">
          <NavMenu/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['toggle'])
</script>

<style lang="scss">
  .sidenav {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10000;
    background-color: red;
    padding: 0 0.9375rem;
    width: 88%;
    height: 100%;
    box-sizing: border-box;

    @media (min-width: 768px) {
      padding: 0 2rem;
      width: 53%;
    }

    &__container {
      width: 100%;
      height: 100%;
    }

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      background-color: rgba(0, 0, 0, 0.7);
      width: 100%;
      height: 100%;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      margin: 0 0 3.5rem;
      padding: 1.7rem 0;
      height: 3rem;

      @media (min-width: 768px) {
        padding: 3rem 0;
      }

      .burger-container {
        margin-top: 0.6rem;
      }
    }

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
  }

  .slide-side-enter-active,
  .slide-side-leave-active {
    transition: 0.3s ease-out;
  }

  .slide-side-enter,
  .slide-side-leave-to {
    transform: translateX(100%);
  }

</style>
