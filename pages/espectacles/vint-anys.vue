<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { isMobile } = useResponsive()

useHead({
  meta: [
    { name: 'description', content: t('shows.vint-anys.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.vint-anys.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.vint-anys.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.vint-anys.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.vint-anys.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.vint-anys.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-vint-anys-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-vint-anys-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_vint-anys-4"
      image-route="espectacles"
      :alt="t('home.hero.alt')"
    >
      <template #content>
        <VintAnysBrand class="-scale-x-100 w-[310px] md:w-[348px] lg:w-[448px] xl:w-[548px] 2xl:w-[748px] md:mt-8 lg:mt-0"/>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrapped>
        <Summary
          :abstract="abstract"
          :items="summaryItems"
          :button="summaryButton"
        />
        <div class="pt-2 pb-12 lg:pt-4 lg:pb-24">
          <YoutubePlayer video-id="TBbBS05njec" />
        </div>
      </template>
      <template #unwrapped>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'vint-anys-1')"
          content-type="shows"
          :alt="t('home.hero.alt')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'vint-anys-2')"
          :alt="t('home.hero.alt')"
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
          <HighlightShows is-current-content :reorder-index="getItemIndex('espectacles', 'vint-anys')" />
          <HighlightWorkshops :reorder-index="0" />
          <HighlightPerformances :reorder-index="0" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="hero_footer"
      image-route=""
      :alt="t('home.hero.alt')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
