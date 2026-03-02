<script setup lang="ts">
import type { CalendarEvent } from '~/types'
import CalendarEventCard from '~/components/CalendarEventCard.vue'

defineProps({
  events: {
    type: Array as PropType<CalendarEvent[]>,
    required: true
  },
  pending: {
    type: Boolean,
    default: false
  },
  error: {
    type: Object as PropType<Error | null>,
    default: null
  }
})

const { t } = useI18n()
</script>

<template>
  <div class="calendar-event-list">
    <!-- Loading state -->
    <div
      v-if="pending"
      class="flex flex-col items-center justify-center py-12 text-gray-500"
    >
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4" />
      <p class="text-lg">{{ t('agenda.loading') }}</p>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-12 text-gray-500"
    >
      <svg
        class="w-12 h-12 text-red-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p class="text-lg">{{ t('agenda.error') }}</p>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="events.length === 0"
      class="flex flex-col items-center justify-center py-12 text-gray-500"
    >
      <svg
        class="w-12 h-12 text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p class="text-lg">{{ t('agenda.empty') }}</p>
    </div>

    <!-- Events list -->
    <ul
      v-else
      class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    >
      <li
        v-for="event in events"
        :key="event.id"
      >
        <CalendarEventCard :event="event" />
      </li>
    </ul>
  </div>
</template>
