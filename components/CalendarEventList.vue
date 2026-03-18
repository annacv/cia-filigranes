<script setup lang="ts">
import type { CalendarEvent, ContentType } from '~/types'
import CalendarEventCard from '~/components/CalendarEventCard.vue'
import BaseMessage from '~/components/BaseMessage.vue'
import ExclamationMark from '~/assets/icons/exclamation-mark.svg'
import CalendarIcon from '~/assets/icons/calendar.svg'
import CircleIcon from '~/assets/icons/circle.svg'

const props = defineProps({
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
  },
  selectedEventType: {
    type: String as PropType<ContentType | null>,
    default: null
  },
  hasActiveFilters: {
    type: Boolean,
    default: false
  }
})

const { t } = useI18n()

const emptyStateMessageKey = computed(() => {
  return props.hasActiveFilters ? 'agenda.emptyFiltered' : 'agenda.empty'
})

const emptyStateIconColorClass = computed(() => {
  switch (props.selectedEventType) {
    case 'workshops':
      return 'text-secondary-300'
    case 'performances':
      return 'text-tertiary-300'
    case 'shows':
      return 'text-primary-300'
    default:
      return 'text-primary-300'
  }
})
</script>

<template>
  <!-- Loading state -->
  <BaseMessage
    v-if="pending"
    :text="t('agenda.loading')"
    bgClass="bg-white"
  >
  <template #icon>
      <CircleIcon class="animate-spin !w-9 !h-9 text-primary-400"/>
      <CircleIcon class="animate-spin !w-12 !h-12 text-primary-400"/>
      <CircleIcon class="animate-spin !w-16 !h-9 text-primary-400"/>
  </template>
  </BaseMessage>

  <!-- Error state -->
  <BaseMessage
    v-else-if="error"
    :text="t('agenda.error')"
    :icon="ExclamationMark"
  />

  <!-- Empty state -->
  <BaseMessage
    v-else-if="events.length === 0"
    :text="t(emptyStateMessageKey)"
    :icon="CalendarIcon"
    :icon-class="`mb-4 ${emptyStateIconColorClass}`"
  />

  <!-- Events list -->
  <TransitionGroup
    tag="ul"
    name="agenda-cards"
    appear
    v-else
    class="grid gap-x-1 gap-y-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4"
  >
    <li
      v-for="event in events"
      :key="event.id"
      class="relative"
    >
      <CalendarEventCard :event="event" />
    </li>
  </TransitionGroup>
</template>

<style scoped>
.agenda-cards-enter-active,
.agenda-cards-leave-active {
  transition: opacity 480ms ease, transform 480ms ease;
}

.agenda-cards-enter-from,
.agenda-cards-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.985);
}

.agenda-cards-move {
  transition: transform 480ms ease;
}

.agenda-cards-leave-active {
  position: absolute;
}
</style>
