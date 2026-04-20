<script setup lang="ts">
import HeroCover from "~/components/cover/HeroCover.vue";
import { getImageByRoute } from "~/utils/image-by-route";
import { PERFORMANCES_GALLERY_IMG } from "~/constants";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('performances', title);

useHead({
  meta: [
    { name: 'description', content: t('performances.metaDescription') }
  ]
})

const { isMobile } = useResponsive()

const abstract = getTranslatedList('performances.abstract', ['paragraph'])
const synopsis = getTranslatedList('performances.synopsis', ['paragraph'])
const techCard = getTranslatedList('performances.techCard', ['title', 'description'])
const artCard = getTranslatedList('performances.artCard', ['title', 'description'])

const synopsisButton = computed(() => {
  return {
    download: `CiaFiligranes-animacions-${locale.value}.pdf`,
    href: `/downloads/dossiers/CiaFiligranes-animacions-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="animacions_foc_hero"
      image-route="animacions"
      :alt="getImageAlt('animacions')"
      is-section-cover
    >
      <template #content>
        <SectionCoverTitle
          :title="t('performances.hero.title')"
          title-class="max-w-[324px] md:max-w-[448px] lg:max-w-[510px]"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <ClaimTitle
          :claim="t('performances.claim')"
          :claim-title="t('performances.claimTitle')"
        />
        <Synopsis
          class="text-white"
          :description="abstract"
          :image="getImageByRoute('animacions', 'cuiners')"
          content-type="performances"
          :alt="getImageAlt('animacions')"
          show-full-content
          :download-button="synopsisButton"
        />
        <Synopsis
          class="text-white"
          :description="synopsis"
          :image="getImageByRoute('animacions', 'caixes')"
          content-type="performances"
          :alt="getImageAlt('animacions')"
          show-full-content
          :is-reversed="!isMobile"
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('animacions', 'torpede')"
          :alt="getImageAlt('animacions')"
          is-reversed
        />
        <div class="grid-layout bg-highlight-tertiary py-5 lg:py-12">
          <div class="layout-cols">
            <SlidingPanel>
              <MidCard
                content-type="performances"
                :title="t('performances.title')"
                :images="PERFORMANCES_GALLERY_IMG"
                :link="useLinkByRoute('animacions').value"
              />
            </SlidingPanel>
          </div>
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection
          :claim-title="t('hire.pageSectionTitleAlternative')"
          :claim-subtitle="t('hire.pageSectionSubtitlePerformances')"
          page-type="performances"
        />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="animacions_domador"
          image-route="animacions"
          content-type="performances"
          :alt="getImageAlt('animacions')"
        />
        <HireFiliBanner
          :title="t('performances.hire.title')"
          description="performances.hire.description"
          text-color="text-white"
          bg-color="bg-tertiary-500"
        />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
