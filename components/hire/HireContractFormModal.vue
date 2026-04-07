<script setup lang="ts">
import type { ContentType, HireProductKind } from '~/types'
import { useHireFormDisplay } from '~/composables/form/use-hire-form-display.composable'
import { useHireContractForm } from '~/composables/form/use-hire-contract-form.composable'
import { CONTACT } from '~/constants'
import FormMessages from '~/components/hire/FormMessages.vue'
import FormSelectDropdown from '~/components/hire/FormSelectDropdown.vue'
import FormInputs from '~/components/hire/FormInputs.vue'
import FormTextArea from '~/components/hire/FormTextArea.vue'
import FormButtons from '~/components/hire/FormButtons.vue'
import FormFooter from '~/components/hire/FormFooter.vue'
import FormHoneypot from '~/components/hire/FormHoneypot.vue'

const props = withDefaults(
  defineProps<{
    productKind?: HireProductKind
    productKey: string
    contentType?: ContentType
    isOpen: boolean
    showStatusCloseIcon?: boolean
  }>(),
  {
    productKind: undefined,
    contentType: undefined,
    showStatusCloseIcon: true,
  },
)

const {
  appearance,
  labelClass,
  labelContainerClass,
} = useHireFormDisplay({
  variant: 'modal',
  contentType: toRef(props, 'contentType')
})

const emit = defineEmits<{
  close: []
}>()

const modalFormId = useId()

const {
  t,
  selectedKey,
  fullName,
  email,
  comments,
  honeypot,
  contractType,
  setSelectedKey,
  onFullNameBlur,
  onEmailBlur,
  resetForm,
  onSubmit,
  submissionStatus,
  fullNameErrorText,
  emailErrorText,
  feedbackText,
  isSubmitting,
} = useHireContractForm({
  variant: 'modal',
  productKind: toRef(props, 'productKind'),
  productKey: toRef(props, 'productKey')
})

const modalTitle = computed(() =>
  props.productKind === 'workshop'
    ? t('hire.modalTitleWorkshop')
    : t('hire.modalTitleShow'),
)

/** Form + title + footer; `false` while loading / success / error panel is shown. */
const showForm = ref(true)

const baseModalAttrs = computed(() => ({
  isOpen: props.isOpen,
  ariaLabel: modalTitle.value,
  title: showForm.value ? modalTitle.value : undefined,
}))

/** After success, keep the message visible briefly, then tell the parent to close the modal. */
const SUCCESS_MODAL_CLOSE_DELAY_MS = 2500

let successCloseTimer: ReturnType<typeof setTimeout> | undefined

function clearSuccessCloseTimer() {
  if (successCloseTimer) clearTimeout(successCloseTimer)
  successCloseTimer = undefined
}

watch(submissionStatus, (status) => {
  if (status === 'idle') {
    clearSuccessCloseTimer()
    showForm.value = true
    return
  }
  showForm.value = false
  if (status === 'success') {
    clearSuccessCloseTimer()
    successCloseTimer = setTimeout(() => {
      successCloseTimer = undefined
      emit('close')
    }, SUCCESS_MODAL_CLOSE_DELAY_MS)
  }
}, { immediate: true })

watch(
  () => props.isOpen,
  (open) => {
    if (open) resetForm()
    else clearSuccessCloseTimer()
  },
)

onBeforeUnmount(() => {
  clearSuccessCloseTimer()
})

function closeStatusMessage() {
  showForm.value = true
  resetForm()
}

</script>

<template>
  <BaseModal v-bind="baseModalAttrs" @close="emit('close')">
    <template #content>
      <template v-if="showForm">
        <i18n-t
          class="text-neutral-600 text-xs md:text-sm"
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
        <form
          :id="modalFormId"
          class="mt-10 grid md:grid-cols-2 gap-6 md:gap-10"
          @submit="onSubmit"
        >
          <FormHoneypot v-model="honeypot" />
          <fieldset
            class="min-w-0 border-0 p-0 m-0 md:col-span-2 grid md:grid-cols-2 gap-6 md:gap-10"
            :disabled="isSubmitting"
          >
            <div class="flex flex-col gap-6">
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
                  variant="modal"
                  required
                  @select="setSelectedKey"
                />
              </div>
              <FormInputs
                :full-name="fullName"
                :email="email"
                variant="modal"
                :full-name-error-text="fullNameErrorText"
                :email-error-text="emailErrorText"
                @update:full-name="(value: string) => { fullName = value }"
                @update:email="(value: string) => { email = value }"
                @blur:full-name="onFullNameBlur"
                @blur:email="onEmailBlur"
              />
            </div>
            <FormTextArea
              :comments="comments"
              variant="modal"
              @update:comments="(value: string) => { comments = value }"
            />
          </fieldset>
        </form>
      </template>
      <div v-else>
        <FormMessages
          visible
          :submission-status="submissionStatus"
          :feedback-text="feedbackText"
          variant="modal"
          :show-status-close-icon="props.showStatusCloseIcon"
          @close="closeStatusMessage"
        />
      </div>
    </template>
    <template v-if="showForm" #footer>
      <FormButtons
        class="mt-4 mb-2 !gap-3"
        :submit-form-id="modalFormId"
        :submit-button-class="`text-sm !py-1.5 !px-2 ${appearance.submitButtonClass}`"
        :cancel-button-class="`text-sm !py-1.5 !px-2 ${appearance.cancelButtonClass}`"
        :is-submitting="isSubmitting"
        @cancel="resetForm"
      />
      <FormFooter />
    </template>
  </BaseModal>
</template>
