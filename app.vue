<script setup lang="ts">
import { computed } from "vue";
import archivoBlackRegular from '~/assets/fonts/archivo-black/archivo-black-regular.woff2?url';
import ibmPlexSansRegular from '~/assets/fonts/ibm-plex-sans/ibm-plex-sans-regular.woff2?url';

const nuxtApp = useNuxtApp();
const { t, locale } = useI18n();
const route = useRoute();

const head = useLocaleHead({
  dir: true,
  seo: true,
});
const htmlAttrs = computed(() => head.value.htmlAttrs || {});

// Open Graph and Twitter Card meta tags
const baseUrl = 'https://www.ciafiligranes.net';
useSeoMeta({
  ogTitle: computed(() => t('title')),
  ogDescription: computed(() => t('home.metaDescription')),
  ogImage: computed(() => `${baseUrl}/og_image.jpg`),
  ogImageAlt: computed(() => t('title')),
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageType: 'image/jpeg',
  ogType: 'website',
  ogUrl: computed(() => `${baseUrl}${route.path === '/' ? '' : route.path}`),
  ogSiteName: computed(() => t('title')),
  ogLocale: computed(() => locale.value),
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('title')),
  twitterDescription: computed(() => t('home.metaDescription')),
  twitterImage: computed(() => `${baseUrl}/og_image.jpg`),
  twitterImageAlt: computed(() => t('title')),
});

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
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
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
    <Body class="antialiased bg-white">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
@import "@/tailwindcss/index.css";
</style>
