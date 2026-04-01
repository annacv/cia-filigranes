<script setup lang="ts">
import { useWorkshopAgenda } from "~/composables/calendar/use-event-calendar.composable"
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
  selectedWorkshopFilter,
  showOnlyOpenToPublic,
  workshopFilterOptions,
  filteredEvents,
  hasActiveFilters,
} = useWorkshopAgenda("bombolles-sabo")
const getImageAlt = (title?: string) => useImageAlt("workshops", title)

useHead({
  meta: [{ name: "description", content: t("workshops.bombolles-sabo.metaDescription") }],
})

const abstract = getTranslatedList("workshops.bombolles-sabo.abstract", ["paragraph"])
const summaryItems = getTranslatedList("workshops.bombolles-sabo.list", ["title", "description"])
const synopsis = getTranslatedList("workshops.bombolles-sabo.synopsis", ["paragraph"])
const techCard = getTranslatedList("workshops.bombolles-sabo.techCard", ["title", "description"])
const artCard = getTranslatedList("workshops.bombolles-sabo.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-bombolles-sabo-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-bombolles-sabo-${locale.value}.pdf`,
  }
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_bombolles-sabo-1"
      image-route="tallers"
      :alt="getImageAlt('bombolles-sabo')"
      content-type="workshops"
      schedule-content-key="bombolles-sabo"
    >
      <template #content>
        <CoverTitle
          :title="t('workshops.commonTitle', { title: t('routes.bombolles-sabo') })"
          title-class="max-w-[372px] md:max-w-[452px] lg:max-w-[542px]"
          :slice-end="3"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary :abstract="abstract" :items="summaryItems" :button="summaryButton" />
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('tallers', 'bombolles-sabo-4')"
          content-type="workshops"
          :alt="getImageAlt('bombolles-sabo')"
          show-full-content
          should-clip
          :hire-contract="{ kind: 'workshop', productKey: 'bombolles-sabo' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'bombolles-sabo-2')"
          :alt="getImageAlt('bombolles-sabo')"
          content-type="workshops"
          is-reversed
        />
        <HireFili
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
                title: t('workshops.commonTitle', { title: t('routes.bombolles-sabo') }),
              })
            "
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
            :reorder-index="getItemIndex('tallers', 'bombolles-sabo')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="workshops" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="tallers_bombolles-sabo-3"
          image-route="tallers"
          :alt="getImageAlt('bombolles-sabo')"
          content-type="workshops"
          background-position="center 0%"
        />
        <HireFili :title="t('home.hire.title')" description="home.hire.description" />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
