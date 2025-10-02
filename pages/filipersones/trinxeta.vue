<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";

const { t } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('filipersones');

useHead({
  meta: [
    { name: 'description', content: t('performances.metaDescription') }
  ]
})
const abstract = getTranslatedList('filipersones.trinxeta.abstract', ['paragraph'])
const summaryItems = getTranslatedList('filipersones.trinxeta.list', ['title', 'description'])
const intro = getTranslatedList('filipersones.trinxeta.intro', ['paragraph'])
const background = getTranslatedList('filipersones.trinxeta.background', ['paragraph'])
const learningPath = getTranslatedList('filipersones.trinxeta.learningPath', ['paragraph'])
const synopsis = getTranslatedList('shows.circ-trinxeta.synopsis', ['paragraph'])
const trinxetaAlt = getImageAlt('trinxeta')

</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="filipersones_trinxeta_hero"
      image-route="animacions"
      :alt="trinxetaAlt"
    >
      <template #content>
        <div class="px-5 lg:px-0 font-grotesk uppercase text-white lg:max-w-[543px]">
          <h1 class="text-5xl md:text-6xl lg:text-7xl">
            {{ t('routes.trinxeta') }}
          </h1>
          <h2 class="text-4xl md:text-5xl lg:text-6xl">
            {{ t('filipersones.trinxeta.hero.subtitle') }}
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
          :image="getImageByRoute('filipersones', 'trinxeta_1')"
          content-type="shows"
          :alt="trinxetaAlt"
          show-full-content
        />
        <Synopsis
          :description="learningPath"
          :image="getImageByRoute('filipersones', 'trinxeta_2')"
          content-type="shows"
          :alt="trinxetaAlt"
          show-full-content
          isReversed
        />
        <Synopsis
          :description="background"
          :image="getImageByRoute('filipersones', 'trinxeta_3')"
          content-type="shows"
          alt="trinxetaAlt"
          show-full-content
        />
        <ClaimTitle
          class="mt-20"
          :claim="t('filipersones.trinxeta.claim')"
          :claim-title="t('filipersones.trinxeta.claimTitle')"
        />
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'circ-trinxeta')"
          content-type="shows"
          :alt="getImageAlt('circ-trinxeta')"
          show-full-content
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
      image-name="trinxeta_footer"
      image-route="filipersones"
      :alt="trinxetaAlt"
    />
  </div>
</template>