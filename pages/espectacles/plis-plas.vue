<script setup lang="ts">
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
} = useShowAgenda("plis-plas")
const getImageAlt = (title?: string) => useImageAlt("shows", title)

useHead({
  meta: [{ name: "description", content: t("shows.plis-plas.metaDescription") }],
})

const abstract = getTranslatedList("shows.plis-plas.abstract", ["paragraph"])
const summaryItems = getTranslatedList("shows.plis-plas.list", ["title", "description"])
const synopsis = getTranslatedList("shows.plis-plas.synopsis", ["paragraph"])
const techCard = getTranslatedList("shows.plis-plas.techCard", ["title", "description"])
const artCard = getTranslatedList("shows.plis-plas.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-plis-plas-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-plis-plas-${locale.value}.pdf`,
  }
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_plis-plas-1"
      image-route="espectacles"
      :alt="getImageAlt('plis-plas')"
      schedule-content-key="plis-plas"
    >
      <template #content>
        <CoverTitle :title="t('routes.plis-plas')" :slice-end="1" />
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary :abstract="abstract" :items="summaryItems" />
        <div id="video" class="scroll-mt-[72px] lg:scroll-mt-[87px] pt-2 pb-12 lg:pt-4 lg:pb-24">
          <YoutubePlayer :video-id="YOUTUBE_VIDEO_IDS.plisPlas" />
        </div>
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'plis-plas-3')"
          content-type="shows"
          :alt="getImageAlt('plis-plas')"
          show-full-content
          should-clip
          :download-button="summaryButton"
          :hire-contract="{ kind: 'show', productKey: 'plis-plas' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'plis-plas-4')"
          :alt="getImageAlt('plis-plas')"
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
            :claim-title="t('shows.liveClaimTitle', { title: t('routes.plis-plas') })"
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
            :reorder-index="getItemIndex('espectacles', 'plis-plas')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="shows" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="espectacles_plis-plas-2"
          image-route="espectacles"
          :alt="getImageAlt('plis-plas')"
          background-position="center 30%"
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
