<script setup lang="ts">
import { useShowAgenda } from "~/composables/calendar/use-event-calendar.composable"
import AgendaFilters from "~/components/agenda/AgendaFilters.vue"
import CalendarEventList from "~/components/agenda/CalendarEventList.vue"
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
} = useShowAgenda('circ-trinxeta')
const getImageAlt = (title?: string) => useImageAlt('shows', title);

useHead({
  meta: [
    { name: 'description', content: t('shows.circ-trinxeta.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.circ-trinxeta.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.circ-trinxeta.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.circ-trinxeta.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.circ-trinxeta.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.circ-trinxeta.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-trinxeta-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-circ-trinxeta-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_circ-trinxeta_hero"
      image-route="espectacles"
      :alt="getImageAlt('circ-trinxeta')"
      schedule-content-key="circ-trinxeta"
    >
      <template #content>
        <CoverTitle
          :title="t('routes.circ-trinxeta')"
          title-class="lg:max-w-[548px]"
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
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'circ-trinxeta-4')"
          content-type="shows"
          :alt="getImageAlt('circ-trinxeta')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'circ-trinxeta-2')"
          :alt="getImageAlt('circ-trinxeta')"
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
        <ClaimTitle
          :claim-title="t('shows.liveClaimTitle', { title: t('routes.circ-trinxeta') })"
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
      </template>
      <template #unwrapped>
        <div class="flex flex-col mb-8 lg:mb-12 xl:mb-24 2xl:mb-32">
          <HighlightShows
            :claim-title="t('shows.otherShowsClaimTitle')"
            is-current-content
            :reorder-index="getItemIndex('espectacles', 'circ-trinxeta')"
          />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="espectacles_circ-trinxeta-1"
      image-route="espectacles"
      :alt="getImageAlt('circ-trinxeta')"
      background-position="center 100%"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
