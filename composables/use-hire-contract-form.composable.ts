import { EVENT_TYPE_ITEMS } from '~/constants'
import type { HireProductKind } from '~/types'
import type { Ref } from 'vue'

type HireContractType = 'shows' | 'workshops' | 'performances'

type UseHireContractFormOptions = {
  variant: 'modal' | 'page'
  // Page variant only: controls tabs behavior and performances-specific defaults.
  pageType?: Ref<'default' | 'performances'>
  // Modal variant only: fixes the product group shown in the dropdown.
  productKind?: Ref<HireProductKind | undefined>
  // Modal variant only: product slug from the card; preselects the dropdown.
  productKey?: Ref<string | null | undefined>
}

export const useHireContractForm = (options: UseHireContractFormOptions) => {
  const { t } = useI18n()

  const getInitialSelectedKey = () => (
    options.variant === 'modal' && options.productKey?.value
      ? options.productKey.value
      : ''
  )
  const getInitialCategory = (): HireContractType =>
    // Page variant may start in performances mode depending on the section config.
    options.pageType?.value === 'performances' ? 'performances' : 'shows'

  const selectedKey = ref(getInitialSelectedKey())
  const selectedCategory = ref<HireContractType>(getInitialCategory())
  const fullName = ref('')
  const email = ref('')
  const comments = ref('')

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
    // Page-only reactive behavior; modal does not provide/need pageType changes.
    options.pageType ?? ref('default'),
    (pageType) => {
      if (pageType === 'performances') {
        selectedCategory.value = 'performances'
        selectedKey.value = ''
      }
    },
    { immediate: true }
  )

  const contractType = computed<HireContractType>(() => {
    // Modal ignores tabs and is bound to the product kind that opened it.
    if (options.variant === 'modal') {
      return options.productKind?.value === 'workshop' ? 'workshops' : 'shows'
    }
    // Page uses either forced performances mode or current selected tab.
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
  }

  const onSubmit = (e: Event) => {
    e.preventDefault()
    // Form fields will be wired in a follow-up step
  }

  return {
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
  }
}
