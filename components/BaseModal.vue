<script setup lang="ts">
import CrossIcon from "assets/icons/cross.svg";

const { t } = useI18n()

interface Props {
  isOpen: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnOverlay: true,
  closeOnEscape: true
})

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
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click="handleOverlayClick"
      >
        <div class="absolute inset-0 backdrop-saturate-150 bg-black/90" />
        <div
          class="relative w-full max-w-[90vw] md:max-w-[1280px] max-h-[90dvh] min-h-[400px] overflow-hidden bg-white rounded-lg shadow-2xl transform transition-all duration-300 ease-out"
          @click.stop
        >
          <button
            class="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:opacity-75 rounded-full flex items-center justify-center transition-colors duration-200"
            :aria-label="t('modal.close')"
            @click="closeModal"
          >
            <CrossIcon class="!w-5 !h-5 text-white !mb-0" />
          </button>
          
          <div class="overflow-auto max-h-[90dvh]">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
