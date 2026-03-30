<script setup lang="ts">
import { useCalendarEvents } from "~/composables/calendar/use-calendar-events.composable"
import { EVENT_TYPE_FILTER_ITEMS } from "~/constants"
import type { AgendaPrimaryFilterOption, ContentType, CalendarEvent } from "~/types"
import AgendaFilters from "~/components/agenda/CalendarFilters.vue"
import CalendarEventList from "~/components/agenda/CalendarEventList.vue"
import CalendarTrends from "~/components/agenda/CalendarTrends.vue"

const { t } = useI18n()
const { events, pending, error } = useCalendarEvents()

useHead({
  meta: [
    { name: 'description', content: t('agenda.metaDescription') }
  ]
})

const currentYear = new Date().getFullYear()
const nextYear = currentYear + 1

const selectedEventType = ref<ContentType | null>(null)
const showOnlyOpenToPublic = ref(false)

const filteredEvents = computed(() => {
  const source = events.value
  return source.filter((event) => {
    if (selectedEventType.value && event.eventType !== selectedEventType.value) return false
    if (showOnlyOpenToPublic.value && event.isClosedGroupEvent) return false
    return true
  })
})

const hasActiveFilters = computed(() => {
  return selectedEventType.value !== null || showOnlyOpenToPublic.value
})

const primaryFilterOptions = computed<AgendaPrimaryFilterOption[]>(() => {
  return [
    {
      value: null,
      label: t('agenda.filters.all'),
      activeIndicatorClass: 'bg-primary-500',
      inactiveIndicatorClass: 'bg-primary-300',
      interactiveActiveIndicatorClass: 'group-hover:bg-primary-500 group-focus-visible:bg-primary-500',
    },
    ...EVENT_TYPE_FILTER_ITEMS.map(item => ({
      value: item.type,
      label: t(item.labelKey),
      activeIndicatorClass: item.activeIndicatorClass,
      inactiveIndicatorClass: item.inactiveIndicatorClass,
      interactiveActiveIndicatorClass: item.interactiveActiveIndicatorClass,
    })),
  ]
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="agenda_hero"
      image-route="agenda"
      :alt="t('commonAlt')"
      is-section-cover
    >
      <template #content>
        <SectionCoverTitle
          :title="`${t('routes.agenda')} ${currentYear}-${nextYear}`"
          title-class="max-w-[272px] md:max-w-[298px] lg:max-w-[378px]"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrappedTop>
        <ClaimTitle
          class="text-center"
          :claim-title="t('agenda.claimTitle')"
          is-section-title
        />
      </template>
      <template #wrapped>
        <AgendaFilters
          v-model:selected-primary-filter="selectedEventType"
          v-model:show-only-open-to-public="showOnlyOpenToPublic"
          :primary-filter-options="primaryFilterOptions"
        />
        <CalendarEventList
          :events="filteredEvents"
          :pending="pending"
          :error="error"
          :selected-event-type="selectedEventType"
          :has-active-filters="hasActiveFilters"
        />
      </template>
      <template #unwrapped>
        <ClaimTitle
          class="text-center md:!mt-16"
          :claim-title="t('agenda.trends.claimTitle')"
          :subtitle="t('agenda.trends.subtitle')"
          is-section-title
        />
      </template>
      <template #wrappedBottom>
        <CalendarTrends />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          :alt="t('home.hero.alt')"
          image-name="hero_footer"
          image-route=""
          background-position="center 30%"
        />
        <HireFili
          :title="t('home.hire.title')"
          description="home.hire.description"
        />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
