<script setup lang="ts">
import ArrowLeft from "assets/icons/arrow-left.svg";
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from "~/constants";

definePageMeta({
  headerBackgroundColor: '#c80d0d'
})

const { t } = useI18n()
const { getTranslatedList } = useI18nUtils()
const { isMobile } = useResponsive()

useHead({
  title: `${t('privacy.title')} - Cia Filigranes`,
  meta: [
    { name: 'description', content: t('privacy.metaDescription') }
  ]
})

const sections = getTranslatedList('privacy.sections', ['key', 'title', 'description']) as Array<Record<string, string>>
</script>

<template>
  <div class="h-full">
    <div :style="{ height: isMobile ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT }"/>
    <MainContent class="mb-20">
      <template #wrapped>
        <h1 class="text-3xl uppercase font-grotesk my-10">
          {{ t('privacy.title') }}
        </h1>
        <div class="prose prose-lg max-w-none">
          <section
            v-for="section in sections"
            :key="section.key"
            class="mb-8"
          >
            <h2 class="text-2xl font-semibold text-neutral-800 mb-4">
              {{ section.title }}
            </h2>
            <p class="text-neutral-600 mb-4">
              {{ section.description }}
            </p>
          </section>
        </div>
        <FiliButton
          href="/"
          button-class="button-outline-neutral"
          target="_top"
          :text="t('button.goHome')"
        >
          <template #icon-left>
            <ArrowLeft class="arrow-left"/>
          </template>
          <template #text>
            {{ t('button.goHome') }}
          </template>
        </FiliButton>
      </template>
    </MainContent>
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
