<script setup lang="ts">
import { computed } from 'vue'
import { useResponsive } from "~/composables/use-responsive.composable"
import { useCalendarEvents } from "~/composables/calendar/use-calendar-events.composable"
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from "~/constants"

definePageMeta({
  headerBackgroundColor: '#000'
})

const { t } = useI18n()
const { isMobile } = useResponsive()
const { events, pending, error } = useCalendarEvents()

useHead({
  meta: [
    { name: 'description', content: t('agenda.metaDescription') }
  ]
})

const headerHeight = computed(() => isMobile.value ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT)
</script>

<template>
  <div class="h-full bg-quaternary-500">
    <div :style="{ height: headerHeight }" />
    <MainContent>
      <template #wrapped>
        <section class="py-8 lg:py-16">
          <header class="mb-8 lg:mb-12">
            <h1 class="font-grotesk text-3xl lg:text-5xl font-bold text-gray-900">
              {{ t('agenda.title') }}
            </h1>
            <p class="mt-4 text-lg text-gray-600 max-w-2xl">
              {{ t('agenda.description') }}
            </p>
          </header>

          <CalendarEventList
            :events="events"
            :pending="pending"
            :error="error"
          />
        </section>
      </template>
      <template #unwrapped>
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
