<script setup>
import { computed } from "vue";

const { isMobile } = useDevice()
const { t } = useI18n()

useHead({
  meta: [
    { name: 'description', content: t('home.description') }
  ]
})

const mobileImages = import.meta.glob('~/assets/images/mobile/*.webp', {
  eager: true,
  import: 'default',
})

const desktopImages = import.meta.glob('~/assets/images/desktop/*.webp', {
  eager: true,
  import: 'default',
})

const imageUrl = computed(() => {
  const imageName = '050'
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
  <div class="h-full">
    <HeroCover :image-url="imageUrl" :alt="t('home.hero.alt')">
      <template #content>
        <h1 class="w-[300px] lg:w-[448px] xl:w-[600px] 3xl:w-[748px]">
          Espectacles de Pallassos i Circ per a totes les edats
        </h1>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrapped>
        <div class="mb-4 bg-gray-100">
          <span class="text-red-500 w-full block">algo</span>
        </div>
      </template>
      <template #full-grid>
        <LazyMidCard class="col-start-1 col-span-12"/>
      </template>
    </MainContent>
  </div>
</template>
