<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('shows');

useHead({
  meta: [
    { name: 'description', content: t('shows.circ-filixic.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.circ-filixic.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.circ-filixic.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.circ-filixic.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.circ-filixic.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.circ-filixic.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-filixic-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-circ-filixic-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_circ-filixic"
      image-route="espectacles"
      :alt="getImageAlt('circ-filixic')"
      >
      <template #content>
        <h1 class="px-5 lg:px-0 font-grotesk uppercase text-white text-5xl md:text-6xl lg:text-7xl">
          {{ t('routes.circ-filixic') }}
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
        <div class="mt-2 mb-12 lg:mt-4 lg:mb-24 bg-primary-500 xl:p-28">
          <YoutubePlayer video-id="rg3XzGQIPpU" />
        </div>
      </template>
      <template #unwrapped>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'circ-filixic')"
          content-type="shows"
          :alt="getImageAlt('circ-filixic')"
          show-full-content
        />
        <DataSheet
          :techCard="techCard"
          :artCard="artCard"
          :image="getImageByRoute('espectacles', 'circ-filixic')"
          :alt="getImageAlt('circ-filixic')"
          isReversed
        />
        <HireFili
          class="py-12"
          :title="t('shows.hire.titleSingle')"
          description="shows.hire.description"
          textColor="text-white"
          bgColor="bg-primary-500"
        />
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
          <HighlightShows isCurrentContent :reorderIndex="getItemIndex('espectacles', 'circ-filixic')" />
          <HighlightWorkshops />
          <HighlightPerformances />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="espectacles_circ-filixic"
      image-route="espectacles"
      :alt="getImageAlt('circ-filixic')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
