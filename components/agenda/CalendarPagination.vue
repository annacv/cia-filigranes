<script setup lang="ts">
import ArrowRight from '~/assets/icons/arrow-right.svg'
import ArrowLeft from '~/assets/icons/arrow-left.svg'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits<{
  change: [page: number]
}>()

const { t } = useI18n()

const pageNumbers = computed(() => {
  return Array.from({ length: props.totalPages }, (_, index) => index + 1)
})

const previousPage = computed(() => {
  return props.currentPage > 1
})

const nextPage = computed(() => {
  return props.currentPage < props.totalPages
})

const goToPage = (page: number) => {
  emit('change', page)
}
</script>

<template>
  <nav
    class="flex flex-wrap items-center gap-2 md:gap-4"
    :aria-label="t('agenda.pagination.navigationLabel')"
  >
    <FiliButton
      :text="t('agenda.pagination.previous')"
      :on-click="() => goToPage(currentPage - 1)"
      :disabled="!previousPage"
      button-class="button-calendar-go"
    >
      <template #icon-left>
        <ArrowLeft class="!mt-0"/>
      </template>
      <template #text>
        <span class="hidden md:flex">{{ t('agenda.pagination.previous') }}</span>
      </template>
    </FiliButton>

    <FiliButton
      v-for="pageNumber in pageNumbers"
      :key="pageNumber"
      :text="String(pageNumber)"
      :on-click="() => goToPage(pageNumber)"
      :aria-current="pageNumber === currentPage ? 'page' : undefined"
      :button-class="
        pageNumber === currentPage ? 'button-calendar-disabled' : 'button-calendar-active'"
    >
      <template #text>
        {{ pageNumber }}
      </template>
    </FiliButton>

    <FiliButton
      :text="t('agenda.pagination.next')"
      :on-click="() => goToPage(currentPage + 1)"
      :disabled="!nextPage"
      button-class="button-calendar-go"
    >
      <template #text>
        <span class="hidden md:flex">{{ t('agenda.pagination.next') }}</span>
      </template>
      <template #icon-right>
        <ArrowRight class="!mt-0"/>
      </template>
    </FiliButton>
  </nav>
</template>
