<script setup lang="ts">
import { useShowAgenda } from "~/composables/calendar/use-event-calendar.composable"
import AgendaFilters from "~/components/agenda/CalendarFilters.vue"
import CalendarEventList from "~/components/agenda/CalendarEventList.vue"
import { YOUTUBE_VIDEO_IDS } from "~/constants"
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const {
  events,
  pending,
  error,
  hasScheduledContent,
  selectedLiveShowFilter,
  showOnlyOpenToPublic,
  liveShowFilterOptions,
  filteredEvents,
  hasActiveFilters,
} = useShowAgenda('freak-frac')
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
      image-name="espectacles_freak-frac-1"
      image-route="espectacles"
      :alt="getImageAlt('freak-frac')"
      schedule-content-key="freak-frac"
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
      <template #wrappedTop>
        <Summary
          :abstract="abstract"
          :items="summaryItems"
          :button="summaryButton"
        />
        <div id="video" class="scroll-mt-[72px] lg:scroll-mt-[87px] pt-2 pb-12 lg:pt-4 lg:pb-24">
          <YoutubePlayer :video-id="YOUTUBE_VIDEO_IDS.freakFrac" />
        </div>
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'freak-frac-3')"
          content-type="shows"
          :alt="getImageAlt('freak-frac')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'freak-frac-2')"
          :alt="getImageAlt('freak-frac')"
          background-position="center top"
          is-reversed
        />
        <HireFili
          class="py-12"
          :title="t('shows.hire.titleSingle')"
          description="shows.hire.description"
          text-color="text-white"
          bg-color="bg-primary-500"
        />
      </template>
      <template v-if="hasScheduledContent" #wrapped>
        <div id="agenda" class="scroll-mt-[72px] lg:scroll-mt-[87px]">
        <ClaimTitle
          :claim-title="t('shows.liveClaimTitle', { title: t('routes.freak-frac') })"
          is-section-title
        />
        <AgendaFilters
          v-model:selected-primary-filter="selectedLiveShowFilter"
          v-model:show-only-open-to-public="showOnlyOpenToPublic"
          :primary-filter-options="liveShowFilterOptions"
        />
        <CalendarEventList
          :events="filteredEvents"
          :pending="pending"
          :error="error"
          :total-events="events.length"
          selected-event-type="shows"
          :has-active-filters="hasActiveFilters"
          is-dedicated-list
          show-view-all-link
        />
        </div>
      </template>
      <template #unwrapped>
        <div class="flex flex-col mb-8 lg:mb-12 xl:mb-24 2xl:mb-32">
          <HighlightShows
            :claim-title="t('shows.otherShowsClaimTitle')"
            is-current-content
            :reorder-index="getItemIndex('espectacles', 'freak-frac')"
          />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="espectacles_freak-frac-4"
      image-route="espectacles"
      :alt="getImageAlt('freak-frac')"
      background-position="center center"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
