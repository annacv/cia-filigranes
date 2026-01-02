<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('workshops', title);

useHead({
  meta: [
    { name: 'description', content: t('workshops.maquillatge.metaDescription') }
  ]
})

const abstract = getTranslatedList('workshops.maquillatge.abstract', ['paragraph'])
const summaryItems = getTranslatedList('workshops.maquillatge.list', ['title', 'description'])
const synopsis = getTranslatedList('workshops.maquillatge.synopsis', ['paragraph'])
const techCard = getTranslatedList('workshops.maquillatge.techCard', ['title', 'description'])
const artCard = getTranslatedList('workshops.maquillatge.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-maquillatge-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-maquillatge-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_maquillatge-1"
      image-route="tallers"
      :alt="getImageAlt('maquillatge')"
      content-type="workshops"
      background-position="center 40%"
    >
      <template #content>
        <CoverTitle
          :title="t('workshops.commonTitle', { title: t('routes.maquillatge') })"
          title-class="max-w-[406px] md:max-w-[524px] lg:max-w-[648px]"
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
          :image="getImageByRoute('tallers', 'maquillatge-4')"
          content-type="workshops"
          :alt="getImageAlt('maquillatge')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'maquillatge-2')"
          :alt="getImageAlt('maquillatge')"
          content-type="workshops"
          background-position="center 30%"
          is-reversed
        />
        <HireFili
          class="py-12"
          :title="t('workshops.hire.titleSingle')"
          description="workshops.hire.description"
          text-color="text-white"
          bg-color="bg-secondary-500"
        />
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
          <HighlightWorkshops is-current-content :reorder-index="getItemIndex('tallers', 'maquillatge')" />
          <HighlightShows :reorder-index="2" />
          <HighlightPerformances :reorder-index="2" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="tallers_maquillatge-3"
      image-route="tallers"
      :alt="getImageAlt('maquillatge')"
      content-type="workshops"
      background-position="center 35%"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
