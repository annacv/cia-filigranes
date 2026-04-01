<script setup lang="ts">
import FormSelectDropdown from '~/components/hire/FormSelectDropdown.vue'
import FormInputs from '~/components/hire/FormInputs.vue'
import FormTextArea from '~/components/hire/FormTextArea.vue'
import FormButtons from '~/components/hire/FormButtons.vue'
import FormFooter from '~/components/hire/FormFooter.vue'

const props = withDefaults(
  defineProps<{
    pageType?: 'default' | 'performances'
    submitButtonClass?: string
    cancelButtonClass?: string
    circleIconClass?: string
  }>(),
  {
    pageType: 'default',
    submitButtonClass: 'button-outline-primary bg-primary-500 hover:border-primary-500',
    cancelButtonClass: 'button-solid-primary',
    circleIconClass: 'text-primary-500'
  }
)

const {
  t,
  selectedKey,
  selectedCategory,
  fullName,
  email,
  comments,
  pageTabOptions,
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
        <div :class="labelContainerClass">
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
      :submit-button-class="submitButtonClass"
      :cancel-button-class="cancelButtonClass"
      @cancel="resetForm"
    />
    <FormFooter :circle-icon-class="circleIconClass" />
  </form>
</template>
