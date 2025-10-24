<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";

const { t } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('filipersones', title);

useHead({
  meta: [
    { name: 'description', content: t('filipersones.trinxeta.metaDescription') }
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
        <div class="p-5 font-grotesk uppercase text-white lg:max-w-[543px]">
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
          is-reversed
        />
        <Synopsis
          :description="background"
          :image="getImageByRoute('filipersones', 'trinxeta_3')"
          content-type="shows"
          :alt="trinxetaAlt"
          show-full-content
          should-clip
        />
        <ClaimTitle
          :claim="t('filipersones.trinxeta.claim')"
          :claim-title="t('filipersones.trinxeta.claimTitle')"
        />
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'circ-trinxeta')"
          content-type="shows"
          :alt="getImageAlt('circ-trinxeta')"
          :info-button="{
            href: '/espectacles/circ-trinxeta',
            class: 'button-outline-primary'
          }"
          is-reversed
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
      image-name="trinxeta_footer"
      image-route="filipersones"
      :alt="trinxetaAlt"
    />
  </div>
</template>