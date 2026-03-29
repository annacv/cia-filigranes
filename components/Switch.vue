<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    default: undefined,
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (_e: 'update:modelValue', _value: boolean): void
}>()

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    :id="id"
    type="button"
    role="switch"
    :aria-checked="modelValue"
    :aria-label="ariaLabel"
    :disabled="disabled"
    class="relative inline-flex h-4 w-[26px] lg:h-4 lg:w-[30px] xl:h-[18px] xl:w-[34px] flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    :class="modelValue ? 'bg-neutral-900' : 'bg-neutral-200'"
    @click="toggle"
  >
    <span class="sr-only">{{ ariaLabel }}</span>
    <span
      aria-hidden="true"
      class="inline-block h-3 w-3 lg:h-3 lg:w-3 xl:h-3.5 xl:w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ease-out"
      :class="modelValue ? 'translate-x-3 lg:translate-x-4 xl:translate-x-[18px]' : 'translate-x-0.5'"
    />
  </button>
</template>
