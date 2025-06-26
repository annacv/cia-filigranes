<template>
  <header role="banner" class="grid grid-cols-12 gap-4 bg-transparent pt-6 pb-6 fixed w-full z-[100]">
    <NuxtLinkLocale :to="('/')" class="col-start-2 3xl:col-start-3 col-span-3">
      <CiaLogo />
    </NuxtLinkLocale>
    <div class="flex items-start col-start-11 3xl:col-start-10 justify-self-end gap-4">
      <TheBurger :isOpen="isOpen" @toggle="toggleSideNav" />
    </div>
    <div class="w-full h-full">
      <Transition name="slide-side">
        <SideNav v-if="isOpen" @toggle="toggleSideNav" />
      </Transition>
      <div v-if="isOpen" class="z-10 backdrop-saturate-150 bg-black/70 w-full h-full fixed top-0 left-0"
        @click="toggleSideNav" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const toggleSideNav = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss">
.slide-side-enter-active,
.slide-side-leave-active {
  transition: 0.5s ease-out;
}

.slide-side-enter-from,
.slide-side-leave-to {
  transform: translateX(100%);
}
</style>
