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
} = useWorkshopAgenda("enginys-aigua")
const getImageAlt = (title?: string) => useImageAlt("workshops", title)

useHead({
  meta: [{ name: "description", content: t("workshops.enginys-aigua.metaDescription") }],
})

const abstract = getTranslatedList("workshops.enginys-aigua.abstract", ["paragraph"])
const summaryItems = getTranslatedList("workshops.enginys-aigua.list", ["title", "description"])
const synopsis = getTranslatedList("workshops.enginys-aigua.synopsis", ["paragraph"])
const techCard = getTranslatedList("workshops.enginys-aigua.techCard", ["title", "description"])
const artCard = getTranslatedList("workshops.enginys-aigua.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-enginys-aigua-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-enginys-aigua-${locale.value}.pdf`,
  }
})

const titleByLang = computed(() => {
  const title = t("workshops.commonTitle", { title: t("routes.enginys-aigua") })
  if (locale.value === "ca") {
    return title.replace("de ", "d'")
  }
  return title
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_enginys-aigua-1"
      image-route="tallers"
      :alt="getImageAlt('enginys-aigua')"
      content-type="workshops"
      schedule-content-key="enginys-aigua"
    >
      <template #content>
        <CoverTitle
          :title="titleByLang"
          title-class="max-w-[332px] md:max-w-[408px] lg:max-w-[488px]"
          :slice-end="2"
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
          :image="getImageByRoute('tallers', 'enginys-aigua-3')"
          content-type="workshops"
          :alt="getImageAlt('enginys-aigua')"
          show-full-content
          should-clip
          :hire-contract="{ kind: 'workshop', productKey: 'enginys-aigua' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'enginys-aigua-2')"
          :alt="getImageAlt('enginys-aigua')"
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
            :claim-title="t('workshops.liveClaimTitle', { title: titleByLang })"
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
            :reorder-index="getItemIndex('tallers', 'enginys-aigua')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="workshops" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="tallers_enginys-aigua-4"
          image-route="tallers"
          :alt="getImageAlt('enginys-aigua')"
          content-type="workshops"
          background-position="center bottom"
        />
        <HireFili :title="t('home.hire.title')" description="home.hire.description" />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
