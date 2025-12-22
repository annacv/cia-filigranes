<script setup lang="ts">
import { computed } from "vue";
import archivoBlackRegular from '~/assets/fonts/archivo-black/archivo-black-regular.woff2?url';
import ibmPlexSansRegular from '~/assets/fonts/ibm-plex-sans/ibm-plex-sans-regular.woff2?url';

const nuxtApp = useNuxtApp();
const { t,locale } = useI18n();

const head = useLocaleHead({
  dir: true,
  seo: true,
});
const htmlAttrs = computed(() => head.value.htmlAttrs || {});

useHead({
  link: [
    {
      rel: 'preload',
      href: archivoBlackRegular,
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: ibmPlexSansRegular,
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
  ],
  // Prevent layout shift from font loading
  style: [
    {
      innerHTML: `
        body.antialiased {
          font-family: 'IBM Plex Sans', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size-adjust: 0.5;
        }
      `,
      key: 'font-fallback',
    },
  ],
});

// Block browser scroll restoration immediately
// This must be set before any navigation happens
if (import.meta.client && typeof history !== 'undefined') {
  history.scrollRestoration = 'manual'
}

nuxtApp.hook("page:finish", () => {
  if (import.meta.client) {
    window.scrollTo(0, 0);
  }
});
</script>

<template>
  <Html :id="`locale-${locale}`" :lang="htmlAttrs.lang || locale" :dir="htmlAttrs.dir || 'ltr'">
    <Head>
      <Title>{{ t("title") }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
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
@import "@/tailwindcss/index.css";
</style>
