<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
  <Head>
    <template v-for="link in head.link" :key="link.id">
      <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
    </template>
  </Head>

  <Body>
    <TheHeader />
    <HeroCover />
    <main role="main" class="grid grid-cols-12 gap-4 pt-6 pb-6 min-w-full w-full min-h-screen h-full">
      <div class="col-start-2 3xl:col-start-3 col-span-10 3xl:col-span-8">
        <slot></slot>
      </div>
      <LazyMidCard class="col-start-1 col-span-12 mt-4" />
    </main>
    <LazyHighlightContent />
    <footer role="contentinfo">Footer</footer>
  </Body>
  </Html>
</template>

<script setup lang="ts">
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
})
const htmlAttrs = computed(() => head.value.htmlAttrs!)
</script>

<style lang="scss">
html, body, #ciafiligranes, main {
  background-color: black;
}
</style>
