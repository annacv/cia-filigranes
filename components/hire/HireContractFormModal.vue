<script setup lang="ts">
import type { ContentType, HireProductKind } from '~/types'
import { useHireFormDisplay } from '~/composables/use-hire-form-display.composable'
import { CONTACT } from "~/constants";
import FormSelectDropdown from '~/components/hire/FormSelectDropdown.vue'
import FormInputs from '~/components/hire/FormInputs.vue'
import FormTextArea from '~/components/hire/FormTextArea.vue'
import FormButtons from '~/components/hire/FormButtons.vue'
import FormFooter from '~/components/hire/FormFooter.vue'

const props = withDefaults(
  defineProps<{
    productKind?: HireProductKind
    productKey: string
    contentType?: ContentType
    isOpen: boolean
  }>(),
  {
    productKind: undefined,
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
  variant: 'modal',
  contentType: toRef(props, 'contentType')
})

const emit = defineEmits<{
  close: []
}>()

const {
  t,
  selectedKey,
  fullName,
  email,
  comments,
  contractType,
  setSelectedKey,
  resetForm,
  onSubmit
} = useHireContractForm({
  variant: 'modal',
  productKind: toRef(props, 'productKind'),
  productKey: toRef(props, 'productKey')
})

watch(
  () => props.isOpen,
  (open) => {
    if (open) resetForm()
  }
)

const modalTitle = computed(() =>
  props.productKind === 'show' ? t('hire.modalTitleShow') : t('hire.modalTitleWorkshop')
)

const ariaLabel = computed(() => modalTitle.value)
</script>

<template>
  <BaseModal :is-open="isOpen" :ariaLabel="ariaLabel" :title="modalTitle" @close="emit('close')">
    <template #content>
      <i18n-t
        class="text-neutral-900 text-xs md:text-sm"
        tag="p"
        scope="global"
        keypath="hire.modalDescription"
      >
        <template #email>
          <a
            class="font-semibold hover:opacity-80"
            :href="`mailto:${CONTACT.email}`"
          >
            {{ CONTACT.email }}
          </a>
        </template>
        <template #phone>
          <a
            class="font-semibold hover:opacity-80 whitespace-nowrap"
            :href="`tel:${CONTACT.phones.albert}`"
          >
            {{ CONTACT.phones.albert }}
          </a>
        </template>
      </i18n-t>
      <h3 class="!leading-none text-neutral-900 text-base font-bold pt-8 pb-6">
        {{ t('hire.modalFormTitle') }}
      </h3>
      <form class="grid md:grid-cols-2 gap-6 md:gap-10" @submit="onSubmit">
        <div class="flex flex-col">
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
        </div>
        <FormTextArea
          :comments="comments"
          :label-container-class="labelContainerClass"
          :label-class="labelClass"
          :field-class="fieldClass"
          :field-border-class="fieldBorderClass"
          @update:comments="(value: string) => { comments = value }"
        />
      </form>
    </template>
    <template #footer>
      <FormButtons
        class="mt-4 mb-2 !gap-3"
        :submit-button-class="`text-sm !py-1.5 !px-2 ${appearance.submitButtonClass}`"
        :cancel-button-class="`text-sm !py-1.5 !px-2 ${appearance.cancelButtonClass}`"
        @cancel="resetForm"
      />
      <FormFooter :circle-icon-class="appearance.circleIconClass" />
    </template>
</BaseModal>
</template>
