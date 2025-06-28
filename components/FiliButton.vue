<script setup lang="ts">
import { NuxtLink } from "#components";
import { useSlots } from 'vue'

const props = withDefaults(defineProps<{
  href: string
  download?: string
  target?: string
  buttonClass?: string | object | any[]
  text: string,
  onClick?: (event?: MouseEvent) => void
}>(), {
  target: '_blank',
})

const slots = useSlots()

const hasTextSlot = computed(() => !!slots.text)
const paddingClass = computed(() => (hasTextSlot.value ? 'px-3  py-2' : 'p-1 px-2 h-8 w-8'))
const isDownload = computed(() => !!props.download && props.href?.includes('.pdf'))
const componentType = computed(() => (isDownload.value ? 'a' : NuxtLink))

const linkProps = computed(() =>
  isDownload.value
    ? {
      alt: props.text,
      download: props.download,
      href: props.href,
      rel: 'noopener noreferrer',
      target: props.target,
      title: props.text
    }
    : {
      alt: props.text,
      to: props.href,
      target: props.target,
      title: props.text
    }
)
</script>

<template>
  <component
    :is="componentType"
    :type="isDownload ? 'application/pdf' : 'text/html'"
    v-bind="linkProps"
    class="flex items-center transition-colors cursor-pointer rounded-full border bg-white font-bold leading-normal"
    :class="[paddingClass, buttonClass]"
    :title="text"
    role="button"
    @click="onClick"
  >
    <slot name="icon-left" />
    <slot name="text" />
    <slot name="icon-right" />
  </component>
</template>
