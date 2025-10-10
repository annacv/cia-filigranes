<script setup lang="ts">
import ArrowRight from "assets/icons/arrow-right.svg";

definePageMeta({
  headerBackgroundColor: '#c80d0d'
})

const { t } = useI18n();
const isMobile = useDevice();
const { getTranslatedList } = useI18nUtils();

useHead({
  title: `${t('avis-legal.title')} - Cia Filigranes`,
  meta: [
    { name: 'description', content: t('avis-legal.metaDescription') }
  ]
})

const sections = getTranslatedList('avis-legal.sections', ['key', 'title', 'description'])
</script>

<template>
  <div class="h-full">
    <div :class="[isMobile ? 'h-[72px]' : 'h-[87px]', 'bg-primary-500']"></div>
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
                v-for="category in getTranslatedList('avis-legal.cookies.categories', ['key', 'title', 'description'])" 
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
          buttonClass="button-outline-primary"
          target="_top"
          :text="t('button.goHome')"
        >
          <template #text>
            {{ t('button.goHome') }}
          </template>
          <template #icon-left>
            <ArrowRight class="arrow-right self-start mt-0.5 rotate-180"/>
          </template>
        </FiliButton>
      </template>
    </MainContent>
  </div>
</template>
