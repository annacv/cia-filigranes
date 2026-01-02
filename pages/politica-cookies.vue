<script setup lang="ts">
import ArrowRight from "assets/icons/arrow-right.svg";
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from "~/constants";

definePageMeta({
  headerBackgroundColor: '#c80d0d'
})

const { t } = useI18n()

useHead({
  title: `${t('cookies.title')} - Cia Filigranes`,
  meta: [
    { name: 'description', content: t('cookies.metaDescription') }
  ]
})

const { getTranslatedList } = useI18nUtils()
const { isMobile } = useResponsive()

const sections = getTranslatedList('cookies.sections', ['key', 'title', 'description']) as Array<Record<string, string>>
const cookieTypes = getTranslatedList('cookies.types.list', ['key', 'title', 'description']) as Array<Record<string, string>>
const tableHeaders = getTranslatedList('cookies.currentCookies.table.headers', ['key', 'label']) as Array<Record<string, string>>
const currentCookies = getTranslatedList('cookies.currentCookies.table.rows', ['name', 'purpose', 'responsible', 'duration']) as Array<Record<string, string>>
const browserLinks = getTranslatedList('cookies.disable.browsers', ['name', 'url']) as Array<Record<string, string>>

const getCookieValue = (cookie: Record<string, string>, key: string | undefined): string => {
  return key ? (cookie[key] ?? '') : ''
}
</script>

<template>
  <div class="h-full">
    <div :style="{ height: isMobile ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT }"/>
    <MainContent class="mb-20">
      <template #wrapped>
        <h1 class="text-3xl uppercase font-grotesk my-10">
          {{ $t('cookies.title') }}
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
              {{ $t('cookies.types.title') }}
            </h2>
            <ul class="list-disc list-inside text-neutral-600 space-y-4">
              <li
                v-for="type in cookieTypes"
                :key="type.key"
              >
                <strong>{{ type.title }}</strong>
                <p class="ml-4">{{ type.description }}</p>
              </li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-neutral-800 mb-4">
              {{ $t('cookies.currentCookies.title') }}
            </h2>
            <div class="overflow-x-auto">
              <table class="min-w-full border border-neutral-300">
                <thead class="bg-neutral-100">
                  <tr>
                    <th
                      v-for="header in tableHeaders"
                      :key="header.key"
                      class="border border-neutral-300 px-4 py-2 text-left font-semibold"
                    >
                      {{ header.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="cookie in currentCookies"
                    :key="cookie.name"
                  >
                    <td
                      v-for="header in tableHeaders"
                      :key="header.key"
                      class="border border-neutral-300 px-4 py-2"
                    >
                      {{ getCookieValue(cookie, header.key) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-neutral-600 mt-4 text-sm">
              {{ $t('cookies.currentCookies.table.note') }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-neutral-800 mb-4">
              {{ $t('cookies.selfHosted.title') }}
            </h2>
            <p class="text-neutral-600 mb-4">
              {{ $t('cookies.selfHosted.description') }}
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-neutral-800 mb-4">
              {{ $t('cookies.disable.title') }}
            </h2>
            <p class="text-neutral-600 mb-4">
              {{ $t('cookies.disable.description') }}
            </p>
            <ul class="list-disc list-inside text-neutral-600 space-y-2">
              <li
                v-for="browser in browserLinks"
                :key="browser.name"
              >
                <a
                  :href="browser.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-700 hover:text-primary-700 underline"
                >
                  <strong>{{ browser.name }}</strong>
                </a>
              </li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-neutral-800 mb-4">
              {{ $t('cookies.additional.title') }}
            </h2>
            <p class="text-neutral-600">
              {{ $t('cookies.additional.description') }}
            </p>
          </section>
        </div>
        <FiliButton
          href="/"
          button-class="button-outline-primary"
          target="_top"
          :text="t('button.goHome')"
        >
          <template #icon-left>
            <ArrowRight class="arrow-right self-start rotate-180"/>
          </template>
          <template #text>
            {{ t('button.goHome') }}
          </template>
        </FiliButton>
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
