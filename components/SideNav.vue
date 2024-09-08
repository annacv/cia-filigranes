<template>
  <div
    class="z-20 overflow-y-scroll fixed top-0 right-0 bg-black h-full box-border w-full md:w-[50%] lg:w-[35%] py-10 px-8 md:px-10"
  >
    <div class="flex justify-between items-center mb-10">
      <LangSwitcher />
      <TheBurger
        :isOpen="true"
        @toggle="emit('toggle')"
      />
    </div>
    <NavMenu @toggle="emit('toggle')" />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggle']);
</script>
