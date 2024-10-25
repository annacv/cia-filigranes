<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">

  <Head>
    <template v-for="link in head.link" :key="link.id">
      <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
    </template>
  </Head>

  <Body>
    <TheHeader />
    <HeroCover>
      <template v-slot:placeholder>
        <VintAnysBrand
          class="self-center transform -scale-x-100 w-[200px] lg:w-[348px] xl:w-[500px] 2xl:w-[648px] 3xl:w-[700px]" />
      </template>
      <template v-slot:content>
        <VintAnysBrand class="w-[300px] lg:w-[448px] xl:w-[600px] 2xl:w-[748px] 3xl:w-[800px]" />
      </template>
    </HeroCover>
    <main role="main" class="grid grid-cols-12 gap-4 pt-6 pb-6 min-w-full w-full min-h-screen h-full">
      <div class="col-start-2 3xl:col-start-3 col-span-10 3xl:col-span-8">
        <slot></slot>
      </div>
      <LazyMidCard class="col-start-1 col-span-12" />
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
html,
body,
#ciafiligranes,
main {
  background-color: black;
}
</style>
