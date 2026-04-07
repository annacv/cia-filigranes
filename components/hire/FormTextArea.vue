<script setup lang="ts">
import { useHireFormDisplay } from '~/composables/form/use-hire-form-display.composable'

const props = defineProps<{
  comments: string
  variant: 'modal' | 'page'
}>()

const emit = defineEmits<{
  'update:comments': [value: string]
}>()

const { t } = useI18n()
const { labelContainerClass, labelClass, fieldClass, fieldBorderClass } = useHireFormDisplay({
  variant: props.variant,
  contentType: undefined
})
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
