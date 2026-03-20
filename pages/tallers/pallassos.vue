<script setup lang="ts">
import { useWorkshopAgenda } from "~/composables/calendar/use-event-agenda.composable"
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
  selectedWorkshopFilter,
  showOnlyOpenToPublic,
  workshopFilterOptions,
  filteredEvents,
  hasActiveFilters,
} = useWorkshopAgenda('pallassos')
const getImageAlt = (title?: string) => useImageAlt('workshops', title);

useHead({
  meta: [
    { name: 'description', content: t('workshops.pallassos.metaDescription') }
  ]
})

const abstract = getTranslatedList('workshops.pallassos.abstract', ['paragraph'])
const summaryItems = getTranslatedList('workshops.pallassos.list', ['title', 'description'])
const synopsis = getTranslatedList('workshops.pallassos.synopsis', ['paragraph'])
const techCard = getTranslatedList('workshops.pallassos.techCard', ['title', 'description'])
const artCard = getTranslatedList('workshops.pallassos.artCard', ['title', 'description'])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-pallassos-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-pallassos-${locale.value}.pdf`,
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_pallassos-1"
      image-route="tallers"
      :alt="getImageAlt('pallassos')"
      content-type="workshops"
      schedule-content-key="pallassos"
    >
      <template #content>
        <CoverTitle
          :title="t('workshops.commonTitle', { title: t('routes.pallassos') })"
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
          :image="getImageByRoute('tallers', 'pallassos-4')"
          content-type="workshops"
          :alt="getImageAlt('pallassos')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'pallassos-2')"
          :alt="getImageAlt('pallassos')"
          content-type="workshops"
          background-position="center 10%"
          is-reversed
        />
        <HireFili
          class="py-12"
          :title="t('workshops.hire.titleSingle')"
          description="workshops.hire.description"
          text-color="text-white"
          bg-color="bg-secondary-500"
        />
      </template>
      <template #wrapped v-if="hasScheduledContent">
        <ClaimTitle
          :claim-title="t('workshops.liveClaimTitle', { title: t('workshops.commonTitle', { title: t('routes.pallassos') }) })"
          is-section-title
        />
        <AgendaFilters
          v-model:selected-primary-filter="selectedWorkshopFilter"
          v-model:show-only-open-to-public="showOnlyOpenToPublic"
          :primary-filter-options="workshopFilterOptions"
        />
        <CalendarEventList
          :events="filteredEvents"
          :pending="pending"
          :error="error"
          selected-event-type="workshops"
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
          <HighlightWorkshops
            :claim-title="t('workshops.otherWorkshopsClaimTitle')"
            is-current-content
            :reorder-index="getItemIndex('tallers', 'pallassos')"
          />
        </div>
      </template>
    </MainContent>
    <HeroFooter
      image-name="tallers_pallassos-3"
      image-route="tallers"
      :alt="getImageAlt('pallassos')"
      content-type="workshops"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
