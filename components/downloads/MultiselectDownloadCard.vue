<script setup lang="ts">
import ArrowDown from '~/assets/icons/arrow-down.svg'
import type { MultiselectContentType, SpecificActionId } from '~/types/downloads'

const props = defineProps<{
  title: string
  contentType: MultiselectContentType
  options: Array<{ value: string; labelKey: string }>
  i18nPrefix: string
  busy?: boolean
  disabled?: boolean
}>()

const selection = defineModel<string[]>({ default: () => [] })

const emit = defineEmits<{
  download: [action: SpecificActionId]
}>()

const { t } = useI18n()

const showSelectionHint = ref(false)
let selectionHintTimeout: ReturnType<typeof setTimeout> | undefined

const buttonClass = computed(() =>
  props.contentType === 'workshops'
    ? 'button-outline-secondary flex-1 justify-center'
    : 'button-outline-primary flex-1 justify-center'
)
const selectionHintText = computed(() => t(`${props.i18nPrefix}.selectionHint`))
const dossierLabel = computed(() => {
  const pluralizationChoice = selection.value.length > 1 ? 2 : 1
  return t('button.dossierSelection', pluralizationChoice)
})

function triggerSelectionHint() {
  showSelectionHint.value = true
  if (selectionHintTimeout) {
    clearTimeout(selectionHintTimeout)
  }
  selectionHintTimeout = setTimeout(() => {
    showSelectionHint.value = false
    selectionHintTimeout = undefined
  }, 1000)
}

function onDownload(action: SpecificActionId) {
  if (props.disabled) {
    triggerSelectionHint()
    return
  }
  emit('download', action)
}

onBeforeUnmount(() => {
  if (selectionHintTimeout) {
    clearTimeout(selectionHintTimeout)
  }
})
</script>

<template>
  <article class="h-full flex flex-col gap-4 items-start border border-white p-6 md:px-4 lg:px-3.5 xl:px-5 2xl:px-6 text-white md:max-h-[277px]">
    <h3 class="mx-auto text-center text-xl font-semibold mb-4">
      {{ title }}
    </h3>
    <div class="h-full w-full">
      <FormMultiselectDropdown
        v-model="selection"
        :options="options"
        :content-type="contentType"
        :label-key="`${i18nPrefix}.selectLabel`"
        :select-all-label-key="`${i18nPrefix}.optionAll`"
      />
    </div>
    <div class="relative">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showSelectionHint"
          class="absolute left-1/2 bottom-full z-10 mb-2 w-60 -translate-x-1/2 rounded-md bg-white p-7 text-center text-sm text-neutral-900 shadow-sm"
          role="status"
          aria-live="polite"
        >
          {{ selectionHintText }}
        </div>
      </Transition>
      <div class="mt-7 grid w-full grid-cols-2 gap-2">
        <FiliButton
          type="button"
          :button-class="buttonClass"
          :text="dossierLabel"
          :aria-busy="busy"
          :on-click="() => onDownload('dossier')"
        >
          <template #text>
            {{ dossierLabel }}
          </template>
          <template #icon-right>
            <ArrowDown class="h-4 w-4 shrink-0 !mt-0" aria-hidden="true" />
          </template>
        </FiliButton>
        <FiliButton
          type="button"
          :button-class="buttonClass"
          :text="t('button.images')"
          :aria-busy="busy"
          :on-click="() => onDownload('images')"
        >
          <template #text>
            {{ t('button.images') }}
          </template>
          <template #icon-right>
            <ArrowDown class="h-4 w-4 shrink-0 !mt-0" aria-hidden="true" />
          </template>
        </FiliButton>
      </div>
    </div>
  </article>
</template>
