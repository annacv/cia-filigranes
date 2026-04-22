<script setup lang="ts">
import { useWorkshopAgenda } from "~/composables/calendar/use-event-calendar.composable"
import { getImageByRoute } from "~/utils/image-by-route"
import { getItemIndex } from "~/utils/get-item-index"

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()
const {
  events,
  pending,
  error,
  hasScheduledContent,
  selectedWorkshopFilter,
  showOnlyOpenToPublic,
  workshopFilterOptions,
  filteredEvents,
  hasActiveFilters,
} = useWorkshopAgenda("circ")
const getImageAlt = (title?: string) => useImageAlt("workshops", title)

useHead({
  meta: [{ name: "description", content: t("workshops.circ.metaDescription") }],
})

const abstract = getTranslatedList("workshops.circ.abstract", ["paragraph"])
const summaryItems = getTranslatedList("workshops.circ.list", ["title", "description"])
const synopsis = getTranslatedList("workshops.circ.synopsis", ["paragraph"])
const techCard = getTranslatedList("workshops.circ.techCard", ["title", "description"])
const artCard = getTranslatedList("workshops.circ.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-circ-${locale.value}.pdf`,
    href: `/downloads/dossiers/CiaFiligranes-circ-${locale.value}.pdf`,
  }
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_circ-1"
      image-route="tallers"
      :alt="getImageAlt('circ')"
      content-type="workshops"
      schedule-content-key="circ"
    >
      <template #content>
        <CoverTitle
          :title="t('workshops.commonTitle', { title: t('routes.circ') })"
          title-class="lg:max-w-[448px]"
          :slice-end="1"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary :abstract="abstract" :items="summaryItems" />
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('tallers', 'circ-4')"
          content-type="workshops"
          :alt="getImageAlt('circ')"
          show-full-content
          should-clip
          :download-button="summaryButton"
          :hire-contract="{ kind: 'workshop', productKey: 'circ' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'circ-2')"
          :alt="getImageAlt('circ')"
          content-type="workshops"
          background-position="center bottom"
          is-reversed
        />
        <HireFiliBanner
          :title="t('workshops.hire.titleSingle')"
          description="workshops.hire.description"
          text-color="text-white"
          bg-color="bg-secondary-500"
        />
      </template>
      <template v-if="hasScheduledContent" #wrapped>
        <div id="agenda" class="scroll-mt-[72px] lg:scroll-mt-[87px]">
          <ClaimTitle
            :claim-title="
              t('workshops.liveClaimTitle', {
                title: t('workshops.commonTitle', { title: t('routes.circ') }),
              })
            "
            is-section-title
          />
          <CalendarFilters
            v-model:selected-primary-filter="selectedWorkshopFilter"
            v-model:show-only-open-to-public="showOnlyOpenToPublic"
            :primary-filter-options="workshopFilterOptions"
          />
          <CalendarEventList
            :events="filteredEvents"
            :pending="pending"
            :error="error"
            :total-events="events.length"
            selected-event-type="workshops"
            :has-active-filters="hasActiveFilters"
            is-dedicated-list
            show-view-all-link
          />
        </div>
      </template>
      <template #unwrapped>
        <div class="flex flex-col mb-8 lg:mb-12 xl:mb-24 2xl:mb-32">
          <HighlightWorkshops
            :claim-title="t('workshops.otherWorkshopsClaimTitle')"
            is-current-content
            :reorder-index="getItemIndex('tallers', 'circ')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="workshops" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="tallers_circ-3"
          image-route="tallers"
          :alt="getImageAlt('circ')"
          content-type="workshops"
        />
        <HireFiliBanner
          :title="t('workshops.hire.title')"
          description="workshops.hire.description"
          text-color="text-white"
          bg-color="bg-secondary-500"
        />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
