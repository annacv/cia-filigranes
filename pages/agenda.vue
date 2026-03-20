<script setup lang="ts">
import { useCalendarEvents } from "~/composables/calendar/use-calendar-events.composable"
import { EVENT_TYPE_FILTER_ITEMS } from "~/constants"
import type { EventTypeFilterItem, ContentType, CalendarEvent } from "~/types"

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
  return selectedEventType.value !== null || showOnlyOpenToPublic.value
})

const eventTypeDropdownOptions = computed(() => {
  return [
    { type: null, label: t('agenda.filters.all'), indicatorClass: 'bg-primary-300' },
    ...EVENT_TYPE_FILTER_ITEMS.map(item => ({
      type: item.type,
      label: t(item.labelKey),
      indicatorClass: item.inactiveIndicatorClass,
    })),
  ]
})

const selectedEventTypeLabel = computed(() => {
  if (selectedEventType.value === null) {
    return t('agenda.filters.all')
  }

  const selectedItem = EVENT_TYPE_FILTER_ITEMS.find(item => item.type === selectedEventType.value)
  return selectedItem ? t(selectedItem.labelKey) : t('agenda.filters.all')
})

const selectedEventTypeIndicatorClass = computed(() => {
  if (selectedEventType.value === null) {
    return 'bg-primary-500'
  }

  const selectedItem = EVENT_TYPE_FILTER_ITEMS.find(item => item.type === selectedEventType.value)
  return selectedItem ? selectedItem.activeIndicatorClass : 'bg-primary-500'
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
        <div class="mb-4 md:mb-7 flex w-full items-center justify-between gap-4 text-sm font-neutral-900 !leading-normal lg:text-base xl:text-lg">
          <EventTypeDropdown
            class="md:hidden"
            :selected-event-type="selectedEventType"
            :selected-label="selectedEventTypeLabel"
            :options="eventTypeDropdownOptions"
            :toggle-aria-label="t('agenda.filters.dropdownAriaLabel')"
            :menu-aria-label="t('agenda.filters.dropdownMenuAriaLabel')"
            :indicator-class="selectedEventTypeIndicatorClass"
            @select="selectedEventType = $event"
          />

          <nav
            class="hidden md:block md:order-1"
            :aria-label="t('agenda.filters.ariaLabel')"
          >
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

          <div class="flex items-center gap-1.5 md:order-2 md:flex-1 md:justify-end">
            <label
              for="closed-groups-toggle"
              class="leading-none text-right text-xs sm:text-sm md:text-base lg:text-lg"
            >
              {{ t('agenda.filters.onlyOpenToPublic') }}
            </label>
            <Switch
              id="closed-groups-toggle"
              v-model="showOnlyOpenToPublic"
              :aria-label="t('agenda.filters.onlyOpenToPublicAriaLabel')"
              class="self-center"
            />
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
