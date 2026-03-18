<script setup lang="ts">
import { useCalendarEvents } from "~/composables/calendar/use-calendar-events.composable"
import type { ContentType, CalendarEvent } from "~/types"

const { t } = useI18n()
const { events, pending, error } = useCalendarEvents()

useHead({
  meta: [
    { name: 'description', content: t('agenda.metaDescription') }
  ]
})

const currentYear = new Date().getFullYear()
const nextYear = currentYear + 1

type EventTypeFilterItem = {
  type: ContentType
  labelKey: string
  activeIndicatorClass: string
  inactiveIndicatorClass: string
  interactiveActiveIndicatorClass: string
}

const EVENT_TYPE_FILTER_ITEMS: EventTypeFilterItem[] = [
  {
    type: 'shows',
    labelKey: 'agenda.filters.shows',
    activeIndicatorClass: 'bg-primary-500',
    inactiveIndicatorClass: 'bg-primary-300',
    interactiveActiveIndicatorClass: 'group-hover:bg-primary-500 group-focus-visible:bg-primary-500',
  },
  {
    type: 'workshops',
    labelKey: 'agenda.filters.workshops',
    activeIndicatorClass: 'bg-secondary-500',
    inactiveIndicatorClass: 'bg-secondary-300',
    interactiveActiveIndicatorClass: 'group-hover:bg-secondary-500 group-focus-visible:bg-secondary-500',
  },
  {
    type: 'performances',
    labelKey: 'agenda.filters.performances',
    activeIndicatorClass: 'bg-tertiary-500',
    inactiveIndicatorClass: 'bg-tertiary-300',
    interactiveActiveIndicatorClass: 'group-hover:bg-tertiary-500 group-focus-visible:bg-tertiary-500',
  },
]

const selectedEventType = ref<ContentType | null>(null)

// Switch: ON = show all events (including closed groups). OFF = hide closed-group events.
const showClosedGroups = ref(true)

const isClosedGroupEvent = (event: CalendarEvent): boolean => {
  const description = event.description ?? ''
  return /\btancats?\b/i.test(description)
}

const filteredEvents = computed(() => {
  const source = events.value
  return source.filter((event) => {
    if (selectedEventType.value && event.eventType !== selectedEventType.value) return false
    if (!showClosedGroups.value && isClosedGroupEvent(event)) return false
    return true
  })
})

const getEventTypeItemIsActive = (type: ContentType) => selectedEventType.value === type

const getEventTypeButtonClass = () => {
  return [
    'pr-4 font-normal',
    'transition-all duration-200 ease-out',
  ]
}

const getEventTypeLabelClass = (item: EventTypeFilterItem) => {
  const isActive = getEventTypeItemIsActive(item.type)
  return [
    'whitespace-nowrap transition-colors duration-200 ease-out',
    isActive ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-900 group-focus-visible:text-neutral-900',
  ]
}

const getEventTypeIndicatorClass = (item: EventTypeFilterItem) => {
  const isActive = getEventTypeItemIsActive(item.type)
  return [
    'block h-1 w-full rounded-full transition-colors duration-200 ease-out',
    isActive ? item.activeIndicatorClass : item.inactiveIndicatorClass,
    item.interactiveActiveIndicatorClass,
  ]
}

const getAllIndicatorClass = computed(() => {
  return [
    'block h-1 w-full rounded-full transition-colors duration-200 ease-out group-hover:bg-primary-500 group-focus-visible:bg-primary-500',
    selectedEventType.value === null ? 'bg-primary-500' : 'bg-primary-300',
  ]
})

const getAllLabelClass = computed(() => {
  return [
    'whitespace-nowrap transition-colors duration-200 ease-out',
    selectedEventType.value === null ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-900 group-focus-visible:text-neutral-900',
  ]
})

const hasActiveFilters = computed(() => {
  return selectedEventType.value !== null || !showClosedGroups.value
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="agenda_hero"
      image-route="agenda"
      :alt="t('commonAlt')"
    >
      <template #content>
        <SectionCoverTitle
          :title="`${t('routes.agenda')} ${currentYear}-${nextYear}`"
          title-class="max-w-[298px] md:max-w-[378px]"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <ClaimTitle
          class="text-center"
          claim=""
          :claim-title="t('agenda.claimTitle')"
          is-section-title
        />
      </template>
      <template #wrappedBottom>
        <div class="w-full flex justify-between items-center text-sm lg:text-base xl:text-lg !leading-normal font-neutral-900 mb-7">
          <nav :aria-label="t('agenda.filters.ariaLabel')">
            <ul class="flex justify-between items-center gap-4 md:gap-8 lg:gap-14">
              <li
                v-for="item in EVENT_TYPE_FILTER_ITEMS"
                :key="item.type"
                class="flex"
              >
                <button
                  type="button"
                  :class="['group flex flex-col items-start', getEventTypeButtonClass()]"
                  :aria-pressed="getEventTypeItemIsActive(item.type)"
                  @click="selectedEventType = item.type"
                >
                  <span :class="['pb-1', getEventTypeLabelClass(item)]">{{ t(item.labelKey) }}</span>
                  <span :class="getEventTypeIndicatorClass(item)" aria-hidden="true" />
                </button>
              </li>
              <li
                class="flex"
              >
                <button
                  type="button"
                  :class="[
                    'group flex flex-col items-start pr-4 font-normal transition-all duration-200 ease-out'
                  ]"
                  :aria-pressed="selectedEventType === null"
                  @click="selectedEventType = null"
                >
                  <span :class="['pb-1', getAllLabelClass]">{{ t('agenda.filters.all') }}</span>
                  <span :class="getAllIndicatorClass" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </nav>

          <div class="flex items-center flex-1 justify-end">
            <div class="flex items-center gap-3">
              <label
                for="closed-groups-toggle"
                class="leading-none font-normal"
              >
                {{ t('agenda.filters.closedGroups') }}
              </label>
              <Switch
                id="closed-groups-toggle"
                v-model="showClosedGroups"
                :aria-label="t('agenda.filters.closedGroupsAriaLabel')"
                class="self-center"
              />
            </div>
          </div>
        </div>
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
