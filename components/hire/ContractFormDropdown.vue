<script setup lang="ts">
import type { PropType } from 'vue'
import ChevronDown from '~/assets/icons/arrow-down.svg'
import type { EventTypeItem, } from '~/types'
import { EVENT_TYPE_COLORS, ROUTES_INDEX } from '~/constants'

const props = defineProps({
  selectedValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  selectedType: {
    type: String as PropType<'shows' | 'workshops' | 'performances'>,
    required: true,
  }
})

const emit = defineEmits<{
  select: [value: string | null]
}>()

const { t } = useI18n()

const showRouteChildren = ROUTES_INDEX.find((r) => r.name === 'espectacles')?.children ?? []
const workshopRouteChildren = ROUTES_INDEX.find((r) => r.name === 'tallers')?.children ?? []

const toOption = (value: string, labelKey: string): EventTypeItem => ({
  value,
  labelKey,
  activeIndicatorClass: EVENT_TYPE_COLORS[props.selectedType].bg,
  inactiveIndicatorClass: EVENT_TYPE_COLORS[props.selectedType].bgLight,
})

const options = computed<EventTypeItem[]>(() => {
  if (props.selectedType === 'workshops') {
    return workshopRouteChildren.map((value) => toOption(value, `routes.${value}`))
  }
  if (props.selectedType === 'performances') {
    return [
      toOption('option1', 'option1'),
      toOption('option2', 'option2'),
      toOption('option3', 'option3'),
    ]
  }
  return showRouteChildren.map((value) => toOption(value, `routes.${value}`))
})

const placeholderKey = computed(() => {
  if (props.selectedType === 'workshops') return 'hire.placeholders.workshopSelect'
  if (props.selectedType === 'performances') return 'hire.placeholders.performanceSelect'
  return 'hire.placeholders.showSelect'
})

const selectedLabel = computed(() => {
  const option = options.value.find((entry) => entry.value === props.selectedValue)
  return option ? t(option.labelKey) : t(placeholderKey.value)
})

const isPlaceholderSelected = computed(() =>
  !options.value.some((entry) => entry.value === props.selectedValue)
)
</script>

<template>
  <BaseDropdown
    :selected-value="selectedValue"
    :selected-label="selectedLabel"
    :options="options"
    :toggle-aria-label="t(placeholderKey)"
    :menu-aria-label="t(placeholderKey)"
    option-class="!text-sm"
    @select="(value) => emit('select', value)"
  >
    <template #trigger-label="{ selectedLabel }">
      <span
        :class="[
          'whitespace-nowrap',
          isPlaceholderSelected ? 'text-base text-neutral-400 italic' : 'text-sm uppercase font-semibold text-neutral-900',
        ]"
      >
        {{ selectedLabel }}
      </span>
    </template>
    <template #trigger-trailing>
      <ChevronDown class="h-3 w-3 shrink-0 text-neutral-900" aria-hidden="true" />
    </template>
  </BaseDropdown>
</template>
