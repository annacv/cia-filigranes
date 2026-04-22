<script setup lang="ts">
import CrossIcon from 'assets/icons/cross.svg'

const DEFAULT_AUTO_CLOSE_MS = 20000
const DEFAULT_AUTO_CLOSE_MS_SHORT = 16000

const props = withDefaults(
  defineProps<{
    text: string
    bgClass?: string
    icon?: object | string
    iconClass?: string
    dismissible?: boolean
    hideCloseButton?: boolean
    closeAriaLabel?: string
  }>(),
  {
    bgClass: 'bg-neutral-100',
    dismissible: false,
    hideCloseButton: false,
    closeAriaLabel: 'Close',
  },
)

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(true)
let closeTimer: ReturnType<typeof setTimeout> | undefined

function clearCloseTimer() {
  if (closeTimer) clearTimeout(closeTimer)
}

function getAutoCloseDelay() {
  if (props.dismissible && props.hideCloseButton) {
    return DEFAULT_AUTO_CLOSE_MS_SHORT
  }
  return DEFAULT_AUTO_CLOSE_MS
}

function closeMessage() {
  if (!isVisible.value) return
  clearCloseTimer()
  isVisible.value = false
  emit('close')
}

watch(
  () => [props.text, props.dismissible, props.hideCloseButton],
  () => {
    clearCloseTimer()
    isVisible.value = true
    if (props.dismissible) {
      closeTimer = setTimeout(() => {
        closeMessage()
      }, getAutoCloseDelay())
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  clearCloseTimer()
})
</script>

<template>
  <div v-if="isVisible" class="relative">
    <div :class="`flex flex-col items-center justify-center text-neutral-600 py-8 px-4 md:py-12 md:px-6 mb-2 md:mb-14 ${bgClass}`">
      <slot name="icon">
        <Component
          :is="icon"
          v-if="typeof icon === 'object'"
          :class="`!w-7 !h-7 md:!w-9 md:!h-9 text-primary-300 !fill-none ${iconClass}`"
        />
        <img
          v-else-if="typeof icon === 'string'"
          :src="icon"
          :class="`!w-7 !h-7 md:!w-9 md:!h-9 text-primary-300 !fill-none ${iconClass}`"
          alt=""
        >
      </slot>
      <p class="text-xl !leading-normal max-w-md text-center p-4 md:p-7">{{ text }}</p>
    </div>
    <button
      v-if="dismissible && !hideCloseButton"
      type="button"
      class="absolute top-4 right-4 z-10 w-8 h-8 hover:opacity-75 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
      :aria-label="closeAriaLabel"
      @click="closeMessage"
    >
      <CrossIcon class="!w-7 !h-7 text-neutral-900 !mb-0" />
    </button>
  </div>
</template>