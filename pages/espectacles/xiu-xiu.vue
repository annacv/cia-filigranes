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
} = useShowAgenda("xiu-xiu")
const getImageAlt = (title?: string) => useImageAlt("shows", title)

useHead({
  meta: [{ name: "description", content: t("shows.xiu-xiu.metaDescription") }],
})

const abstract = getTranslatedList("shows.xiu-xiu.abstract", ["paragraph"])
const summaryItems = getTranslatedList("shows.xiu-xiu.list", ["title", "description"])
const synopsis = getTranslatedList("shows.xiu-xiu.synopsis", ["paragraph"]) as Record<
  string,
  PropertyKey
>[]
const techCard = getTranslatedList("shows.xiu-xiu.techCard", ["title", "description"])
const artCard = getTranslatedList("shows.xiu-xiu.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-xiu-xiu-${locale.value}.pdf`,
    href: `/downloads/dossiers/CiaFiligranes-xiu-xiu-${locale.value}.pdf`,
  }
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_xiu-xiu-1"
      image-route="espectacles"
      :alt="getImageAlt('xiu-xiu')"
      schedule-content-key="xiu-xiu"
    >
      <template #content>
        <BaseBrand slug="xiu-xiu" />
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary :abstract="abstract" :items="summaryItems" />
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'xiu-xiu-3')"
          content-type="shows"
          :alt="getImageAlt('xiu-xiu')"
          show-full-content
          should-clip
          :download-button="summaryButton"
          :hire-contract="{ kind: 'show', productKey: 'xiu-xiu' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'xiu-xiu-4')"
          :alt="getImageAlt('xiu-xiu')"
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
            :claim-title="t('shows.liveClaimTitle', { title: t('routes.xiu-xiu') })"
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
            :reorder-index="getItemIndex('espectacles', 'xiu-xiu')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="shows" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="espectacles_xiu-xiu-2"
          image-route="espectacles"
          :alt="getImageAlt('xiu-xiu')"
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
