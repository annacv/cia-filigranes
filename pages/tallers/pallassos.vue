<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('workshops');

useHead({
  meta: [
    { name: 'description', content: t('workshops.pallassos.metaDescription') }
  ]
})

const abstract = getTranslatedList('workshops.pallassos.abstract', ['paragraph'])
const summaryItems = getTranslatedList('workshops.pallassos.list', ['title', 'description'])
const synopsis = getTranslatedList('workshops.pallassos.synopsis', ['paragraph'])
const techCard = getTranslatedList('workshops.pallassos.techCard', ['title', 'description'])
const artCard = getTranslatedList('workshops.pallassos.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-pallassos-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-pallassos-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_pallassos"
      image-route="tallers"
      :alt="getImageAlt('pallassos')"
      content-type="workshops"
      >
      <template #content>
        <h1 class="px-5 lg:px-0 font-grotesk uppercase text-white text-5xl md:text-6xl lg:text-7xl">
          {{ t('workshops.commonTitle', { title: t('routes.pallassos') }) }}
        </h1>
      </template>
      </HeroCover>
    <MainContent>
      <template #wrapped>
        <Summary
          :abstract="abstract"
          :items="summaryItems"
          :button="summaryButton"
        />
      </template>
      <template #unwrapped>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('tallers', 'pallassos')"
          content-type="workshops"
          :alt="getImageAlt('pallassos')"
          show-full-content
        />
        <DataSheet
          :techCard="techCard"
          :artCard="artCard"
          :image="getImageByRoute('tallers', 'pallassos')"
          :alt="getImageAlt('pallassos')"
          contentType="workshops"
          isReversed
        />
        <HireFili
          class="py-12"
          :title="t('workshops.hire.titleSingle')"
          description="workshops.hire.description"
          textColor="text-white"
          bgColor="bg-secondary-500"
        />
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
          <HighlightWorkshops isCurrentContent :reorderIndex="getItemIndex('tallers', 'pallassos')" />
          <HighlightShows :reorder-index="1" />
          <HighlightPerformances :reorder-index="1" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="tallers_pallassos"
      image-route="tallers"
      :alt="getImageAlt('pallassos')"
      contentType="workshops"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
