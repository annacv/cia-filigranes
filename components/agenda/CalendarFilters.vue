<script setup lang="ts">
import { computed, type PropType } from 'vue'
import type { EventTypeItem } from '~/types/agenda'
import EventTypeDropdown from '~/components/agenda/EventTypeDropdown.vue'

const props = defineProps({
  selectedPrimaryFilter: {
    type: String as PropType<string | null>,
    default: null,
  },
  primaryFilterOptions: {
    type: Array as PropType<EventTypeItem[]>,
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

const desktopTabOptions = computed(() => {
  return props.primaryFilterOptions.map(option => ({
    value: option.value,
    label: t(option.labelKey),
    activeIndicatorClass: option.activeIndicatorClass,
    inactiveIndicatorClass: option.inactiveIndicatorClass,
  }))
})

const dropdownOptions = computed(() => {
  return props.primaryFilterOptions.map(option => ({
    value: option.value,
    labelKey: option.labelKey,
    activeIndicatorClass: option.activeIndicatorClass,
    inactiveIndicatorClass: option.inactiveIndicatorClass,
  }))
})

const selectedPrimaryFilterLabel = computed(() => {
  return selectedPrimaryFilterOption.value ? t(selectedPrimaryFilterOption.value.labelKey) : ''
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

    <BaseTabs
      v-model="selectedPrimaryFilterModel"
      class="hidden md:block md:order-1"
      :options="desktopTabOptions"
      :aria-label="t('agenda.filters.ariaLabel')"
    />

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
