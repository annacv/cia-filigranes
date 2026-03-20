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
        <YoutubePlayer
          class="pt-2 pb-12 lg:pt-4 lg:pb-24"
          video-id="dY4GelzNlRc"
        />
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
      <template #wrapped v-if="hasScheduledContent">
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
