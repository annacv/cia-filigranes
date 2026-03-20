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
} = useShowAgenda('circ-filixic')
const getImageAlt = (title?: string) => useImageAlt('shows', title);

useHead({
  meta: [
    { name: 'description', content: t('shows.circ-filixic.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.circ-filixic.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.circ-filixic.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.circ-filixic.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.circ-filixic.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.circ-filixic.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-filixic-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-circ-filixic-${locale.value}.pdf`,
  }
});

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
        <CoverTitle
        :title="t('routes.circ-filixic')"
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
        <div class="mt-2 mb-12 lg:mt-4 lg:mb-24 bg-black xl:p-28">
          <YoutubePlayer video-id="rg3XzGQIPpU" />
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
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'circ-filixic-2')"
          :alt="getImageAlt('circ-filixic')"
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
            :reorder-index="getItemIndex('espectacles', 'circ-filixic')"
          />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="espectacles_circ-filixic-4"
      image-route="espectacles"
      :alt="getImageAlt('circ-filixic')"
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
