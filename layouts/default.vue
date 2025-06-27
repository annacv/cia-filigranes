<script setup lang="ts">
import { computed } from 'vue'

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
})
const htmlAttrs = computed(() => head.value.htmlAttrs!)

const { isMobile } = useDevice()
const { t } = useI18n()

const mobileImages = import.meta.glob('~/assets/images/mobile/*.webp', {
  eager: true,
  import: 'default',
})

const desktopImages = import.meta.glob('~/assets/images/desktop/*.webp', {
  eager: true,
  import: 'default',
})

const imageUrl = computed(() => {
  const imageName = '007'
  const imageKey = Object.keys(isMobile ? mobileImages : desktopImages).find(path => path.includes(`/${imageName}.webp`))
  if (!imageKey) {
    console.warn(`Image ${imageName} not found in:`, Object.keys(isMobile ? mobileImages : desktopImages))
    return ''
  }
  const url = isMobile ? mobileImages[imageKey] : desktopImages[imageKey]
  return typeof url === 'string' ? url : ''
})
</script>

<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <Head>
      <Title>{{ t('title') }}</Title>
      <template v-for="link in head.link" :key="link.id">
        <a :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang"/>
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>

    <Body>
      <TheHeader />
      <HeroCover :image-url="imageUrl" :alt="t('home.hero.alt')">
        <template v-slot:content>
          <VintAnysBrand class="w-[300px] lg:w-[448px] xl:w-[600px] 3xl:w-[748px]" />
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
