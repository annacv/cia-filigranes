<script setup lang="ts">
const props = defineProps({
  claim: {
    type: String,
    required: false
  },
  claimTitle: {
    type: String,
    required: false
  },
  isSectionTitle: {
    type: Boolean,
    default: false
  },
  subtitle: {
    type: String,
    required: false
  },
  titleClass: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div :class="`grid-layout ${isSectionTitle ? 'mt-8 mb-4 md:mt-20 md:mb-10' : 'my-8 md:my-20'}`">
    <h2 :class="`${titleClass} layout-cols font-light text-neutral-800 text-3xl ${isSectionTitle ? 'lg:text-4xl 2xl:text-5xl md:mt-10 md:px-16 text-center' : 'lg:text-5xl 2xl:w-[90%]'}`">
      {{ claimTitle }} <br class="lg:hidden xl:block"> {{ claim }}
    </h2>
    <p v-if="subtitle" class="layout-cols font-light text-neutral-800 text-lg lg:text-xl 2xl:text-2xl !leading-normal mt-2 xl:mt-0">
      {{ subtitle }}
    </p>
  </div>
</template>
