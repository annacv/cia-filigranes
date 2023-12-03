<template>
  <header class="grid grid-cols-12 bg-cardinal pt-6 pb-6">
    <CiaLogo class="col-start-2 col-span-3"/>
    <div class="flex items-center col-start-11 justify-self-end gap-4">
      <LangSwitcher/>
      <TheBurger @toggle="isOpen = !isOpen"/>
    </div>
    <NavMenu appear v-show="isOpen"/>
  </header>
</template>

<script setup lang="ts">
const isOpen = ref(false);

</script>