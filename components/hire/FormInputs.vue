<script setup lang="ts">
defineProps<{
  fullName: string
  email: string
  labelContainerClass: string
  labelClass: string
  fieldClass: string
  fieldBorderClass: string | string[]
  markerClass: string
}>()

const emit = defineEmits<{
  'update:fullName': [value: string]
  'update:email': [value: string]
}>()

const { t } = useI18n()
</script>

<template>
  <label :class="labelContainerClass">
    <span :class="labelClass">{{ t('hire.fields.fullName') }}</span>
    <input
      :value="fullName"
      type="text"
      name="full-name"
      autocomplete="name"
      :placeholder="t('hire.placeholders.fullName')"
      :class="fieldClass"
      required
      @input="emit('update:fullName', ($event.target as HTMLInputElement).value)"
    >
    <div :class="fieldBorderClass" />
    <span :class="markerClass">*</span>
  </label>
  <label :class="labelContainerClass">
    <span :class="labelClass">{{ t('hire.fields.email') }}</span>
    <input
      :value="email"
      type="email"
      name="email"
      autocomplete="email"
      :placeholder="t('hire.placeholders.email')"
      :class="fieldClass"
      required
      @input="emit('update:email', ($event.target as HTMLInputElement).value)"
    >
    <div :class="fieldBorderClass" />
    <span :class="markerClass">*</span>
  </label>
</template>
