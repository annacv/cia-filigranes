<script setup lang="ts">
import type { HireProductKind } from '~/types'

const props = defineProps<{
  isOpen: boolean
  productKind: HireProductKind
  productKey: string
}>()

const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()

const modalTitle = computed(() =>
  props.productKind === 'show' ? t('hire.modalTitleShow') : t('hire.modalTitleWorkshop')
)

const ariaLabel = computed(() => modalTitle.value)
</script>

<template>
  <BaseModal :is-open="isOpen" :aria-label="ariaLabel" @close="emit('close')">
    <div class="p-6 pt-14 lg:p-10 lg:pt-16">
      <h2 class="font-grotesk text-2xl uppercase lg:text-3xl mb-6 pr-8">
        {{ modalTitle }}
      </h2>
      <HireContractForm
        :key="`${productKey}-${isOpen}`"
        variant="modal"
        :product-kind="productKind"
        :default-product-key="productKey"
      />
    </div>
  </BaseModal>
</template>
