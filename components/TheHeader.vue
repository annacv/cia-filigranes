<template>
  <header role="banner" class="grid grid-cols-12 bg-cardinal pt-6 pb-6">
    <NuxtLinkLocale :to="('/')" class="col-start-2 col-span-3">
      <CiaLogo />
    </NuxtLinkLocale>
    <div class="flex items-center col-start-11 justify-self-end gap-4">
      <TheBurger @toggle="isOpen = !isOpen"/>
    </div>
    <SideNav v-if="isOpen" @toggle="isOpen = !isOpen"/>
  </header>
</template>

<script setup lang="ts">
  const isOpen = ref(false);
</script>