<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('workshops');

useHead({
  meta: [
    { name: 'description', content: t('workshops.enginys-aigua.metaDescription') }
  ]
})

const abstract = getTranslatedList('workshops.enginys-aigua.abstract', ['paragraph'])
const summaryItems = getTranslatedList('workshops.enginys-aigua.list', ['title', 'description'])
const synopsis = getTranslatedList('workshops.enginys-aigua.synopsis', ['paragraph'])
const techCard = getTranslatedList('workshops.enginys-aigua.techCard', ['title', 'description'])
const artCard = getTranslatedList('workshops.enginys-aigua.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-enginys-aigua-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-enginys-aigua-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_enginys-aigua"
      image-route="tallers"
      :alt="getImageAlt('enginys-aigua')"
      content-type="workshops"
    >
      <template #content>
        <h1 class="px-5 lg:px-0 font-grotesk uppercase text-white text-5xl md:text-6xl lg:text-7xl">
          {{ t('workshops.commonTitle', { title: t('routes.enginys-aigua') }) }}
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
          :image="getImageByRoute('tallers', 'enginys-aigua')"
          content-type="workshops"
          :alt="getImageAlt('enginys-aigua')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'enginys-aigua')"
          :alt="getImageAlt('enginys-aigua')"
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
          <HighlightWorkshops is-current-content :reorder-index="getItemIndex('tallers', 'enginys-aigua')" />
          <HighlightShows :reorder-index="3" />
          <HighlightPerformances :reorder-index="3" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="tallers_enginys-aigua"
      image-route="tallers"
      :alt="getImageAlt('enginys-aigua')"
      content-type="workshops"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
