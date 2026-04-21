<script setup lang="ts">
const emit = defineEmits(['toggle']);
</script>

<template>
  <div
    class="z-20 overflow-y-auto fixed top-0 right-0 bg-black h-full box-border w-full md:w-[50%] lg:w-[35%] py-10 px-8 md:px-10"
  >
    <LangSwitcher class="mb-10"/>
    <NavMenu @toggle="emit('toggle')" />
  </div>
</template>
