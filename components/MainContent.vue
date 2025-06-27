<template>
  <main role="main">
    <div class="grid grid-cols-12 gap-4 pt-6 pb-6 min-w-full w-full min-h-screen h-full">
      <div class="col-start-2 3xl:col-start-3 col-span-10 3xl:col-span-8">
        <slot name="wrapped"></slot>
      </div>
      <slot name="full-grid"></slot>
    </div>
    <slot name="unwrapped"></slot>
  </main>
</template>
<script setup lang="ts">
</script>
