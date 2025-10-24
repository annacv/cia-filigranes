<script setup lang="ts">
import { NuxtLink } from "#components";

const props = withDefaults(defineProps<{
  href?: string
  download?: string
  target?: string
  buttonClass?: string | object | unknown[]
  text: string,
  onClick?: (_event?: MouseEvent) => void
}>(), {
  href: undefined,
  download: undefined,
  buttonClass: undefined,
  onClick: undefined,
  target: '_blank',
})

const slots = useSlots()

const hasTextSlot = computed(() => !!slots.text)
const paddingClass = computed(() => (hasTextSlot.value ? 'px-3  py-2' : 'p-1 px-2 h-8 w-8'))
const isDownload = computed(() => !!props.download && props.href?.includes('.pdf'))
const componentType = computed(() => (isDownload.value ? 'a' as const : !isDownload.value && props.href ? NuxtLink : 'button'))

const buttonProps = computed(() =>
  isDownload.value
    ? {
      alt: props.text,
      download: props.download,
      href: props.href,
      rel: 'noopener noreferrer',
      target: props.target
    }
    : !isDownload.value && props.href ? 
      {
        alt: props.text,
        to: props.href,
        target: props.target
      }
      : {
        alt: props.text
      }
)
</script>

<template>
  <component
    :is="componentType"
    :type="isDownload ? 'application/pdf' : 'text/html'"
    v-bind="buttonProps"
    class="flex items-center transition-colors cursor-pointer rounded-full border bg-white font-bold leading-normal gap-2 w-max"
    :class="[paddingClass, buttonClass]"
    role="button"
    @click="onClick"
  >
    <slot name="icon-left" />
    <slot name="text">
      {{ text }}
    </slot>
    <slot name="icon-right" />
  </component>
</template>
