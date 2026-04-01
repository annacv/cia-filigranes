<script setup lang="ts">
import type { ContentType } from '~/types'
import { useHireFormDisplay } from '~/composables/use-hire-form-display.composable'
import FormSelectDropdown from '~/components/hire/FormSelectDropdown.vue'
import FormInputs from '~/components/hire/FormInputs.vue'
import FormTextArea from '~/components/hire/FormTextArea.vue'
import FormButtons from '~/components/hire/FormButtons.vue'
import FormFooter from '~/components/hire/FormFooter.vue'

const props = withDefaults(
  defineProps<{
    pageType?: 'default' | 'performances'
    /** When set, drives button/footer colors. Falls back to `pageType === 'performances'` → performances palette. */
    contentType?: ContentType
  }>(),
  {
    pageType: 'default',
    contentType: undefined
  }
)

const {
  appearance,
  labelClass,
  labelContainerClass,
  fieldClass,
  fieldBorderClass,
  markerClass
} = useHireFormDisplay({
  variant: 'page',
  contentType: toRef(props, 'contentType'),
  pageType: toRef(props, 'pageType')
})

const {
  t,
  selectedKey,
  selectedCategory,
  fullName,
  email,
  comments,
  pageTabOptions,
  contractType,
  setSelectedKey,
  resetForm,
  onSubmit
} = useHireContractForm({
  variant: 'page',
  pageType: toRef(props, 'pageType')
})
</script>

<template>
  <form class="flex flex-col gap-2" @submit="onSubmit">
    <div class="grid gap-8 md:grid-cols-2 md:gap-20">
      <div class="flex flex-col gap-6">
        <FormInputs
          :full-name="fullName"
          :email="email"
          :label-container-class="labelContainerClass"
          :marker-class="markerClass"
          :label-class="labelClass"
          :field-class="fieldClass"
          :field-border-class="fieldBorderClass"
          @update:full-name="(value: string) => { fullName = value }"
          @update:email="(value: string) => { email = value }"
        />
        <div :class="[labelContainerClass, 'group']">
          <span v-if="pageType === 'performances'" :class="labelClass">{{ t('hire.fields.performanceSelectLabel') }}</span>
          <BaseTabs
            v-else
            v-model="selectedCategory"
            :options="pageTabOptions"
            text-class="!text-base !pb-0"
            class="max-w-xs mb-2"
          />
          <FormSelectDropdown
            :key="`${pageType}-${selectedCategory}`"
            :selected-value="selectedKey || null"
            :selected-type="contractType"
            @select="setSelectedKey"
          />
          <div :class="fieldBorderClass" />
        </div>
      </div>
      <FormTextArea
        :comments="comments"
        :label-container-class="labelContainerClass"
        :label-class="labelClass"
        :field-class="fieldClass"
        :field-border-class="fieldBorderClass"
        @update:comments="(value: string) => { comments = value }"
      />
    </div>
    <FormButtons
      class="mb-10"
      :submit-button-class="appearance.submitButtonClass"
      :cancel-button-class="appearance.cancelButtonClass"
      @cancel="resetForm"
    />
    <FormFooter :circle-icon-class="appearance.circleIconClass" />
  </form>
</template>
