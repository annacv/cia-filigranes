<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('workshops', title);

useHead({
  meta: [
    { name: 'description', content: t('workshops.bombolles-sabo.metaDescription') }
  ]
})

const abstract = getTranslatedList('workshops.bombolles-sabo.abstract', ['paragraph'])
const summaryItems = getTranslatedList('workshops.bombolles-sabo.list', ['title', 'description'])
const synopsis = getTranslatedList('workshops.bombolles-sabo.synopsis', ['paragraph'])
const techCard = getTranslatedList('workshops.bombolles-sabo.techCard', ['title', 'description'])
const artCard = getTranslatedList('workshops.bombolles-sabo.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-bombolles-sabo-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-bombolles-sabo-${locale.value}.pdf`,
  }
});

</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_bombolles-sabo-1"
      image-route="tallers"
      :alt="getImageAlt('bombolles-sabo')"
      content-type="workshops"
    >
      <template #content>
        <CoverTitle
          :title="t('workshops.commonTitle', { title: t('routes.bombolles-sabo') })"
          title-class="max-w-[372px] md:max-w-[452px] lg:max-w-[542px]"
          :slice-end="3"
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
          :image="getImageByRoute('tallers', 'bombolles-sabo-4')"
          content-type="workshops"
          :alt="getImageAlt('bombolles-sabo')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'bombolles-sabo-2')"
          :alt="getImageAlt('bombolles-sabo')"
          content-type="workshops"
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
          <HighlightWorkshops is-current-content :reorder-index="getItemIndex('tallers', 'bombolles-sabo')" />
          <HighlightShows :reorder-index="0" />
          <HighlightPerformances :reorder-index="0" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="tallers_bombolles-sabo-3"
      image-route="tallers"
      :alt="getImageAlt('bombolles-sabo')"
      content-type="workshops"
      background-position="center 0%"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
