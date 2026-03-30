<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { AgendaPrimaryFilterOption } from '~/types'
import EventTypeDropdown from '~/components/agenda/EventTypeDropdown.vue'

const props = defineProps({
  selectedPrimaryFilter: {
    type: String as PropType<string | null>,
    default: null,
  },
  primaryFilterOptions: {
    type: Array as PropType<AgendaPrimaryFilterOption[]>,
    required: true,
  },
  showOnlyOpenToPublic: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  'update:selectedPrimaryFilter': [value: string | null]
  'update:showOnlyOpenToPublic': [value: boolean]
}>()

const { t } = useI18n()

const selectedPrimaryFilterModel = computed({
  get: () => props.selectedPrimaryFilter,
  set: (value: string | null) => emit('update:selectedPrimaryFilter', value),
})

const showOnlyOpenToPublicModel = computed({
  get: () => props.showOnlyOpenToPublic,
  set: (value: boolean) => emit('update:showOnlyOpenToPublic', value),
})

const selectedPrimaryFilterOption = computed(() => {
  return props.primaryFilterOptions.find(option => option.value === selectedPrimaryFilterModel.value)
    ?? props.primaryFilterOptions[0]
})

const getEventTypeButtonClass = () => {
  return [
    'pr-4 font-normal',
    'transition-all duration-200 ease-out',
  ]
}

const getPrimaryFilterLabelClass = (option: AgendaPrimaryFilterOption) => {
  const isActive = selectedPrimaryFilterModel.value === option.value
  return [
    'whitespace-nowrap transition-colors duration-200 ease-out',
    isActive ? 'text-neutral-900' : 'text-neutral-600 group-hover:text-neutral-900 group-focus-visible:text-neutral-900',
  ]
}

const getPrimaryFilterIndicatorClass = (option: AgendaPrimaryFilterOption) => {
  const isActive = selectedPrimaryFilterModel.value === option.value
  return [
    'block h-1 w-full rounded-full transition-colors duration-200 ease-out',
    isActive ? option.activeIndicatorClass : option.inactiveIndicatorClass,
    option.interactiveActiveIndicatorClass,
  ]
}

const dropdownOptions = computed(() => {
  return props.primaryFilterOptions.map(option => ({
    ...option,
    inactiveIndicatorClass: selectedPrimaryFilterModel.value === option.value
      ? option.activeIndicatorClass
      : option.inactiveIndicatorClass,
  }))
})

const selectedPrimaryFilterLabel = computed(() => {
  return selectedPrimaryFilterOption.value?.label ?? ''
})

const selectedPrimaryFilterIndicatorClass = computed(() => {
  return selectedPrimaryFilterOption.value?.activeIndicatorClass ?? 'bg-primary-500'
})

const updateSelectedPrimaryFilter = (value: string | null) => {
  selectedPrimaryFilterModel.value = value
}
</script>

<template>
  <div class="mb-2 md:mb-4 flex w-full items-center justify-between gap-4 text-sm font-neutral-900 !leading-normal lg:text-base xl:text-lg">
    <EventTypeDropdown
      class="md:hidden"
      :selected-value="selectedPrimaryFilterModel"
      :selected-label="selectedPrimaryFilterLabel"
      :options="dropdownOptions"
      :toggle-aria-label="t('agenda.filters.dropdownAriaLabel')"
      :menu-aria-label="t('agenda.filters.dropdownMenuAriaLabel')"
      :indicator-class="selectedPrimaryFilterIndicatorClass"
      @select="updateSelectedPrimaryFilter"
    />

    <nav
      class="hidden md:block md:order-1"
      :aria-label="t('agenda.filters.ariaLabel')"
    >
      <ul class="flex justify-between items-center gap-4 md:gap-8 lg:gap-14">
        <li
          v-for="option in primaryFilterOptions"
          :key="option.value ?? option.label"
          class="flex"
        >
          <button
            type="button"
            :class="['group flex flex-col items-start', getEventTypeButtonClass()]"
            :aria-pressed="selectedPrimaryFilterModel === option.value"
            @click="updateSelectedPrimaryFilter(option.value)"
          >
            <span :class="['pb-1', getPrimaryFilterLabelClass(option)]">{{ option.label }}</span>
            <span :class="getPrimaryFilterIndicatorClass(option)" aria-hidden="true" />
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
