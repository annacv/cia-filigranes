<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";

const { t } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('filipersones', title);

useHead({
  meta: [
    { name: 'description', content: t('filipersones.makutu.metaDescription') }
  ]
})

const { isMobile } = useResponsive()

const abstract = getTranslatedList('filipersones.makutu.abstract', ['paragraph'])
const summaryItems = getTranslatedList('filipersones.makutu.list', ['title', 'description'])
const intro = getTranslatedList('filipersones.makutu.intro', ['paragraph']) as Record<string, PropertyKey>[]
const background = getTranslatedList('filipersones.makutu.background', ['paragraph']) as Record<string, PropertyKey>[]
const learningPath = getTranslatedList('filipersones.makutu.learningPath', ['paragraph']) as Record<string, PropertyKey>[]
const synopsis = getTranslatedList('shows.circ-makutu.synopsis', ['paragraph']) as Record<string, PropertyKey>[]
const makutuAlt = getImageAlt('makutu')

</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="filipersones_makutu_hero"
      image-route="filipersones"
      :alt="makutuAlt"
      background-position="center 10%"
    >
      <template #content>
        <div class="p-5 font-grotesk uppercase text-white lg:max-w-[543px]">
          <h1 class="text-5xl md:text-6xl lg:text-7xl">
            {{ t('routes.makutu') }}
          </h1>
          <h2 class="text-4xl md:text-5xl lg:text-6xl">
            {{ t('filipersones.makutu.hero.subtitle') }}
          </h2>
        </div>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrapped>
        <Summary
          :abstract="abstract"
          :items="summaryItems"
        />
      </template>
      <template #unwrapped>
        <Synopsis
          :description="intro"
          :image="getImageByRoute('filipersones', 'albert')"
          content-type="shows"
          :alt="makutuAlt"
          show-full-content
        />
        <Synopsis
          :description="background"
          :image="getImageByRoute('filipersones', 'makutu-1')"
          content-type="shows"
          :alt="makutuAlt"
          show-full-content
          :is-reversed="!isMobile"
        />
        <Synopsis
          :description="learningPath"
          :image="getImageByRoute('filipersones', 'makutu-2')"
          content-type="shows"
          :alt="makutuAlt"
          show-full-content
          should-clip
        />
        <ClaimTitle
          :claim="t('filipersones.makutu.claim')"
          :claim-title="t('filipersones.makutu.claimTitle')"
        />
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'circ-makutu-3')"
          content-type="shows"
          :alt="getImageAlt('circ-makutu')"
          :info-button="{
            href: '/espectacles/circ-makutu',
            class: 'button-outline-primary'
          }"
          background-position="center 30%"
          :is-reversed="!isMobile"
        />
        <HireFili
          class="py-12"
          :title="t('shows.hire.titleSingle')"
          description="shows.hire.description"
          text-color="text-white"
          bg-color="bg-highlight-primary"
        />
      </template>
    </MainContent>
    <HeroFooter
      image-name="filipersones_makutu-3"
      image-route="filipersones"
      :alt="makutuAlt"
      background-position="center 0%"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
