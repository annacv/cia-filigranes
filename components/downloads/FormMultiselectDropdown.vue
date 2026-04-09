<script setup lang="ts">
import type { ContentType } from '~/types'
import { onClickOutside } from '@vueuse/core'
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

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const selectAll = ref(true)

const allValues = computed(() => props.options.map((o) => o.value))

function syncModel() {
  if (selectAll.value) {
    model.value = [...allValues.value]
  }
}

watch(
  allValues,
  () => {
    syncModel()
  },
  { immediate: true }
)

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

function toggleOption(value: string) {
  if (selectAll.value) return
  const next = new Set(model.value)
  if (next.has(value)) {
    next.delete(value)
  } else {
    next.add(value)
  }
  model.value = [...next]
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
  () => selectAll.value || model.value.length === 0
)

onClickOutside(rootRef, () => {
  isOpen.value = false
})
</script>

<template>
  <label :class="[fieldClasses.labelContainerClass, 'group']">
    <span :class="fieldClasses.labelClass">{{ t(labelKey) }}</span>
    <div ref="rootRef" class="relative">
      <button
        type="button"
        class="group w-full flex flex-col items-start rounded-md px-0 py-1 text-neutral-900 transition-colors duration-200 ease-out hover:text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        :aria-label="t(selectAllLabelKey)"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        @click="isOpen = !isOpen"
      >
        <span class="w-full inline-flex items-center justify-between gap-1.5">
          <span class="inline-flex flex-col items-start min-w-0 flex-1">
            <span
              :class="[
                'whitespace-nowrap !leading-tight truncate max-w-full',
                isPlaceholderStyle
                  ? 'text-base text-neutral-400 italic'
                  : 'uppercase text-sm font-semibold text-neutral-900',
              ]"
            >
              {{ selectedLabel }}
            </span>
          </span>
          <span
            :class="[
              'inline-flex shrink-0 origin-center transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100',
            ]"
          >
            <ChevronDown aria-hidden="true" class="block !w-3.5 !h-3.5" />
          </span>
        </span>
      </button>

      <Transition
        enter-active-class="transition-all duration-100 ease-out"
        enter-from-class="translate-y-1 scale-95 opacity-0"
        enter-to-class="translate-y-0 scale-100 opacity-100"
        leave-active-class="transition-all duration-125 ease-in"
        leave-from-class="translate-y-0 scale-100 opacity-100"
        leave-to-class="translate-y-1 scale-95 opacity-0"
      >
        <ul
          v-if="isOpen"
          class="absolute left-0 top-full z-30 mt-4 w-full max-h-36 overflow-y-auto rounded-md border border-neutral-300 bg-white py-1 shadow-md"
          role="listbox"
          :aria-label="t(selectAllLabelKey)"
          @keydown.escape.prevent="isOpen = false"
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
              :class="selectAll ? 'bg-primary-500' : 'bg-neutral-300'"
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
                type="checkbox"
                class="h-4 w-4 shrink-0 rounded border-neutral-400 text-primary-600 focus:ring-primary-500"
                :checked="selectAll || model.includes(opt.value)"
                :disabled="selectAll"
                @click.prevent="toggleOption(opt.value)"
              >
              <span class="whitespace-nowrap">{{ t(opt.labelKey) }}</span>
            </label>
          </li>
        </ul>
      </Transition>
    </div>
    <div :class="fieldClasses.fieldBorderClass" />
  </label>
</template>
