<script setup lang="ts">
import { useCalendarEvents } from "~/composables/calendar/use-calendar-events.composable"
import type { ContentType, CalendarEvent } from "~/types"
import AgendaFilters from "~/components/agenda/AgendaFilters.vue"
import CalendarEventList from "~/components/agenda/CalendarEventList.vue"

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

const isClosedGroupEvent = (event: CalendarEvent): boolean => {
  const description = event.description ?? ''
  return /\btancats?\b/i.test(description)
}

const filteredEvents = computed(() => {
  const source = events.value
  return source.filter((event) => {
    if (selectedEventType.value && event.eventType !== selectedEventType.value) return false
    if (showOnlyOpenToPublic.value && isClosedGroupEvent(event)) return false
    return true
  })
})

const hasActiveFilters = computed(() => {
  return selectedEventType.value !== null || showOnlyOpenToPublic.value
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
      <template #unwrapped>
        <ClaimTitle
          class="text-center"
          :claim-title="t('agenda.claimTitle')"
          is-section-title
        />
      </template>
      <template #wrappedBottom>
        <AgendaFilters
          v-model:selected-event-type="selectedEventType"
          v-model:show-only-open-to-public="showOnlyOpenToPublic"
        />
        <CalendarEventList
          :events="filteredEvents"
          :pending="pending"
          :error="error"
          :selected-event-type="selectedEventType"
          :has-active-filters="hasActiveFilters"
        />
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
