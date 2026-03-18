<script setup lang="ts">
const props = defineProps({
  claim: {
    type: String,
    required: true
  },
  claimTitle: {
    type: String,
    required: true
  },
  isSectionTitle: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :class="`grid-layout ${isSectionTitle ? 'mt-8 mb-4 md:mt-20 md:mb-10' : 'my-8 md:my-20'}`">
    <h2 :class="`layout-cols font-light text-neutral-800 text-3xl 2xl:w-[90%] ${isSectionTitle ? 'lg:text-4xl md:mt-10' : 'lg:text-5xl'}`">
      {{ claimTitle }} <br class="lg:hidden xl:block"> {{ claim }}
    </h2>
  </div>
</template>
