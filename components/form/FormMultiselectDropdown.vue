<script setup lang="ts">
import type { ContentType } from '~/types'
import ChevronDown from '~/assets/icons/chevron-down.svg'
import { useHireFormDisplay } from '~/composables/form/use-hire-form-display.composable'

const props = defineProps<{
  options: { value: string; labelKey: string }[]
  labelKey: string
  selectAllLabelKey: string
  contentType: Extract<ContentType, 'shows' | 'workshops'>
}>()

const model = defineModel<string[]>({ default: () => [] })

const { t } = useI18n()
const { fieldClasses } = useHireFormDisplay({
  variant: 'page',
  contentType: props.contentType,
})

const selectAll = ref(false)

const allValues = computed(() => props.options.map((o) => o.value))

watch(selectAll, (on) => {
  if (on) {
    model.value = [...allValues.value]
  } else {
    model.value = []
  }
})

function toggleSelectAll() {
  selectAll.value = !selectAll.value
}

const selectedLabel = computed(() => {
  if (selectAll.value) {
    return t(props.selectAllLabelKey)
  }
  if (model.value.length === 0) {
    return t('hire.selectPlaceholder')
  }
  return model.value
    .map((v) => {
      const opt = props.options.find((o) => o.value === v)
      return opt ? t(opt.labelKey) : v
    })
    .join(', ')
})

const isPlaceholderStyle = computed(
  () => !selectAll.value && model.value.length === 0
)

const checkedColorClass = computed(() =>
  props.contentType === 'shows' ? 'bg-primary-500' : 'bg-secondary-500'
)

const checkboxAccentClass = computed(() =>
  props.contentType === 'shows'
    ? 'accent-primary-500 focus:ring-primary-500'
    : 'accent-secondary-500 focus:ring-secondary-500'
)
</script>

<template>
  <label :class="[fieldClasses.labelContainerClass, 'group']">
    <span :class="[fieldClasses.labelClass, '!text-neutral-200 text-sm font-semibold']">{{ t(labelKey) }}</span>
    <BaseDropdown
      :selected-value="null"
      :selected-label="selectedLabel"
      :options="options"
      :toggle-aria-label="t(selectAllLabelKey)"
      :menu-aria-label="t(selectAllLabelKey)"
      :include-selected-option="true"
      trigger-class="focus-visible:outline-none"
      menu-class="!w-full mt-4 overflow-y-auto max-h-36"
    >
      <template #trigger-label="{ selectedLabel: triggerLabel }">
        <span
          :class="[
            'block w-full min-w-0 truncate text-left !leading-tight',
            isPlaceholderStyle
              ? 'text-sm text-neutral-200 italic'
              : 'uppercase text-sm text-white',
          ]"
        >
          {{ triggerLabel }}
        </span>
      </template>
      <template #trigger-trailing="{ isOpen }">
        <span
          :class="[
            'inline-flex shrink-0 origin-center transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100',
          ]"
        >
          <ChevronDown aria-hidden="true" class="block !w-3.5 !h-3.5 text-neutral-200" />
        </span>
      </template>
      <template #menu="{ menuId, closeDropdown }">
        <ul
          :id="menuId"
          class="absolute left-0 top-full z-30 mt-4 w-full max-h-36 overflow-y-auto rounded-md border border-neutral-300 bg-white py-1 shadow-md"
          role="listbox"
          :aria-label="t(selectAllLabelKey)"
          @keydown.escape.prevent="closeDropdown"
        >
          <li
            class="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-2"
            role="none"
          >
            <span class="text-left text-sm text-neutral-900">{{ t(selectAllLabelKey) }}</span>
            <button
              type="button"
              role="switch"
              :aria-checked="selectAll"
              class="relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              :class="selectAll ? checkedColorClass : 'bg-neutral-300'"
              @click.stop="toggleSelectAll"
            >
              <span
                class="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
                :class="selectAll ? 'translate-x-4' : 'translate-x-0'"
                aria-hidden="true"
              />
            </button>
          </li>
          <li
            v-for="opt in options"
            :key="opt.value"
            role="none"
            class="px-4 py-2"
          >
            <label
              class="flex cursor-pointer items-center gap-2 text-left text-sm text-neutral-900"
              :class="selectAll ? 'cursor-default opacity-70' : 'hover:bg-neutral-50'"
            >
              <input
                v-model="model"
                type="checkbox"
                class="h-4 w-4 shrink-0 rounded border-neutral-400"
                :class="checkboxAccentClass"
                :value="opt.value"
                :disabled="selectAll"
              >
              <span class="whitespace-nowrap">{{ t(opt.labelKey) }}</span>
            </label>
          </li>
        </ul>
      </template>
    </BaseDropdown>
    <div :class="`!bg-neutral-200 ${fieldClasses.fieldBorderClass}`" />
  </label>
</template>
