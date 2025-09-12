<script setup lang="ts">
import { computed } from 'vue'

const nuxtApp = useNuxtApp()
const { t } = useI18n()

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
})
const htmlAttrs = computed(() => head.value.htmlAttrs!)

nuxtApp.hook('page:finish', () => {
  if (import.meta.client) {
    window.scrollTo(0, 0)
  }
})
</script>

<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
  <Head>
    <Title>{{ t('title') }}</Title>
    <template v-for="link in head.link" :key="link.id">
      <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang"/>
    </template>
    <template v-for="meta in head.meta" :key="meta.id">
      <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
    </template>
  </Head>
  <Body class="antialiased">
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  </Body>
  </Html>
</template>

<style>
@import '@/tailwindcss/index.css';
</style>
