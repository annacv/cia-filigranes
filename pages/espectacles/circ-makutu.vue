<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('shows');

useHead({
  meta: [
    { name: 'description', content: t('shows.circ-makutu.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.circ-makutu.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.circ-makutu.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.circ-makutu.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.circ-makutu.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.circ-makutu.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-makutu-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-circ-makutu-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_circ-makutu"
      image-route="espectacles"
      :alt="getImageAlt('circ-makutu')"
      >
      <template #content>
        <h1 class="px-5 lg:px-0 font-grotesk uppercase text-white text-5xl md:text-6xl lg:text-7xl">
          {{ t('routes.circ-makutu') }}
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
          :image="getImageByRoute('espectacles', 'circ-makutu')"
          content-type="shows"
          :alt="getImageAlt('circ-makutu')"
          show-full-content
          should-clip
        />
        <DataSheet
          :techCard="techCard"
          :artCard="artCard"
          :image="getImageByRoute('espectacles', 'circ-makutu')"
          :alt="getImageAlt('circ-makutu')"
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
          <HighlightShows isCurrentContent :reorderIndex="getItemIndex('espectacles', 'circ-makutu')" />
          <HighlightWorkshops :reorder-index="3" />
          <HighlightPerformances :reorder-index="3" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="espectacles_circ-makutu"
      image-route="espectacles"
      :alt="getImageAlt('circ-makutu')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
