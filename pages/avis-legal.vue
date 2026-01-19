<script setup lang="ts">
import ArrowLeft from "assets/icons/arrow-left.svg";
import { useResponsive } from "~/composables/use-responsive.composable";
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from "~/constants";

definePageMeta({
  headerBackgroundColor: '#c80d0d'
})

const { t } = useI18n();
const { isMobile } = useResponsive();
const { getTranslatedList } = useI18nUtils();

useHead({
  title: `${t('avis-legal.title')} - Cia Filigranes`,
  meta: [
    { name: 'description', content: t('avis-legal.metaDescription') }
  ]
})

const sections = getTranslatedList('avis-legal.sections', ['key', 'title', 'description']) as Array<{ key: string; title: string; description: string }>
</script>

<template>
  <div class="h-full">
    <div :style="{ height: isMobile ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT }" class="bg-primary-500"/>
    <MainContent class="mb-20">
      <template #wrapped>
        <h1 class="text-3xl uppercase font-grotesk my-10">
          {{ t('avis-legal.title') }}
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

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-neutral-800 mb-4">
              {{ t('avis-legal.cookies.title') }}
            </h2>
            <p class="text-neutral-600 mb-4">
              {{ t('avis-legal.cookies.description') }}
            </p>
            
            <ul class="list-disc list-inside text-neutral-600 space-y-4">
              <li
                v-for="category in (getTranslatedList('avis-legal.cookies.categories', ['key', 'title', 'description']) as Array<{ key: string; title: string; description: string }>)" 
                :key="category.key"
              >
                <strong>{{ category.title }}</strong>
                <p class="ml-4">{{ category.description }}</p>
              </li>
            </ul>
          </section>
        </div>
        
        <FiliButton
          href="/"
          button-class="button-outline-neutral"
          target="_top"
          :text="t('button.goHome')"
        >
          <template #text>
            {{ t('button.goHome') }}
          </template>
          <template #icon-left>
            <ArrowLeft class="arrow-left"/>
          </template>
        </FiliButton>
      </template>
    </MainContent>
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
