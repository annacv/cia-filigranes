<template>
  <TheHeader :logo-color="logoColor" :burger-color="burgerColor" :background-color="headerBackgroundColor" />
  <slot></slot>
  <TheFooter />
</template>

<script setup lang="ts">
const { headerBackgroundColor, logoColor, burgerColor } = useHeader()
</script>
