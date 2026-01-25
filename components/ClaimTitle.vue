<script setup lang="ts">
const props = defineProps({
  claim: {
    type: String,
    required: true
  },
  claimTitle: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="grid-layout my-8 md:my-20">
    <h2 class="layout-cols font-light text-neutral-800 text-3xl lg:text-5xl 2xl:w-[90%]">
      {{ claimTitle }} <br class="lg:hidden xl:block"> {{ claim }}
    </h2>
  </div>
</template>
