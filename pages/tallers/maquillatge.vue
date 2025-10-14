<script setup lang="ts">
import { useI18n } from "vue-i18n";
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
      image-name="tallers_maquillatge"
      image-route="tallers"
      :alt="getImageAlt('maquillatge')"
      content-type="workshops"
    >
      <template #content>
        <h1 class="px-5 lg:px-0 font-grotesk uppercase text-white text-5xl md:text-6xl lg:text-7xl">
          {{ t('workshops.commonTitle', { title: t('routes.maquillatge') }) }}
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
          :image="getImageByRoute('tallers', 'maquillatge')"
          content-type="workshops"
          :alt="getImageAlt('maquillatge')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'maquillatge')"
          :alt="getImageAlt('maquillatge')"
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
          <HighlightWorkshops is-current-content :reorder-index="getItemIndex('tallers', 'maquillatge')" />
          <HighlightShows :reorder-index="2" />
          <HighlightPerformances :reorder-index="2" />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="tallers_maquillatge"
      image-route="tallers"
      :alt="getImageAlt('maquillatge')"
      content-type="workshops"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
