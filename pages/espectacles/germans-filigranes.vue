<script setup lang="ts">
import { useShowAgenda } from "~/composables/calendar/use-event-calendar.composable"
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
} = useShowAgenda("germans-filigranes")
const getImageAlt = (title?: string) => useImageAlt("shows", title)

useHead({
  meta: [{ name: "description", content: t("shows.germans-filigranes.metaDescription") }],
})

const abstract = getTranslatedList("shows.germans-filigranes.abstract", ["paragraph"])
const summaryItems = getTranslatedList("shows.germans-filigranes.list", ["title", "description"])
const synopsis = getTranslatedList("shows.germans-filigranes.synopsis", ["paragraph"]) as Record<
  string,
  PropertyKey
>[]
const techCard = getTranslatedList("shows.germans-filigranes.techCard", ["title", "description"])
const artCard = getTranslatedList("shows.germans-filigranes.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-germans-filigranes-${locale.value}.pdf`,
    href: `/downloads/dossiers/CiaFiligranes-germans-filigranes-${locale.value}.pdf`,
  }
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_germans-filigranes"
      image-route="espectacles"
      :alt="getImageAlt('germans-filigranes')"
      schedule-content-key="germans-filigranes"
      background-position="center top"
    >
      <template #content>
        <BaseBrand slug="germans-filigranes" />
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary :abstract="abstract" :items="summaryItems" />
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'germans-filigranes-1')"
          content-type="shows"
          :alt="getImageAlt('germans-filigranes')"
          show-full-content
          should-clip
          :download-button="summaryButton"
          :hire-contract="{ kind: 'show', productKey: 'germans-filigranes' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'germans-filigranes-4')"
          :alt="getImageAlt('germans-filigranes')"
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
            :claim-title="t('shows.liveClaimTitle', { title: t('routes.germans-filigranes') })"
            is-section-title
          />
          <CalendarFilters
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
            :reorder-index="getItemIndex('espectacles', 'germans-filigranes')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="shows" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="espectacles_germans-filigranes-2"
          image-route="espectacles"
          :alt="getImageAlt('germans-filigranes')"
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
