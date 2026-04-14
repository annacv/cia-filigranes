<script setup lang="ts">
import { useHireFormDisplay } from '~/composables/form/use-hire-form-display.composable'

const props = withDefaults(
  defineProps<{
    comments: string
    variant: 'modal' | 'page'
    isPerformances?: boolean
  }>(),
  { isPerformances: false }
)

const emit = defineEmits<{
  'update:comments': [value: string]
}>()

const { t } = useI18n()
const commentsPlaceholderKey = computed(() =>
  props.isPerformances
    ? 'hire.placeholders.commentsPerformances'
    : 'hire.placeholders.comments'
)
const { fieldClasses } = useHireFormDisplay({
  variant: props.variant,
  contentType: undefined
})
</script>

<template>
  <label :class="[fieldClasses.labelContainerClass, 'group']">
    <span :class="fieldClasses.labelClass">{{ t('hire.fields.comments') }}</span>
    <textarea
      :value="comments"
      name="comments"
      rows="5"
      :placeholder="t(commentsPlaceholderKey)"
      :class="fieldClasses.fieldClass"
      @input="emit('update:comments', ($event.target as HTMLTextAreaElement).value)"
    />
    <div :class="fieldClasses.fieldBorderClass" />
  </label>
</template>
