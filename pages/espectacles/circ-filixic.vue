<script setup lang="ts">
import BaseBrand from "~/components/cover/BaseBrand.vue"
import HeroCover from "~/components/cover/HeroCover.vue"
import { useShowAgenda } from "~/composables/calendar/use-event-calendar.composable"
import AgendaFilters from "~/components/agenda/CalendarFilters.vue"
import CalendarEventList from "~/components/agenda/CalendarEventList.vue"
import { YOUTUBE_VIDEO_IDS } from "~/constants"
import { getImageByRoute } from "~/utils/image-by-route"
import { getItemIndex } from "~/utils/get-item-index"

const { t, locale } = useI18n()
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
} = useShowAgenda("circ-filixic")
const getImageAlt = (title?: string) => useImageAlt("shows", title)

useHead({
  meta: [{ name: "description", content: t("shows.circ-filixic.metaDescription") }],
})

const abstract = getTranslatedList("shows.circ-filixic.abstract", ["paragraph"])
const summaryItems = getTranslatedList("shows.circ-filixic.list", ["title", "description"])
const synopsis = getTranslatedList("shows.circ-filixic.synopsis", ["paragraph"])
const techCard = getTranslatedList("shows.circ-filixic.techCard", ["title", "description"])
const artCard = getTranslatedList("shows.circ-filixic.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-filixic-${locale.value}.pdf`,
    href: `/downloads/dossiers/CiaFiligranes-circ-filixic-${locale.value}.pdf`,
  }
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_circ-filixic-1"
      image-route="espectacles"
      :alt="getImageAlt('circ-filixic')"
      schedule-content-key="circ-filixic"
    >
      <template #content>
        <BaseBrand slug="circ-filixic" :fallback-slice-end="2" />
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary :abstract="abstract" :items="summaryItems" />
        <div
          id="video"
          class="mt-2 mb-12 scroll-mt-[72px] lg:scroll-mt-[87px] lg:mt-4 lg:mb-24 bg-black xl:p-28"
        >
          <YoutubePlayer :video-id="YOUTUBE_VIDEO_IDS.circFilixic" />
        </div>
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'circ-filixic-3')"
          content-type="shows"
          :alt="getImageAlt('circ-filixic')"
          show-full-content
          should-clip
          :download-button="summaryButton"
          :hire-contract="{ kind: 'show', productKey: 'circ-filixic' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'circ-filixic-2')"
          :alt="getImageAlt('circ-filixic')"
          is-reversed
        />
        <HireFiliBanner
          :title="t('shows.hire.titleSingle')"
          description="shows.hire.description"
          text-color="text-white"
          bg-color="bg-primary-500"
        />
      </template>
      <template v-if="hasScheduledContent" #wrapped>
        <div id="agenda" class="scroll-mt-[72px] lg:scroll-mt-[87px]">
          <ClaimTitle
            :claim-title="t('shows.liveClaimTitle', { title: t('routes.circ-filixic') })"
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
            :reorder-index="getItemIndex('espectacles', 'circ-filixic')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="shows" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="espectacles_circ-filixic-4"
          image-route="espectacles"
          :alt="getImageAlt('circ-filixic')"
          background-position="center center"
        />
        <HireFiliBanner
          :title="t('shows.hire.title')"
          description="shows.hire.description"
          text-color="text-white"
          bg-color="bg-primary-500"
        />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
