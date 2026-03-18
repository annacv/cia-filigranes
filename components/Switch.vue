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
    class="relative inline-flex h-[16px] w-[26px] lg:h-[16px] lg:w-[30px] xl:h-[18px] xl:w-[34px] flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-out hover:bg-neutral-400 focus:outline-none focus-visible:bg-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    :class="modelValue ? 'bg-neutral-900' : 'bg-neutral-200'"
    @click="toggle"
  >
    <span class="sr-only">{{ ariaLabel }}</span>
    <span
      aria-hidden="true"
      class="inline-block h-[12px] w-[12px] lg:h-[12px] lg:w-[12px] xl:h-[14px] xl:w-[14px] transform rounded-full bg-white shadow transition-transform duration-200 ease-out"
      :class="modelValue ? 'translate-x-[12px] lg:translate-x-[16px] xl:translate-x-[18px]' : 'translate-x-[2px]'"
    />
  </button>
</template>
