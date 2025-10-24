<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('shows', title);

useHead({
  meta: [
    { name: 'description', content: t('shows.freak-frac.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.freak-frac.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.freak-frac.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.freak-frac.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.freak-frac.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.freak-frac.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-freak-frac-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-freak-frac-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_freak-frac"
      image-route="espectacles"
      :alt="getImageAlt('freak-frac')"
    >
    <template #content>
      <CoverTitle
        :title="t('routes.freak-frac')"
        title-class="md:max-w-[466px] lg:max-w-[560px]"
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
        <YoutubePlayer
          class="pt-2 pb-12 lg:pt-4 lg:pb-24"
          video-id="dY4GelzNlRc"
        />
      </template>
      <template #unwrapped>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'freak-frac')"
          content-type="shows"
          :alt="getImageAlt('freak-frac')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'freak-frac')"
          :alt="getImageAlt('freak-frac')"
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
          <HighlightShows is-current-content :reorder-index="getItemIndex('espectacles', 'freak-frac')" />
          <HighlightWorkshops :reorder-index="5" />
          <HighlightPerformances />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="espectacles_freak-frac"
      image-route="espectacles"
      :alt="getImageAlt('freak-frac')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
