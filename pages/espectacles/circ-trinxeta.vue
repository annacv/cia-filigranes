<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('shows', title);

useHead({
  meta: [
    { name: 'description', content: t('shows.circ-trinxeta.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.circ-trinxeta.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.circ-trinxeta.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.circ-trinxeta.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.circ-trinxeta.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.circ-trinxeta.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-trinxeta-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-circ-trinxeta-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_circ-trinxeta_hero"
      image-route="espectacles"
      :alt="getImageAlt('circ-trinxeta')"
    >
      <template #content>
        <CoverTitle
          :title="t('routes.circ-trinxeta')"
          title-class="lg:max-w-[548px]"
          :slice-end="2"
        />
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
          :image="getImageByRoute('espectacles', 'circ-trinxeta-4')"
          content-type="shows"
          :alt="getImageAlt('circ-trinxeta')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'circ-trinxeta-2')"
          :alt="getImageAlt('circ-trinxeta')"
          is-reversed
        />
        <HireFili
          class="py-12"
          :title="t('shows.hire.titleSingle')"
          description="shows.hire.description"
          text-color="text-white"
          bg-color="bg-primary-500"
        />
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
          <HighlightShows is-current-content :reorder-index="getItemIndex('espectacles', 'circ-trinxeta')" />
          <HighlightWorkshops :reorder-index="4" />
          <HighlightPerformances :reorder-index="4" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="espectacles_circ-trinxeta-1"
      image-route="espectacles"
      :alt="getImageAlt('circ-trinxeta')"
      background-position="center 100%"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
