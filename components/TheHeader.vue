<template>
  <header role="banner" class="grid-layout bg-transparent fixed w-full z-[100]">
    <NuxtLinkLocale :to="('/')" class="col-start-1 col-span-3 xl:col-start-2 xl:col-span-2">
      <CiaLogo class="w-[174px] hover:opacity-85"/>
    </NuxtLinkLocale>
    <div class="flex items-start col-start-6 xl:col-start-11 col-span-1 xl:col-span-1 justify-self-end">
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
