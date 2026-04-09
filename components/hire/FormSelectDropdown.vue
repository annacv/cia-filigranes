<script setup lang="ts">
import type { PropType } from 'vue'
import ChevronDown from '~/assets/icons/chevron-down.svg'
import { useHireFormDisplay } from '~/composables/form/use-hire-form-display.composable'
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
  },
  variant: {
    type: String as PropType<'modal' | 'page'>,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits<{
  select: [value: string | null]
}>()

const { t } = useI18n()
const { fieldClasses } = useHireFormDisplay({
  variant: props.variant,
  contentType: undefined
})

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
      toOption('circ-depoca', 'hire.performanceOptions.circEpoca'),
      toOption('malabaristes', 'hire.performanceOptions.malabars'),
      toOption('oficis', 'hire.performanceOptions.oficis'),
      toOption('a-convenir', 'hire.performanceOptions.convenir'),
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
  <div :class="fieldClasses.labelContainerClass">
    <BaseDropdown
      :selected-value="selectedValue"
      :selected-label="selectedLabel"
      :options="options"
      :toggle-aria-label="t(placeholderKey)"
      :menu-aria-label="t(placeholderKey)"
      trigger-class="focus-visible:outline-none"
      menu-class="!w-full mt-4 overflow-y-auto max-h-36"
      option-class="!text-sm"
      @select="(value) => emit('select', value)"
    >
      <template #trigger-label="{ selectedLabel }">
        <span
          :class="[
            'whitespace-nowrap !leading-tight',
            isPlaceholderSelected ? 'text-base text-neutral-400 italic' : 'uppercase text-sm font-semibold text-neutral-900',
          ]"
        >
          {{ selectedLabel }}
        </span>
      </template>
      <template #trigger-trailing="{ isOpen }">
        <span
          :class="[
            'inline-flex origin-center transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100',
          ]"
        >
          <ChevronDown aria-hidden="true" class="block !w-3.5 !h-3.5" />
        </span>
      </template>
    </BaseDropdown>
    <div :class="fieldClasses.fieldBorderClass" />
    <span v-if="required" :class="fieldClasses.markerClass">*</span>
  </div>
</template>
