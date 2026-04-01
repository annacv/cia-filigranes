<script setup lang="ts">
defineProps<{
  comments: string
  labelContainerClass: string
  labelClass: string
  fieldClass: string
  fieldBorderClass: string | string[]
}>()

const emit = defineEmits<{
  'update:comments': [value: string]
}>()

const { t } = useI18n()
</script>

<template>
  <label :class="[labelContainerClass, 'group']">
    <span :class="labelClass">{{ t('hire.fields.comments') }}</span>
    <textarea
      :value="comments"
      name="comments"
      rows="5"
      :placeholder="t('hire.placeholders.comments')"
      :class="fieldClass"
      @input="emit('update:comments', ($event.target as HTMLTextAreaElement).value)"
    />
    <div :class="fieldBorderClass" />
  </label>
</template>
