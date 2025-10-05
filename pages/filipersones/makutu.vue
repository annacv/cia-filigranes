<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";

const { t } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('filipersones');

useHead({
  meta: [
    { name: 'description', content: t('filipersones.makutu.metaDescription') }
  ]
})
const abstract = getTranslatedList('filipersones.makutu.abstract', ['paragraph'])
const summaryItems = getTranslatedList('filipersones.makutu.list', ['title', 'description'])
const intro = getTranslatedList('filipersones.makutu.intro', ['paragraph'])
const background = getTranslatedList('filipersones.makutu.background', ['paragraph'])
const learningPath = getTranslatedList('filipersones.makutu.learningPath', ['paragraph'])
const synopsis = getTranslatedList('shows.circ-makutu.synopsis', ['paragraph'])
const makutuAlt = getImageAlt('makutu')

</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="filipersones_makutu_hero"
      image-route="animacions"
      :alt="makutuAlt"
    >
      <template #content>
        <div class="px-5 lg:px-0 font-grotesk uppercase text-white lg:max-w-[543px]">
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
          :image="getImageByRoute('filipersones', 'makutu_1')"
          content-type="shows"
          :alt="makutuAlt"
          show-full-content
        />
        <Synopsis
          :description="background"
          :image="getImageByRoute('filipersones', 'makutu_2')"
          content-type="shows"
          :alt="makutuAlt"
          show-full-content
          isReversed
        />
        <Synopsis
          :description="learningPath"
          :image="getImageByRoute('filipersones', 'makutu_3')"
          content-type="shows"
          :alt="makutuAlt"
          show-full-content
        />
        <ClaimTitle
          :claim="t('filipersones.makutu.claim')"
          :claim-title="t('filipersones.makutu.claimTitle')"
        />
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'circ-makutu')"
          content-type="shows"
          :alt="getImageAlt('circ-makutu')"
          :info-button="{
            href: '/espectacles/circ-makutu',
            class: 'button-outline-primary'
          }"
          isReversed
        />
        <HireFili
          class="py-12"
          :title="t('shows.hire.titleSingle')"
          description="shows.hire.description"
          textColor="text-white"
          bgColor="bg-highlight-primary"
        />
      </template>
    </MainContent>
    <HeroFooter
      image-name="makutu_footer"
      image-route="filipersones"
      :alt="makutuAlt"
    />
  </div>
</template>
