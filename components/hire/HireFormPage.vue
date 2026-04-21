<script setup lang="ts">
import type { ContentType } from '~/types'
import { useHireFormDisplay } from '~/composables/form/use-hire-form-display.composable'
import { useHireContractForm } from '~/composables/form/use-hire-contract-form.composable'

const props = withDefaults(
  defineProps<{
    pageType?: 'default' | 'performances'
    contentType?: ContentType
    showStatusCloseIcon?: boolean
  }>(),
  {
    pageType: 'default',
    contentType: undefined,
    showStatusCloseIcon: true,
  }
)

const { appearance, fieldClasses } = useHireFormDisplay({
  variant: 'page',
  contentType: toRef(props, 'contentType'),
  pageType: toRef(props, 'pageType')
})

const { t } = useI18n()

const {
  selectedKey,
  selectedCategory,
  fullName,
  email,
  comments,
  honeypot,
  pageTabOptions,
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
  variant: 'page',
  pageType: toRef(props, 'pageType'),
  contentType: toRef(props, 'contentType'),
})

/** Feedback overlay; cleared when the user dismisses the message (X or auto-dismiss). */
const statusVisible = ref(false)

watch(
  submissionStatus,
  (status) => {
    if (status === 'submitting' || status === 'success' || status === 'error') {
      statusVisible.value = true
      return
    }
    statusVisible.value = false
  },
  { immediate: true },
)

function closeStatusMessage() {
  statusVisible.value = false
  resetForm()
}

</script>

<template>
  <div
    class="relative flex min-h-[600px] md:min-h-[min(28rem,70vh)] flex-col"
  >
    <form
      class="relative z-10 flex min-h-0 flex-col gap-2"
      :class="statusVisible ? 'pointer-events-none select-none' : ''"
      @submit="onSubmit"
    >
      <FormHoneypot v-model="honeypot" />
      <fieldset
        class="min-w-0 border-0 p-0 m-0 flex flex-col gap-2"
        :disabled="isSubmitting"
      >
        <div class="grid gap-8 lg:gap-14 md:grid-cols-2 xl:gap-20">
          <div class="flex flex-col gap-6">
            <FormInputs
              :full-name="fullName"
              :email="email"
              variant="page"
              :full-name-error-text="fullNameErrorText"
              :email-error-text="emailErrorText"
              @update:full-name="(value: string) => { fullName = value }"
              @update:email="(value: string) => { email = value }"
              @blur:full-name="onFullNameBlur"
              @blur:email="onEmailBlur"
            />
            <div :class="[fieldClasses.labelContainerClass, 'group']">
              <span v-if="pageType === 'performances'" :class="fieldClasses.labelClass">{{ t('hire.fields.performanceSelectLabel') }}</span>
              <BaseTabs
                v-else
                v-model="selectedCategory"
                :options="pageTabOptions"
                :aria-label="t('hire.fields.productTabs')"
                text-class="!text-base !pb-0"
                class="max-w-xs mb-2"
              />
              <FormSelectDropdown
                :key="`${pageType}-${selectedCategory}`"
                :selected-value="selectedKey || null"
                :selected-type="contractType"
                variant="page"
                @select="setSelectedKey"
              />
            </div>
          </div>
          <FormTextArea
            :comments="comments"
            variant="page"
            :is-performances="pageType === 'performances'"
            @update:comments="(value: string) => { comments = value }"
          />
        </div>
        <FormButtons
          class="my-4"
          :submit-button-class="appearance.submitButtonClass"
          :cancel-button-class="appearance.cancelButtonClass"
          :is-submitting="isSubmitting"
          @cancel="resetForm"
        />
      </fieldset>
      <FormFooter />
    </form>
    <div
      v-if="statusVisible"
      class="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-white/85 p-4 sm:p-6"
    >
      <div class="pointer-events-auto w-full max-w-lg">
        <FormMessages
          visible
          :submission-status="submissionStatus"
          :feedback-text="feedbackText"
          variant="page"
          :show-status-close-icon="props.showStatusCloseIcon"
          @close="closeStatusMessage"
        />
      </div>
    </div>
  </div>
</template>
