<script setup lang="ts">
import CrossIcon from "assets/icons/cross.svg";

const { t } = useI18n()

interface Props {
  isOpen: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  ariaLabel: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  closeOnOverlay: true,
  closeOnEscape: true,
  title: undefined,
})

const slots = useSlots()

const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    closeModal()
  }
}

const handleOverlayClick = (event: MouseEvent) => {
  if (props.closeOnOverlay && event.target === event.currentTarget) {
    closeModal()
  }
}

onMounted(() => {
  if (props.isOpen) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'unset'
})

// Watch for modal open/close to manage body scroll
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'unset'
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
        class="fixed inset-0 z-100 flex items-center justify-center p-4"
        @click="handleOverlayClick"
      >
        <div class="absolute inset-0 backdrop-saturate-150 bg-black/90" />
        <div
          class="bg-white relative w-full h-fit max-w-[90vw] md:max-w-2xl max-h-[90dvh] min-h-[316px] overflow-hidden bg-white rounded-md shadow-2xl transform transition-all duration-300 ease-out flex flex-col"
          @click.stop
        >
          <header class="sticky top-0 z-10 pt-10 pb-6 px-6 md:px-10 2xl:pt-12">
            <h2
              v-if="title?.trim()"
              class="!leading-none font-sans font-semibold text-neutral-900 text-lg xl:text-xl pr-6 md:pr-10"
            >
              {{ title }}
            </h2>
            <button
              type="button"
              class="absolute top-2 right-2 md:top-5 md:right-5 z-10 w-8 h-8 hover:opacity-75 rounded-full flex items-center justify-center transition-colors duration-200"
              :aria-label="t('modal.close')"
              @click="closeModal"
            >
              <CrossIcon class="!w-5 !h-5 md:!w-7 md:!h-7 text-neutral-900 !mb-0" />
            </button>
          </header>

          <div class="overflow-y-scroll flex-1 px-6 md:px-10 2xl:px-10">
            <slot name="content" />
          </div>

          <footer
            v-if="Boolean(slots.footer)"
            class="flex flex-col gap-2 sticky bottom-0 z-10 bg-white border-t border-neutral-200 py-4 md:border-none md:pt-0 px-6 md:px-10"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
