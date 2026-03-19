<script setup lang="ts">
const props = defineProps({
  claim: {
    type: String,
    required: false
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
    <h2 :class="`layout-cols font-light text-neutral-800 text-3xl ${isSectionTitle ? 'lg:text-4xl 2xl:text-5xl md:mt-10 md:px-16' : 'lg:text-5xl 2xl:w-[90%]'}`">
      {{ claimTitle }} <br class="lg:hidden xl:block"> {{ claim }}
    </h2>
  </div>
</template>
