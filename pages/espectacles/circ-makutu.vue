<script setup lang="ts">
import BaseBrand from "~/components/cover/BaseBrand.vue"
import HeroCover from "~/components/cover/HeroCover.vue"
import { useShowAgenda } from "~/composables/calendar/use-event-calendar.composable"
import AgendaFilters from "~/components/agenda/CalendarFilters.vue"
import CalendarEventList from "~/components/agenda/CalendarEventList.vue"
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
} = useShowAgenda("circ-makutu")
const getImageAlt = (title?: string) => useImageAlt("shows", title)

useHead({
  meta: [{ name: "description", content: t("shows.circ-makutu.metaDescription") }],
})

const abstract = getTranslatedList("shows.circ-makutu.abstract", ["paragraph"])
const summaryItems = getTranslatedList("shows.circ-makutu.list", ["title", "description"])
const synopsis = getTranslatedList("shows.circ-makutu.synopsis", ["paragraph"]) as Record<
  string,
  PropertyKey
>[]
const techCard = getTranslatedList("shows.circ-makutu.techCard", ["title", "description"])
const artCard = getTranslatedList("shows.circ-makutu.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-makutu-${locale.value}.pdf`,
    href: `/downloads/dossiers/CiaFiligranes-circ-makutu-${locale.value}.pdf`,
  }
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_circ-makutu_hero"
      image-route="espectacles"
      :alt="getImageAlt('circ-makutu')"
      schedule-content-key="circ-makutu"
      background-position="center 90%"
    >
      <template #content>
        <BaseBrand slug="circ-makutu" />
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary :abstract="abstract" :items="summaryItems" />
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'circ-makutu-1')"
          content-type="shows"
          :alt="getImageAlt('circ-makutu')"
          show-full-content
          should-clip
          :download-button="summaryButton"
          :hire-contract="{ kind: 'show', productKey: 'circ-makutu' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'circ-makutu-4')"
          :alt="getImageAlt('circ-makutu')"
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
            :claim-title="t('shows.liveClaimTitle', { title: t('routes.circ-makutu') })"
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
            :reorder-index="getItemIndex('espectacles', 'circ-makutu')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="shows" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="espectacles_circ-makutu-2"
          image-route="espectacles"
          :alt="getImageAlt('circ-makutu')"
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
