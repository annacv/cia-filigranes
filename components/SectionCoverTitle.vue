<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  titleClass: {
    type: String,
    default: 'max-w-[342px] md:max-w-[448px] lg:max-w-[542px]'
  }
})
</script>

<template>
  <h1
    class="p-5 xs:px-0 sm:px-5 flex flex-col font-grotesk uppercase text-white text-4xl md:text-5xl lg:text-6xl drop-shadow-xl"
    :class="titleClass"
  >
    {{ title }}
  </h1>
</template>