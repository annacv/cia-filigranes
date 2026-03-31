<script setup lang="ts">
import { EVENT_TYPE_ITEMS } from '~/constants'
import type { HireProductKind } from '~/types'
import ContractFormDropdown from '~/components/hire/ContractFormDropdown.vue'

const props = withDefaults(
  defineProps<{
    variant: 'modal' | 'page'
    pageType?: 'default' | 'performances'
    /** When set (modal), list only this catalogue */
    productKind?: HireProductKind
    /** Default selected slug (modal); ignored in page variant */
    defaultProductKey?: string | null
    fieldColor?: string
  }>(),
  {
    pageType: 'default',
    productKind: undefined,
    defaultProductKey: null
  }
)

const { t } = useI18n()

const selectedKey = ref(
  props.variant === 'modal' && props.defaultProductKey ? props.defaultProductKey : ''
)
const selectedCategory = ref<'shows' | 'workshops' | 'performances'>('shows')
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
  () => props.pageType,
  (pageType) => {
    if (pageType === 'performances') {
      selectedCategory.value = 'performances'
      selectedKey.value = ''
    }
  },
  { immediate: true }
)

const contractType = computed<'shows' | 'workshops' | 'performances'>(() => {
  if (props.variant === 'modal') {
    return props.productKind === 'workshop' ? 'workshops' : 'shows'
  }
  if (props.pageType === 'performances') return 'performances'
  return selectedCategory.value
})

const labelClass = 'text-neutral-900'
const fieldClass =
  'w-full rounded-lg bg-white text-base !leading-tight text-neutral-900 placeholder:text-neutral-400 placeholder:italic outline-none focus:ring-1 focus:ring-neutral-400'
const fieldDividerClass = computed(() => ['h-[2px] w-full rounded-full', props.fieldColor])

const onSubmit = (e: Event) => {
  e.preventDefault()
  // Form fields will be wired in a follow-up step
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit="onSubmit">
    <template v-if="variant === 'modal'">
      <div class="flex flex-col gap-2 text-left">
        <span :class="labelClass">
          {{
            productKind === 'workshop'
              ? t('routes.tallers')
              : t('routes.espectacles')
          }}
        </span>
        <ContractFormDropdown
          :selected-value="selectedKey || null"
          :selected-type="contractType"
          @select="(value: string | null) => { selectedKey = value ?? '' }"
        />
        <div :class="fieldDividerClass" />
        <span class="text-xs leading-none text-neutral-900">*</span>
      </div>
      <label class="flex flex-col gap-2 text-left">
        <span :class="labelClass">{{ t('hire.fields.fullName') }}</span>
        <input
          v-model="fullName"
          type="text"
          name="name"
          autocomplete="name"
          :placeholder="t('hire.placeholders.fullName')"
          :class="fieldClass"
          required
        >
        <div :class="fieldDividerClass" />
        <span class="text-xs leading-none text-neutral-900">*</span>
      </label>
      <label class="flex flex-col gap-2 text-left">
        <span :class="labelClass">{{ t('hire.fields.email') }}</span>
        <input
          v-model="email"
          type="email"
          name="email"
          autocomplete="email"
          :placeholder="t('hire.placeholders.email')"
          :class="fieldClass"
          required
        >
        <div :class="fieldDividerClass" />
        <span class="text-xs leading-none text-neutral-900">*</span>
      </label>
      <label class="flex flex-col gap-2 text-left">
        <span :class="labelClass">{{ t('hire.fields.comments') }}</span>
        <textarea
          v-model="comments"
          name="message"
          rows="5"
          :placeholder="t('hire.placeholders.comments')"
          :class="fieldClass"
        />
        <div :class="fieldDividerClass" />
      </label>
    </template>

    <template v-else>
      <div class="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div class="flex flex-col gap-6">
          <label class="flex flex-col gap-2 text-left">
            <span :class="labelClass">{{ t('hire.fields.fullName') }}</span>
            <input
              v-model="fullName"
              type="text"
              name="full-name"
              autocomplete="name"
              :placeholder="t('hire.placeholders.fullName')"
              :class="fieldClass"
              required
            >
            <div :class="fieldDividerClass" />
            <span class="text-xs leading-none text-neutral-900">*</span>
          </label>
          <label class="flex flex-col gap-2 text-left">
            <span :class="labelClass">{{ t('hire.fields.email') }}</span>
            <input
              v-model="email"
              type="email"
              name="email"
              autocomplete="email"
              :placeholder="t('hire.placeholders.email')"
              :class="fieldClass"
              required
            >
            <div :class="fieldDividerClass" />
            <span class="text-xs leading-none text-neutral-900">*</span>
          </label>
          <div class="flex flex-col gap-2 text-left">
            <span v-if="pageType === 'performances'" :class="labelClass">{{ t('hire.fields.performanceSelectLabel') }}</span>
            <BaseTabs
              v-else
              v-model="selectedCategory"
              :options="pageTabOptions"
              text-class="!text-base"
              class="max-w-xs"
            />
            <ContractFormDropdown
              :key="`${pageType}-${selectedCategory}`"
              :selected-value="selectedKey || null"
              :selected-type="contractType"
              @select="(value: string | null) => { selectedKey = value ?? '' }"
            />
            <div :class="fieldDividerClass" />
          </div>
        </div>
        <div>
          <label class="flex flex-col gap-2 text-left">
            <span :class="labelClass">{{ t('hire.fields.comments') }}</span>
            <textarea
              v-model="comments"
              name="comments"
              rows="5"
              :placeholder="t('hire.placeholders.comments')"
              :class="fieldClass"
            />
            <div :class="fieldDividerClass" />
          </label>
        </div>
      </div>
    </template>

    <button
      type="submit"
      class="mt-2 self-start rounded-full border border-neutral-900 bg-neutral-900 px-6 py-3 font-bold text-white transition-colors hover:bg-neutral-800"
    >
      {{ t('hire.submit') }}
    </button>
  </form>
</template>
