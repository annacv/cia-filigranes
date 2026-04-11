<script setup lang="ts">
import type { ContentType } from '~/types'

const props = defineProps<{
  claimTitle?: string
  claimSubtitle?: string
  titleClass?: string
  pageType?: 'default' | 'performances'
  contentType?: ContentType
}>()

const { t } = useI18n()
const { isMobile } = useResponsive()

const claimTitle = computed(() => props.claimTitle ?? t('hire.pageSectionTitle'))
const claimSubtitle = computed(() => props.claimSubtitle ?? t('hire.pageSectionSubtitle'))
const pageType = computed(() => props.pageType ?? 'default')
</script>

<template>
  <section
    class="bg-neutral-0 text-neutral-900"
    :aria-label="t('hire.pageSectionTitle')"
  >
    <div class="flex flex-col gap-y-7 w-full">
      <ClaimTitle
        class="text-center !pb-0 !mb-0 !mt-0 md:!mt-6 xl:!mt-0"
        :claim-title="claimTitle"
        :subtitle="isMobile ? undefined : claimSubtitle"
        :title-class="titleClass"
        is-section-title
      />
      <HireFormPage
        class="py-6 md:py-8 px-4 xl:px-20"
        :page-type="pageType"
        :content-type="contentType"
      />
    </div>
  </section>
</template>
