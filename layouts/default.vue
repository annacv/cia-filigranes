<script setup lang="ts">
const route = useRoute()
const { showBanner, showModal } = useCookies()

const headerBackgroundColor = computed(() => {
  return (route.meta.headerBackgroundColor as string) || 'transparent'
})
</script>

<template>
  <TheHeader :background-color="headerBackgroundColor" />
  <slot></slot>
  <TheFooter />
  <CookieBanner v-if="showBanner"/>
  <CookieModal v-if="showModal"/>
</template>
