<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('workshops');

useHead({
  meta: [
    { name: 'description', content: t('workshops.circ.metaDescription') }
  ]
})

const abstract = getTranslatedList('workshops.circ.abstract', ['paragraph'])
const summaryItems = getTranslatedList('workshops.circ.list', ['title', 'description'])
const synopsis = getTranslatedList('workshops.circ.synopsis', ['paragraph'])
const techCard = getTranslatedList('workshops.circ.techCard', ['title', 'description'])
const artCard = getTranslatedList('workshops.circ.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-circ-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_circ"
      image-route="tallers"
      :alt="getImageAlt('circ')"
      content-type="workshops"
      >
      <template #content>
        <h1 class="px-5 lg:px-0 font-grotesk uppercase text-white text-5xl md:text-6xl lg:text-7xl">
          {{ t('workshops.commonTitle', { title: t('routes.circ') }) }}
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
          :image="getImageByRoute('tallers', 'circ')"
          content-type="workshops"
          :alt="getImageAlt('circ')"
          show-full-content
        />
        <DataSheet
          :techCard="techCard"
          :artCard="artCard"
          :image="getImageByRoute('tallers', 'circ')"
          :alt="getImageAlt('circ')"
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
          <HighlightWorkshops isCurrentContent :reorderIndex="getItemIndex('tallers', 'circ')" />
          <HighlightShows />
          <HighlightPerformances />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="tallers_circ"
      image-route="tallers"
      :alt="getImageAlt('circ')"
      contentType="workshops"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
