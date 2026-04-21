<script setup lang="ts">
import CoverTitle from "~/components/cover/CoverTitle.vue"
import HeroCover from "~/components/cover/HeroCover.vue"
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
} = useWorkshopAgenda("maquillatge")
const getImageAlt = (title?: string) => useImageAlt("workshops", title)
const { isMobile } = useResponsive()

useHead({
  meta: [{ name: "description", content: t("workshops.maquillatge.metaDescription") }],
})

const abstract = getTranslatedList("workshops.maquillatge.abstract", ["paragraph"])
const summaryItems = getTranslatedList("workshops.maquillatge.list", ["title", "description"])
const synopsis = getTranslatedList("workshops.maquillatge.synopsis", ["paragraph"])
const techCard = getTranslatedList("workshops.maquillatge.techCard", ["title", "description"])
const artCard = getTranslatedList("workshops.maquillatge.artCard", ["title", "description"])

const summaryButton = computed(() => {
  return {
    download: `CiaFiligranes-maquillatge-${locale.value}.pdf`,
    href: `/downloads/dossiers/CiaFiligranes-maquillatge-${locale.value}.pdf`,
  }
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_maquillatge-1"
      image-route="tallers"
      :alt="getImageAlt('maquillatge')"
      content-type="workshops"
      schedule-content-key="maquillatge"
      background-position="center 40%"
    >
      <template #content>
        <CoverTitle
          v-if="!isMobile"
          :title="t('workshops.commonTitle', { title: t('routes.maquillatge') })"
          title-class="max-w-[406px] md:max-w-[524px] lg:max-w-[648px]"
          :slice-end="2"
        />
        <div
          v-else
          class="py-5 xs:px-0 sm:px-5 font-grotesk uppercase text-white max-w-[332px] md:max-w-[432px] lg:max-w-[532px]"
        >
          <h1 class="text-5xl">
            {{ t("workshops.commonTitle", { title: "" }).trim() }}
          </h1>
          <h2 class="text-4xl">
            {{ t("routes.maquillatge") }}
          </h2>
        </div>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary :abstract="abstract" :items="summaryItems" />
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('tallers', 'maquillatge-4')"
          content-type="workshops"
          :alt="getImageAlt('maquillatge')"
          show-full-content
          should-clip
          :download-button="summaryButton"
          :hire-contract="{ kind: 'workshop', productKey: 'maquillatge' }"
        />
        <DataSheet
          :tech-card="techCard"
          :art-card="artCard"
          :image="getImageByRoute('tallers', 'maquillatge-2')"
          :alt="getImageAlt('maquillatge')"
          content-type="workshops"
          background-position="center 30%"
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
                title: t('workshops.commonTitle', { title: t('routes.maquillatge') }),
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
            :reorder-index="getItemIndex('tallers', 'maquillatge')"
          />
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="workshops" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          image-name="tallers_maquillatge-3"
          image-route="tallers"
          :alt="getImageAlt('maquillatge')"
          content-type="workshops"
          background-position="center 35%"
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
