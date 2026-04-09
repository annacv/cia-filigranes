<script setup lang="ts">
type BaseTabOption = {
  value: string | null
  label: string
  activeIndicatorClass?: string
  inactiveIndicatorClass?: string
}

const props = withDefaults(defineProps<{
  modelValue: string | null
  options: BaseTabOption[]
  textClass?: string
  ariaLabel?: string
}>(), {
  textClass: undefined,
  ariaLabel: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const setValue = (value: string | null) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <nav v-bind="ariaLabel ? { 'aria-label': ariaLabel } : {}">
    <ul class="flex justify-between items-center gap-4 md:gap-8 lg:gap-14">
      <li v-for="option in options" :key="option.value ?? option.label" class="flex">
        <button
          type="button"
          class="group flex flex-col items-start pr-4 font-normal transition-all duration-200 ease-out"
          :aria-pressed="modelValue === option.value"
          @click="setValue(option.value)"
        >
          <span
            :class="[
              'text-sm !leading-normal lg:text-base xl:text-lg pb-1 whitespace-nowrap transition-colors duration-200 ease-out',
              textClass,
              modelValue === option.value
                ? 'text-black'
                : 'text-neutral-600 group-hover:text-neutral-900 group-focus-visible:text-neutral-900'
            ]"
          >
            {{ option.label }}
          </span>
          <span
            :class="[
              'block h-1 w-full rounded-full transition-colors duration-200 ease-out',
              modelValue === option.value
                ? option.activeIndicatorClass
                : option.inactiveIndicatorClass
            ]"
            aria-hidden="true"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>
