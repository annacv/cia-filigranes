<script setup lang="ts">
import { useShowAgenda } from "~/composables/calendar/use-event-agenda.composable"
import AgendaFilters from "~/components/agenda/AgendaFilters.vue"
import CalendarEventList from "~/components/agenda/CalendarEventList.vue"
import ArrowRight from "~/assets/icons/arrow-right.svg"
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const {
  events,
  pending,
  error,
  hasScheduledContent,
  maxVisibleEvents,
  selectedLiveShowFilter,
  showOnlyOpenToPublic,
  liveShowFilterOptions,
  filteredEvents,
  hasActiveFilters,
} = useShowAgenda('circ-makutu')
const getImageAlt = (title?: string) => useImageAlt('shows', title);

useHead({
  meta: [
    { name: 'description', content: t('shows.circ-makutu.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.circ-makutu.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.circ-makutu.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.circ-makutu.synopsis', ['paragraph']) as Record<string, PropertyKey>[]
const techCard = getTranslatedList('shows.circ-makutu.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.circ-makutu.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-makutu-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-circ-makutu-${locale.value}.pdf`,
  }
});
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
        <CoverTitle
          :title="t('routes.circ-makutu')"
          title-class="max-w-[282px] md:max-w-[340px] lg:max-w-[408px]"
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
          :image="getImageByRoute('espectacles', 'circ-makutu-1')"
          content-type="shows"
          :alt="getImageAlt('circ-makutu')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'circ-makutu-4')"
          :alt="getImageAlt('circ-makutu')"
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
      <template #wrapped v-if="hasScheduledContent">
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
          selected-event-type="shows"
          :has-active-filters="hasActiveFilters"
          is-dedicated-list
        />
        <FiliButton
          v-if="events.length > 0 && events.length > maxVisibleEvents"
          class="mt-1"
          button-class="button-link-neutral justify-self-end"
          :text="t('agenda.viewAllEvents')"
          href="/agenda"
          target="_top"
        >
          <template #text>
            {{ t('agenda.viewAllEvents') }}
          </template>
          <template #icon-right>
            <ArrowRight class="arrow-right !mt-0"/>
          </template>
        </FiliButton>
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
    </MainContent>
    <HeroFooter
      image-name="espectacles_circ-makutu-2"
      image-route="espectacles"
      :alt="getImageAlt('circ-makutu')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
