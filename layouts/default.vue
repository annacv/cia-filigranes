<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link
          :id="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
      </template>
    </Head>
    <Body>
      <TheHeader role="banner"/>
      <main role="main" class="grid grid-cols-12 gap-4 bg-slate-300 pt-6 pb-6 min-w-full w-full min-h-screen h-full">
        <div class="col-start-3 col-span-8">
          <slot />
        </div>
        
      </main>
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
