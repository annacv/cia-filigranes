<script setup lang="ts">
import type { ContentType } from '~/types'
import type { CalendarEvent } from '~/types/agenda'
import CalendarEventCard from '~/components/agenda/CalendarEventCard.vue'
import BaseMessage from '~/components/BaseMessage.vue'
import BaseLoadingDots from '~/components/BaseLoadingDots.vue'
import ExclamationMark from '~/assets/icons/exclamation-mark.svg'
import CalendarIcon from '~/assets/icons/calendar.svg'
import ArrowRight from '~/assets/icons/arrow-right.svg'
import CalendarPagination from '~/components/agenda/CalendarPagination.vue'
import { useCalendarLayout } from '~/composables/calendar/use-calendar-layout.composable'
import CalendarEventLargeCard from './CalendarEventLargeCard.vue'

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
  },
  isDedicatedList: {
    type: Boolean,
    default: false
  },
  showViewAllLink: {
    type: Boolean,
    default: false
  },
  totalEvents: {
    type: Number,
    default: undefined
  }
})

const { t } = useI18n()
const { eventsPerPage, maxVisibleEvents } = useCalendarLayout()
const eventListRef = ref<HTMLElement | null>(null)
const currentPage = ref(1)

const emptyStateMessageKey = computed(() => {
  return props.hasActiveFilters ? 'agenda.emptyFiltered' : 'agenda.empty'
})

const emptyStateIconColorClass = computed(() => {
  if (props.selectedEventType === 'workshops') return 'text-secondary-300'
  if (props.selectedEventType === 'performances') return 'text-tertiary-300'
  return 'text-primary-300'
})

const renderLargeCard = computed(() => {
  return props.isDedicatedList && props.events.length < maxVisibleEvents.value
})

const footerTotalEvents = computed(() => {
  return props.totalEvents ?? props.events.length
})

const shouldPaginate = computed(() => {
  return props.events.length > eventsPerPage.value
})

const totalPages = computed(() => {
  return shouldPaginate.value ? Math.ceil(props.events.length / eventsPerPage.value) : 1
})

const paginatedEvents = computed(() => {
  if (!shouldPaginate.value) return props.events

  const startIndex = (currentPage.value - 1) * eventsPerPage.value
  return props.events.slice(startIndex, startIndex + eventsPerPage.value)
})

const showViewAllButton = computed(() => {
  return props.showViewAllLink && footerTotalEvents.value > maxVisibleEvents.value
})

const showFooter = computed(() => {
  return shouldPaginate.value || showViewAllButton.value
})

const eventSignature = computed(() => {
  return props.events.map((event) => event.id).join('|')
})

watch([eventSignature, eventsPerPage], () => {
  currentPage.value = 1
})

const goToPage = async (page: number) => {
  const nextPage = Math.min(Math.max(page, 1), totalPages.value)

  if (nextPage === currentPage.value) return

  currentPage.value = nextPage
  await nextTick()
  eventListRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div
    ref="eventListRef"
    class="scroll-mt-24"
  >
    <!-- Loading state -->
    <BaseMessage
      v-if="pending"
      :text="t('agenda.loading')"
      bg-class="bg-white"
    >
      <template #icon>
        <BaseLoadingDots />
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
    <template v-else>
      <TransitionGroup
        tag="ul"
        name="agenda-cards"
        appear
        :class="[
          'grid gap-y-2',
          renderLargeCard ? 'grid-cols-1' : 'gap-x-0.5 md:gap-x-1 grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4']"
      >
        <li
          v-for="event in paginatedEvents"
          :key="event.id"
          class="relative"
        >
          <CalendarEventLargeCard
            v-if="renderLargeCard"
            :event="event"
          />
          <CalendarEventCard
            v-else
            :event="event"
          />
        </li>
      </TransitionGroup>

      <div
        v-if="showFooter"
        class="mt-2 flex gap-2 items-center justify-between"
      >
        <CalendarPagination
          v-if="shouldPaginate"
          :current-page="currentPage"
          :total-pages="totalPages"
          @change="goToPage"
        />

        <FiliButton
          v-if="showViewAllButton"
          button-class="button-link-neutral ml-auto"
          :text="t('agenda.viewAllEvents')"
          href="/agenda"
          target="_top"
        >
          <template #text>
            {{ t('agenda.viewAllEvents') }}
          </template>
          <template #icon-right>
            <ArrowRight class="!mt-0"/>
          </template>
        </FiliButton>
      </div>
    </template>
  </div>
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
