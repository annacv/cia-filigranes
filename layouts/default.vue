<template>
  <TheHeader :background-color="headerBackgroundColor" />
  <slot></slot>
  <TheFooter />
</template>

<script setup lang="ts">
const { headerBackgroundColor } = useHeader()
</script>
