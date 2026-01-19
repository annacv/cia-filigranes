<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()

useHead({
  meta: [
    { name: 'description', content: t('home.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.vint-anys.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.vint-anys.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.vint-anys.synopsis', ['paragraph'])
</script>

<template>
  <div class="h-full">
    <HeroCover image-name="hero_cover" image-route="" :alt="t('home.hero.alt')">
      <template #content>
        <h1>
          <span class="sr-only">{{ t('routes.vint-anys') }}</span>
          <VintAnysBrand
            class="w-[310px] md:w-[348px] lg:w-[448px] xl:w-[548px] 2xl:w-[748px] md:mt-8 lg:mt-0"
          />
        </h1>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrapped>
        <Summary
          :abstract="abstract"
          :items="summaryItems"
        />
      </template>
      <template #unwrapped>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'vint-anys-5')"
          content-type="shows"
          :alt="t('home.hero.alt')"
          :info-button="{
            href: '/espectacles/vint-anys'
          }"
          :download-button="{
            download: `CiaFiligranes-vint-anys-${locale}.pdf`,
            href: `/downloads/CiaFiligranes-vint-anys-${locale}.pdf`,
          }"
        />
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
          <HighlightShows :reorder-index="getItemIndex('espectacles', 'vint-anys')" />
          <HighlightWorkshops />
          <HighlightPerformances />
        </div>
        <HeroFooter
          :alt="t('home.hero.alt')"
          image-name="hero_footer"
          image-route=""
          background-position="center 30%"
        />
        <HireFili
          :title="t('home.hire.title')"
          description="home.hire.description"
        />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
