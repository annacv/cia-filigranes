<script setup lang="ts">
import ArrowRight from 'assets/icons/arrow-right.svg'

withDefaults(
  defineProps<{
    submitButtonClass?: string
    cancelButtonClass?: string
    submitFormId?: string
    isSubmitting?: boolean
  }>(),
  {
    submitButtonClass: 'button-outline-primary bg-primary-500 hover:border-primary-500',
    cancelButtonClass: 'button-solid-primary',
    submitFormId: undefined,
    isSubmitting: false,
  }
)

const emit = defineEmits<{
  cancel: []
}>()

const { t } = useI18n()
</script>

<template>
  <div class="flex items-center gap-4 justify-end">
    <FiliButton
      type="button"
      :disabled="isSubmitting"
      :button-class="cancelButtonClass"
      :text="t('button.cancel')"
      :on-click="() => emit('cancel')"
    >
      <template #text>
        {{ t('button.cancel') }}
      </template>
    </FiliButton>
    <FiliButton
      type="submit"
      :form="submitFormId"
      :disabled="isSubmitting"
      :aria-busy="isSubmitting"
      :button-class="submitButtonClass"
      :text="isSubmitting ? t('hire.submission.sending') : t('button.submit')"
    >
      <template #text>
        {{ isSubmitting ? t('hire.submission.sending') : t('button.submit') }}
      </template>
      <template #icon-right>
        <ArrowRight class="arrow-right !mt-0" />
      </template>
    </FiliButton>
  </div>
</template>
