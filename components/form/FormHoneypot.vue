<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <div
    class="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
    aria-hidden="true"
  >
    <input
      v-model="model"
      type="text"
      name="website"
      tabindex="-1"
      autocomplete="off"
    >
  </div>
</template>
