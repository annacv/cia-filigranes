<script setup lang="ts">
const props = defineProps<{
  claimTitle?: string
  claimSubtitle?: string
  titleClass?: string
  fieldColor?: string
  pageType?: 'default' | 'performances'
}>()

const { t } = useI18n()

const claimTitle = computed(() => props.claimTitle ?? t('hire.pageSectionTitle'))
const claimSubtitle = computed(() => props.claimSubtitle ?? t('hire.pageSectionSubtitle'))
const fieldColor = computed(() => props.fieldColor ?? 'bg-neutral-400')
const pageType = computed(() => props.pageType ?? 'default')
</script>

<template>
  <section
    class="bg-neutral-0 text-neutral-900"
    :aria-label="t('hire.pageSectionTitle')"
  >
    <div class="flex flex-col gap-y-7 w-full">
      <ClaimTitle
        class="text-center !pb-0 !mb-0 !mt-0 md:!mt-6 xl:!mt-0 xl:!-mb-5"
        :claim-title="claimTitle"
        :subtitle="claimSubtitle"
        :title-class="titleClass"
        is-section-title
      />
      <HireContractForm
        variant="page"
        class="py-8 px-9"
        :page-type="pageType"
        :field-color="fieldColor"
      />
    </div>
  </section>
</template>
