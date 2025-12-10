<script setup lang="ts">
import { computed } from "vue";

const nuxtApp = useNuxtApp();
const { t,locale } = useI18n();

const head = useLocaleHead({
  dir: true,
  seo: true,
});
const htmlAttrs = computed(() => head.value.htmlAttrs || {});

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
