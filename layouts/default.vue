<script setup lang="ts">
const route = useRoute()
const { showBanner, showModal } = useCookies()

const headerBackgroundColor = computed(() => {
  return (route.meta.headerBackgroundColor as string) || 'transparent'
})
</script>

<template>
  <TheHeader :background-color="headerBackgroundColor" />
  <slot/>
  <TheFooter />
  <ScrollToTop />
  <ClientOnly>
    <CookieBanner v-if="showBanner"/>
    <CookieModal v-if="showModal"/>
  </ClientOnly>
</template>
