<script setup lang="ts">
import { NuxtLinkLocale } from "#components";

const props = withDefaults(defineProps<{
  href?: string
  download?: string
  target?: string
  buttonClass?: string | object | unknown[]
  text: string,
  onClick?: (_event?: MouseEvent) => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  /** Associates a submit button with a form by id */
  form?: string
  ariaBusy?: boolean
}>(), {
  href: undefined,
  download: undefined,
  buttonClass: undefined,
  onClick: undefined,
  target: undefined,
  type: 'button',
  disabled: false,
  form: undefined,
  ariaBusy: false,
})

const { t } = useI18n()
const slots = useSlots()

const DOWNLOADABLE_EXTENSIONS = ['.pdf', '.zip'] as const
type DownloadableExtension = typeof DOWNLOADABLE_EXTENSIONS[number]

const paddingClass = computed(() => (slots.text ? 'px-3  py-2' : 'p-1 px-2 h-8 w-8'))
const downloadExtension = computed<DownloadableExtension | undefined>(() => {
  if (!props.download || !props.href) return undefined
  return DOWNLOADABLE_EXTENSIONS.find((ext) => props.href!.toLowerCase().includes(ext))
})
const isDownload = computed(() => !!downloadExtension.value)
const componentType = computed(() => (isDownload.value ? 'a' as const : !isDownload.value && props.href ? NuxtLinkLocale : 'button'))
const isNativeButton = computed(() => componentType.value === 'button')

const ariaLabel = computed(() => {
  if (downloadExtension.value === '.pdf') {
    return `${props.text} (${t('button.pdf')})`
  }
  if (downloadExtension.value === '.zip') {
    return `${props.text} (${t('button.zip')})`
  }
  return props.text
})

const buttonProps = computed(() =>
  isDownload.value
    ? {
      download: props.download,
      href: props.href,
      rel: props.target === '_blank' ? 'noopener noreferrer' : undefined,
      target: props.target || undefined
    }
    : !isDownload.value && props.href ?
      {
        to: props.href,
        target: props.target || undefined
      }
      : {}
)
</script>

<template>
  <component
    :is="componentType"
    :type="isNativeButton ? type : undefined"
    v-bind="buttonProps"
    class="flex items-center transition-colors rounded-full border font-bold leading-normal gap-2 w-max will-change-[background-color,color]"
    :class="[
      paddingClass,
      buttonClass,
      {'cursor-pointer': (!isNativeButton || !disabled)},
      {'cursor-not-allowed opacity-60': isNativeButton && disabled},
    ]"
    :aria-label="ariaLabel"
    :aria-busy="isNativeButton && ariaBusy ? true : undefined"
    :disabled="isNativeButton ? disabled : undefined"
    :form="isNativeButton && form ? form : undefined"
    @click="onClick"
  >
    <slot name="icon-left" />
    <slot name="text">
      {{ text }}
    </slot>
    <slot name="icon-right" />
  </component>
</template>
