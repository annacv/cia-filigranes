<script setup lang="ts">
import { useHireFormDisplay } from '~/composables/form/use-hire-form-display.composable'

const props = defineProps<{
  fullName: string
  email: string
  fullNameErrorText?: string
  emailErrorText?: string
  variant: 'modal' | 'page'
}>()

const emit = defineEmits<{
  'update:fullName': [value: string]
  'update:email': [value: string]
  'blur:fullName': []
  'blur:email': []
}>()

const { t } = useI18n()
const { fieldClasses } = useHireFormDisplay({
  variant: props.variant,
  contentType: undefined
})

type FieldKey = 'fullName' | 'email'

const fields: Array<{
  key: FieldKey
  type: 'text' | 'email'
  name: string
  autocomplete: string
  labelKey: string
  placeholderKey: string
}> = [
  {
    key: 'fullName',
    type: 'text',
    name: 'full-name',
    autocomplete: 'name',
    labelKey: 'hire.fields.fullName',
    placeholderKey: 'hire.placeholders.fullName',
  },
  {
    key: 'email',
    type: 'email',
    name: 'email',
    autocomplete: 'email',
    labelKey: 'hire.fields.email',
    placeholderKey: 'hire.placeholders.email',
  },
]

function getFieldValue(key: FieldKey): string {
  return key === 'fullName' ? props.fullName : props.email
}

function getFieldError(key: FieldKey): string | undefined {
  return key === 'fullName' ? props.fullNameErrorText : props.emailErrorText
}

function onFieldInput(key: FieldKey, event: Event) {
  const value = (event.target as HTMLInputElement).value

  if (key === 'fullName') {
    emit('update:fullName', value)
    return
  }

  emit('update:email', value)
}

function onFieldBlur(key: FieldKey) {
  if (key === 'fullName') {
    emit('blur:fullName')
    return
  }

  emit('blur:email')
}

function inputId(key: FieldKey): string {
  return `hire-input-${key}`
}

function errorId(key: FieldKey): string {
  return `hire-input-${key}-error`
}

</script>

<template>
  <label
    v-for="field in fields"
    :key="field.key"
    :class="[fieldClasses.labelContainerClass, 'group']"
  >
    <span :class="fieldClasses.labelClass">{{ t(field.labelKey) }}</span>
    <input
      :id="inputId(field.key)"
      :value="getFieldValue(field.key)"
      :type="field.type"
      :name="field.name"
      :autocomplete="field.autocomplete"
      :placeholder="t(field.placeholderKey)"
      :class="fieldClasses.fieldClass"
      :aria-invalid="Boolean(getFieldError(field.key))"
      :aria-describedby="getFieldError(field.key) ? errorId(field.key) : undefined"
      required
      @input="onFieldInput(field.key, $event)"
      @blur="onFieldBlur(field.key)"
    >
    <div :class="[fieldClasses.fieldBorderClass, {'!bg-red-500 group-focus-within:!bg-red-500' : getFieldError(field.key)}]" />
    <div class="flex items-center gap-1 min-h-4">
      <span :class="[fieldClasses.markerClass, {'!text-red-500' : getFieldError(field.key)}]">*</span>
      <span
        v-if="getFieldError(field.key)"
        :id="errorId(field.key)"
        aria-live="polite"
        class="text-xs !leading-tight text-red-600"
      >
        {{ getFieldError(field.key) }}
      </span>
    </div>
  </label>
</template>
