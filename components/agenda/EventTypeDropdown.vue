<script setup lang="ts">
import { computed, ref, type PropType } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { AgendaPrimaryFilterOption } from '~/types'

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
    type: Array as PropType<AgendaPrimaryFilterOption[]>,
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

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const triggerId = 'agenda-event-type-filter-trigger'
const menuId = 'agenda-event-type-filter-menu'

const availableOptions = computed(() => {
  return props.options.filter(option => option.value !== props.selectedValue)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectOption = (value: string | null) => {
  emit('select', value)
  closeDropdown()
}

const handleTriggerKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown' && !isOpen.value) {
    event.preventDefault()
    isOpen.value = true
  }
}

const handleMenuKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeDropdown()
  }
}

onClickOutside(dropdownRef, closeDropdown)
</script>

<template>
  <div
    ref="dropdownRef"
    class="relative"
  >
    <button
      :id="triggerId"
      type="button"
      class="group inline-flex flex-col items-start rounded-md px-0 py-1 text-neutral-900 transition-colors duration-200 ease-out hover:text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      :aria-label="toggleAriaLabel"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :aria-controls="menuId"
      @click="toggleDropdown"
      @keydown="handleTriggerKeydown"
    >
      <span class="inline-flex items-center gap-1.5">
        <span
          class="inline-flex h-4 w-2.5 flex-col items-center justify-between"
          aria-hidden="true"
        >
          <span class="h-1 w-1 rounded-full bg-current" />
          <span class="h-1 w-1 rounded-full bg-current" />
          <span class="h-1 w-1 rounded-full bg-current" />
        </span>
        <span class="inline-flex flex-col items-start">
          <span class="whitespace-nowrap text-xs sm:text-sm">{{ selectedLabel }}</span>
          <span
            :class="['mt-0.5 block h-1 w-full rounded-full transition-colors duration-200 ease-out', indicatorClass]"
            aria-hidden="true"
          />
        </span>
      </span>
    </button>

    <ul
      v-if="isOpen"
      :id="menuId"
      class="absolute left-0 top-full z-30 mt-2 w-max max-w-[calc(100vw-2rem)] rounded-md border border-neutral-300 bg-white py-1 shadow-md"
      role="listbox"
      :aria-labelledby="triggerId"
      :aria-label="menuAriaLabel"
      @keydown="handleMenuKeydown"
    >
      <li
        v-for="option in availableOptions"
        :key="option.value ?? 'all'"
        role="presentation"
      >
        <button
          type="button"
          class="block w-full px-4 py-2 text-left text-xs sm:text-sm text-neutral-800 transition-colors duration-200 ease-out hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none"
          role="option"
          :aria-selected="option.value === selectedValue"
          @click="selectOption(option.value)"
        >
          <span class="inline-flex w-full flex-col items-start">
            <span class="whitespace-nowrap">{{ option.label }}</span>
            <span
              :class="['mt-0.5 block h-1 w-full rounded-full transition-colors duration-200 ease-out', option.inactiveIndicatorClass]"
              aria-hidden="true"
            />
          </span>
        </button>
      </li>
    </ul>
  </div>
</template>
