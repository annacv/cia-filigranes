<script setup lang="ts">
import { computed, type PropType } from 'vue'
import { EVENT_TYPE_FILTER_ITEMS } from '~/constants'
import type { EventTypeFilterItem, ContentType } from '~/types'

const props = defineProps({
  selectedEventType: {
    type: String as PropType<ContentType | null>,
    default: null,
  },
  showOnlyOpenToPublic: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:selectedEventType': [value: ContentType | null]
  'update:showOnlyOpenToPublic': [value: boolean]
}>()

const { t } = useI18n()

const selectedEventTypeModel = computed({
  get: () => props.selectedEventType,
  set: (value: ContentType | null) => emit('update:selectedEventType', value),
})

const showOnlyOpenToPublicModel = computed({
  get: () => props.showOnlyOpenToPublic,
  set: (value: boolean) => emit('update:showOnlyOpenToPublic', value),
})

const getEventTypeItemIsActive = (type: ContentType) => selectedEventTypeModel.value === type

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
    selectedEventTypeModel.value === null ? 'bg-primary-500' : 'bg-primary-300',
  ]
})

const getAllLabelClass = computed(() => {
  return [
    'whitespace-nowrap transition-colors duration-200 ease-out',
    selectedEventTypeModel.value === null ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-900 group-focus-visible:text-neutral-900',
  ]
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
  if (selectedEventTypeModel.value === null) {
    return t('agenda.filters.all')
  }

  const selectedItem = EVENT_TYPE_FILTER_ITEMS.find(item => item.type === selectedEventTypeModel.value)
  return selectedItem ? t(selectedItem.labelKey) : t('agenda.filters.all')
})

const selectedEventTypeIndicatorClass = computed(() => {
  if (selectedEventTypeModel.value === null) {
    return 'bg-primary-500'
  }

  const selectedItem = EVENT_TYPE_FILTER_ITEMS.find(item => item.type === selectedEventTypeModel.value)
  return selectedItem ? selectedItem.activeIndicatorClass : 'bg-primary-500'
})

const updateSelectedEventType = (value: ContentType | null) => {
  selectedEventTypeModel.value = value
}
</script>

<template>
  <div class="mb-4 md:mb-7 flex w-full items-center justify-between gap-4 text-sm font-neutral-900 !leading-normal lg:text-base xl:text-lg">
    <EventTypeDropdown
      class="md:hidden"
      :selected-event-type="selectedEventTypeModel"
      :selected-label="selectedEventTypeLabel"
      :options="eventTypeDropdownOptions"
      :toggle-aria-label="t('agenda.filters.dropdownAriaLabel')"
      :menu-aria-label="t('agenda.filters.dropdownMenuAriaLabel')"
      :indicator-class="selectedEventTypeIndicatorClass"
      @select="updateSelectedEventType"
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
            @click="updateSelectedEventType(item.type)"
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
            :aria-pressed="selectedEventTypeModel === null"
            @click="updateSelectedEventType(null)"
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
        v-model="showOnlyOpenToPublicModel"
        :aria-label="t('agenda.filters.onlyOpenToPublicAriaLabel')"
        class="self-center"
      />
    </div>
  </div>
</template>
