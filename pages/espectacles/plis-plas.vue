<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('shows');

useHead({
  meta: [
    { name: 'description', content: t('shows.plis-plas.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.plis-plas.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.plis-plas.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.plis-plas.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.plis-plas.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.plis-plas.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-plis-plas-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-plis-plas-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_plis-plas"
      image-route="espectacles"
      :alt="getImageAlt('plis-plas')"
      >
      <template #content>
        <h1 class="px-5 lg:px-0 font-grotesk uppercase text-right text-white text-5xl md:text-6xl lg:text-8xl">
          {{ t('routes.plis-plas') }}
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
        <YoutubePlayer
          class="pt-2 pb-12 lg:pt-4 lg:pb-24"
          video-id="VOcQTqZ9C2A"
        />
      </template>
      <template #unwrapped>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'plis-plas')"
          content-type="shows"
          :alt="getImageAlt('plis-plas')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'plis-plas')"
          :alt="getImageAlt('plis-plas')"
          is-reversed
        />
        <HireFili
          class="py-12"
          :title="t('shows.hire.titleSingle')"
          description="shows.hire.description"
          text-color="text-white"
          bg-color="bg-primary-500"
          should-clip
        />
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
          <HighlightShows is-current-content :reorder-index="getItemIndex('espectacles', 'plis-plas')" />
          <HighlightWorkshops :reorder-index="1" />
          <HighlightPerformances :reorder-index="1" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="espectacles_plis-plas"
      image-route="espectacles"
      :alt="getImageAlt('plis-plas')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
