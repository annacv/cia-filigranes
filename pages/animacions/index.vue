<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('performances', title);

useHead({
  meta: [
    { name: 'description', content: t('performances.metaDescription') }
  ]
})

const abstract = getTranslatedList('performances.abstract', ['paragraph'])
const synopsis = getTranslatedList('performances.synopsis', ['paragraph'])
const techCard = getTranslatedList('performances.techCard', ['title', 'description'])
const artCard = getTranslatedList('performances.artCard', ['title', 'description'])

const synopsisButton = computed(() => {
  return {
    download: `CiaFiligranes-animacions-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-animacions-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="animacions_foc"
      image-route="animacions"
      :alt="getImageAlt('animacions')"
    >
      <template #content>
        <div class="px-5 lg:px-0 font-grotesk uppercase text-white lg:max-w-[543px]">
          <h1 class="text-4xl md:text-5xl lg:text-6xl">
            {{ t('performances.title') }}
          </h1>
          <h2 class="text-4xl md:text-5xl lg:text-6xl">
            {{ t('performances.subtitle') }}
          </h2>
        </div>
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <ClaimTitle
          :claim="t('performances.claim')"
          :claim-title="t('performances.claimTitle')"
        />
        <Synopsis
          :description="abstract"
          :image="getImageByRoute('animacions', 'cuiners')"
          content-type="performances"
          :alt="getImageAlt('animacions')"
          show-full-content
          :download-button="synopsisButton"
        />
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('animacions', 'forner')"
          content-type="performances"
          :alt="getImageAlt('animacions')"
          show-full-content
          is-reversed
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('animacions', 'torpede')"
          :alt="getImageAlt('animacions')"
          is-reversed
        />
        <HireFili
          class="py-12"
          :title="t('performances.hire.title')"
          description="performances.hire.description"
          text-color="text-white"
          bg-color="bg-tertiary-500"
        />
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
          <HighlightShows />
          <HighlightWorkshops />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="animacions_domador"
      image-route="animacions"
      content-type="performances"
      :alt="getImageAlt('animacions')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
