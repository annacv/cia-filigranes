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
  <div class="h-full">
    <HeroCover :image-url="imageUrl" :alt="t('home.hero.alt')">
      <template #content>
        <NuxtLinkLocale :to="'/espectacles/vint-anys'">
          <VintAnysBrand class="w-[300px] lg:w-[448px] xl:w-[600px] 2xl:w-[748px]"/>
        </NuxtLinkLocale>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrapped>
      </template>
      <template #unwrapped>
        <LazyHighlightContent
          :title="t('routes.espectacles')"
          css-classes="highlight-content--1"
        >
          <template #content>
            <LazySmallCard/>
          </template>
        </LazyHighlightContent>
      </template>
    </MainContent>
  </div>
</template>
