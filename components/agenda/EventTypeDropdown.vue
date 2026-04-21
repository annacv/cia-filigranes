<script setup lang="ts">
import type { PropType } from 'vue'
import type { EventTypeItem } from '~/types/agenda'

const { t } = useI18n()

const props = defineProps({
  selectedValue: {
    type: String as PropType<string | null>,
    default: null,
  },
  selectedLabel: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<EventTypeItem[]>,
    required: true,
  },
  toggleAriaLabel: {
    type: String,
    required: true,
  },
  menuAriaLabel: {
    type: String,
    required: true,
  },
  indicatorClass: {
    type: String,
    required: true,
  },
})

const emit = defineEmits<{
  select: [value: string | null]
}>()
</script>

<template>
  <BaseDropdown
    :selected-value="selectedValue"
    :selected-label="selectedLabel"
    :options="options"
    :toggle-aria-label="toggleAriaLabel"
    :menu-aria-label="menuAriaLabel"
    :indicator-class="indicatorClass"
    @select="(value) => emit('select', value)"
  >
    <template #trigger-icon>
      <span
        class="inline-flex h-4 w-2.5 flex-col items-center justify-between"
        aria-hidden="true"
      >
        <span class="h-1 w-1 rounded-full bg-neutral-900" />
        <span class="h-1 w-1 rounded-full bg-neutral-900" />
        <span class="h-1 w-1 rounded-full bg-neutral-900" />
      </span>
    </template>
    <template #option="{ option }">
      <span class="inline-flex w-full flex-col items-start">
        <span class="whitespace-nowrap">{{ t(option.labelKey) }}</span>
        <span
          :class="['mt-0.5 block h-1 w-full rounded-full transition-colors duration-200 ease-out', option.inactiveIndicatorClass]"
          aria-hidden="true"
        />
      </span>
    </template>
  </BaseDropdown>
</template>
