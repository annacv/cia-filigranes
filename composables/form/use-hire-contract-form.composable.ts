import { EVENT_TYPE_ITEMS } from '~/constants'
import type { ContentType, HireProductKind } from '~/types'
import type { Ref } from 'vue'
import type { HireFormSubmissionPayload } from '~/composables/form/use-form-submission.composable'
import { useFormSubmission } from '~/composables/form/use-form-submission.composable'

type HireContractType = 'shows' | 'workshops' | 'performances'

type UseHireContractFormOptions = {
  variant: 'modal' | 'page'
  pageType?: Ref<'default' | 'performances'>
  contentType?: Ref<ContentType | undefined>
  productKind?: Ref<HireProductKind | undefined>
  productKey?: Ref<string | null | undefined>
}

const emailLooksValid = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

export const useHireContractForm = (options: UseHireContractFormOptions) => {
  const { t, locale } = useI18n()
  const { status: submissionStatus, errorText: submissionErrorText, submit, resetStatus } = useFormSubmission()

  const getInitialSelectedKey = () => (
    options.variant === 'modal' && options.productKey?.value
      ? options.productKey.value
      : ''
  )
  const getInitialCategory = (): HireContractType => {
    const pageType = options.pageType?.value ?? 'default'
    if (pageType === 'performances') return 'performances'
    if (options.contentType?.value === 'workshops') return 'workshops'
    return 'shows'
  }

  const selectedKey = ref(getInitialSelectedKey())
  const selectedCategory = ref<HireContractType>(getInitialCategory())
  const fullName = ref('')
  const email = ref('')
  const comments = ref('')
  const honeypot = ref('')
  const fullNameInvalid = ref(false)
  const emailInvalid = ref(false)
  const fullNameTouched = ref(false)
  const emailTouched = ref(false)

  const pageTabOptions = computed(() => EVENT_TYPE_ITEMS.map(item => ({
    value: item.value,
    label: t(item.labelKey),
    activeIndicatorClass: item.activeIndicatorClass,
    inactiveIndicatorClass: item.inactiveIndicatorClass
  })))

  watch(selectedCategory, () => {
    selectedKey.value = ''
  })

  watch(
    () => [options.pageType?.value ?? 'default', options.contentType?.value] as const,
    () => {
      if (options.variant === 'modal') return
      selectedCategory.value = getInitialCategory()
      selectedKey.value = ''
    },
    { immediate: true },
  )

  const contractType = computed<HireContractType>(() => {
    if (options.variant === 'modal') {
      return options.productKind?.value === 'workshop' ? 'workshops' : 'shows'
    }
    if (options.pageType?.value === 'performances') return 'performances'
    return selectedCategory.value
  })

  const setSelectedKey = (value: string | null) => {
    selectedKey.value = value ?? ''
  }

  const resetForm = () => {
    selectedCategory.value = getInitialCategory()
    selectedKey.value = getInitialSelectedKey()
    fullName.value = ''
    email.value = ''
    comments.value = ''
    honeypot.value = ''
    fullNameInvalid.value = false
    emailInvalid.value = false
    fullNameTouched.value = false
    emailTouched.value = false
    resetStatus()
  }

  const validateFullName = () => {
    fullNameInvalid.value = !fullName.value.trim()
    return !fullNameInvalid.value
  }

  const onFullNameBlur = () => {
    fullNameTouched.value = true
    validateFullName()
  }

  const validateEmailFormat = () => {
    const hasValue = !!email.value.trim()
    if (!hasValue) {
      emailInvalid.value = true
      return false
    }
    const isValid = emailLooksValid(email.value)
    emailInvalid.value = !isValid
    return !emailInvalid.value
  }

  const onEmailBlur = () => {
    emailTouched.value = true
    validateEmailFormat()
  }

  watch(email, () => {
    if (emailTouched.value || emailInvalid.value) {
      validateEmailFormat()
    }
  })

  watch(fullName, () => {
    if (fullNameTouched.value || fullNameInvalid.value) {
      validateFullName()
    }
  })

  const onSubmit = async (e: Event) => {
    e.preventDefault()

    if (honeypot.value.trim()) return
    if (!validateFullName() || !validateEmailFormat()) return

    const payload: HireFormSubmissionPayload = {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      contractType: contractType.value,
      selectedKey: selectedKey.value.trim(),
      comments: comments.value.trim(),
      honeypot: honeypot.value,
      locale: typeof locale.value === 'string' ? locale.value : String(locale.value),
    }

    const ok = await submit(payload)
    if (ok) {
      fullName.value = ''
      email.value = ''
      comments.value = ''
      honeypot.value = ''
      selectedKey.value = getInitialSelectedKey()
    }
  }

  const isSubmitting = computed(() => submissionStatus.value === 'submitting')
  const fullNameErrorText = computed(() =>
    fullNameInvalid.value
      ? t('hire.submission.validationName')
      : ''
  )
  const emailErrorText = computed(() =>
    emailInvalid.value
      ? t('hire.submission.validationEmail')
      : ''
  )
  const feedbackText = computed(() => {
    if (submissionStatus.value === 'success') return t('hire.submission.success')
    return submissionErrorText.value
  })

  return {
    t,
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
    submissionErrorText,
    fullNameErrorText,
    emailErrorText,
    feedbackText,
    isSubmitting,
  }
}
