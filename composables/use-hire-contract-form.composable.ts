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
  // Modal variant only: preselects the opened product in the dropdown.
  defaultProductKey?: Ref<string | null | undefined>
}

export const useHireContractForm = (options: UseHireContractFormOptions) => {
  const { t } = useI18n()

  const labelClass = `text-neutral-900 ${options.variant === 'modal' ? 'text-sm' : ''}`
  const labelContainerClass = 'flex flex-col gap-2 text-left'
  const markerClass = 'text-base !leading-none text-neutral-900'
  const fieldClass = `py-1 w-full rounded-lg bg-white text-base !leading-tight text-neutral-900 placeholder:text-neutral-400 placeholder:italic outline-none ${options.variant === 'modal' ? 'text-sm' : ''}`
  const fieldBorderClass = 'h-[2px] w-full rounded-full bg-neutral-400 transition-colors duration-150 group-focus-within:bg-neutral-900'

  const getInitialSelectedKey = () => (
    // In modal we can prefill selection from the triggering card.
    options.variant === 'modal' && options.defaultProductKey?.value
      ? options.defaultProductKey.value
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
    labelClass,
    labelContainerClass,
    fieldClass,
    fieldBorderClass,
    markerClass,
    setSelectedKey,
    resetForm,
    onSubmit
  }
}
