<script setup lang="ts">
import { useShowAgenda } from "~/composables/calendar/use-event-calendar.composable"
import AgendaFilters from "~/components/agenda/CalendarFilters.vue"
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
} = useShowAgenda('vint-anys')
const getImageAlt = (title?: string) => useImageAlt('shows', title);

useHead({
  meta: [
    { name: 'description', content: t('shows.vint-anys.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.vint-anys.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.vint-anys.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.vint-anys.synopsis', ['paragraph'])
const techCard = getTranslatedList('shows.vint-anys.techCard', ['title', 'description'])
const artCard = getTranslatedList('shows.vint-anys.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-vint-anys-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-vint-anys-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_vint-anys-4"
      image-route="espectacles"
      :alt="getImageAlt('vint-anys')"
      schedule-content-key="vint-anys"
    >
      <template #content>
        <VintAnysBrand class="-scale-x-100 w-[310px] md:w-[348px] lg:w-[448px] xl:w-[548px] 2xl:w-[748px] md:mt-8 lg:mt-0"/>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary
          :abstract="abstract"
          :items="summaryItems"
          :button="summaryButton"
        />
        <div id="video" class="pt-2 pb-12 lg:pt-4 lg:pb-24">
          <YoutubePlayer video-id="TBbBS05njec" />
        </div>
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'vint-anys-1')"
          content-type="shows"
          :alt="getImageAlt('vint-anys')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('espectacles', 'vint-anys-2')"
          :alt="getImageAlt('vint-anys')"
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
          :claim-title="t('shows.liveClaimTitle', { title: t('routes.vint-anys') })"
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
            :reorder-index="getItemIndex('espectacles', 'vint-anys')"
          />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="hero_footer"
      image-route=""
      :alt="getImageAlt('vint-anys')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
