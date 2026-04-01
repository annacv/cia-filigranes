<script setup lang="ts">
import type { HireProductKind } from '~/types'
import FormSelectDropdown from '~/components/hire/FormSelectDropdown.vue'
import FormInputs from '~/components/hire/FormInputs.vue'
import FormTextArea from '~/components/hire/FormTextArea.vue'
import FormButtons from '~/components/hire/FormButtons.vue'
import FormFooter from '~/components/hire/FormFooter.vue'

const props = withDefaults(
  defineProps<{
    productKind?: HireProductKind
    defaultProductKey?: string | null
    submitButtonClass?: string
    cancelButtonClass?: string
    circleIconClass?: string
  }>(),
  {
    productKind: undefined,
    defaultProductKey: null,
    submitButtonClass: 'button-outline-primary bg-primary-500 hover:border-primary-500',
    cancelButtonClass: 'button-solid-primary',
    circleIconClass: 'text-primary-500'
  }
)

const {
  t,
  selectedKey,
  fullName,
  email,
  comments,
  contractType,
  labelClass,
  labelContainerClass,
  fieldClass,
  fieldBorderClass,
  markerClass,
  setSelectedKey,
  resetForm,
  onSubmit
} = useHireContractForm({
  variant: 'modal',
  productKind: toRef(props, 'productKind'),
  defaultProductKey: toRef(props, 'defaultProductKey')
})
</script>

<template>
  <form class="flex flex-col gap-6" @submit="onSubmit">
    <div :class="[labelContainerClass, 'group']">
      <span :class="labelClass">
        {{
          productKind === 'workshop'
            ? t('hire.placeholders.workshopSelect')
            : t('hire.placeholders.showSelect')
        }}
      </span>
      <FormSelectDropdown
        class="mt-2"
        :selected-value="selectedKey || null"
        :selected-type="contractType"
        @select="setSelectedKey"
      />
      <div :class="fieldBorderClass" />
      <span :class="markerClass">*</span>
    </div>
    <FormInputs
      :full-name="fullName"
      :email="email"
      :label-container-class="labelContainerClass"
      :label-class="labelClass"
      :field-class="fieldClass"
      :field-border-class="fieldBorderClass"
      :marker-class="markerClass"
      @update:full-name="(value: string) => { fullName = value }"
      @update:email="(value: string) => { email = value }"
    />
    <FormTextArea
      :comments="comments"
      :label-container-class="labelContainerClass"
      :label-class="labelClass"
      :field-class="fieldClass"
      :field-border-class="fieldBorderClass"
      @update:comments="(value: string) => { comments = value }"
    />
    <FormButtons
      container-class="mt-2 flex items-center gap-4 self-start"
      :submit-button-class="submitButtonClass"
      :cancel-button-class="cancelButtonClass"
      @cancel="resetForm"
    />
    <FormFooter
      :circle-icon-class="circleIconClass"
      divider-class="mt-4 bg-neutral-100 h-0.5 rounded-full"
    />
  </form>
</template>
