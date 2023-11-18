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
      Layout default
      <header>
        Header
        <NavMenu/>
        <LangSwitcher />
      </header>

      <main>
        main
        <slot/>
      </main>
      <footer>Footer</footer>
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
