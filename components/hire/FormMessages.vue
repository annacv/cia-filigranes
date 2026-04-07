<script setup lang="ts">
import type { FormSubmissionStatus } from '~/composables/form/use-form-submission.composable'
import BaseMessage from '~/components/BaseMessage.vue'
import ExclamationMark from '~/assets/icons/exclamation-mark.svg'
import SuccessMark from '~/assets/icons/success-mark.svg'
import BaseLoadingDots from '~/components/BaseLoadingDots.vue'

const props = withDefaults(
  defineProps<{
    visible: boolean
    submissionStatus: FormSubmissionStatus
    feedbackText: string
    variant: 'modal' | 'page'
    showStatusCloseIcon?: boolean
  }>(),
  { showStatusCloseIcon: true },
)

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

const showLoadingState = computed(() => props.submissionStatus === 'submitting')

const messageText = computed(() =>
  showLoadingState.value ? '' : props.feedbackText,
)

const bgClass = computed(() => {
  if (showLoadingState.value) return 'bg-white rounded-sm'
  if (props.submissionStatus === 'success') {
    return 'bg-green-50 rounded-sm border border-green-200 shadow-sm'
  }
  return 'bg-red-50 rounded-sm border border-red-200 shadow-sm'
})

const icon = computed(() => {
  if (showLoadingState.value) return undefined
  if (props.submissionStatus === 'error') return ExclamationMark
  if (props.submissionStatus === 'success') return SuccessMark
  return undefined
})

const iconClass = computed(() => {
  if (showLoadingState.value) return undefined
  if (props.submissionStatus === 'error') return 'text-red-500'
  if (props.submissionStatus === 'success') return '!text-green-600'
  return undefined
})

const dismissible = computed(
  () =>
    props.variant !== 'modal' &&
    !showLoadingState.value &&
    props.showStatusCloseIcon,
)
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-400 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-400 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="visible" class="relative w-full">
      <BaseMessage
        :text="messageText"
        :bg-class="bgClass"
        :icon="icon"
        :icon-class="iconClass"
        :hide-close-button="variant === 'modal'"
        :dismissible="dismissible"
        :close-aria-label="t('button.close')"
        @close="emit('close')"
      >
        <template v-if="showLoadingState" #icon>
          <BaseLoadingDots :aria-describedby="t('hire.submission.sending')" />
        </template>
      </BaseMessage>
    </div>
  </Transition>
</template>
