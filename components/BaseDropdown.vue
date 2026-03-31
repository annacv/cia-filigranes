<script setup lang="ts">
import { ref, useId } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { BaseDropdownOption } from '~/types'
const { t } = useI18n()

const props = defineProps<{
  selectedValue: string | null
  selectedLabel: string
  options: BaseDropdownOption[]
  toggleAriaLabel: string
  menuAriaLabel: string
  indicatorClass?: string
  optionClass?: string
}>()

const emit = defineEmits<{
  select: [value: string | null]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const menuId = useId()
const availableOptions = computed(() =>
  props.options.filter(option => option.value !== props.selectedValue)
)

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
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      class="group w-full flex flex-col items-start rounded-md px-0 py-1 text-neutral-900 transition-colors duration-200 ease-out hover:text-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      :aria-label="toggleAriaLabel"
      aria-haspopup="listbox"
      :aria-controls="menuId"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
      @keydown="handleTriggerKeydown"
    >
      <span class="w-full inline-flex items-center justify-between gap-1.5">
        <slot name="trigger-icon" />
        <span class="inline-flex flex-col items-start">
          <slot name="trigger-label" :selected-label="selectedLabel">
            <span class="whitespace-nowrap text-xs sm:text-sm">{{ selectedLabel }}</span>
          </slot>
          <span
            v-if="indicatorClass"
            :class="['mt-0.5 block h-1 w-full rounded-full transition-colors duration-200 ease-out', indicatorClass]"
            aria-hidden="true"
          />
        </span>
        <slot name="trigger-trailing" />
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
        :id="menuId"
        class="absolute left-0 top-full z-30 mt-1 w-max max-w-[calc(100vw-2rem)] origin-top-left rounded-md border border-neutral-300 bg-white py-1 shadow-md"
        role="listbox"
        :aria-label="menuAriaLabel"
        @keydown="handleMenuKeydown"
      >
        <li
          v-for="option in availableOptions"
          :key="option.value ?? 'null-option'"
          role="presentation"
        >
          <button
            type="button"
            :class="['block w-full px-4 py-2 text-left text-xs sm:text-sm text-neutral-900 transition-colors duration-200 ease-out hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none', optionClass]"
            role="option"
            :aria-selected="option.value === selectedValue"
            @click="selectOption(option.value)"
          >
            <slot
              name="option"
              :option="option"
              :selected="option.value === selectedValue"
            >
              <span class="whitespace-nowrap">{{ t(option.labelKey) }}</span>
            </slot>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>
