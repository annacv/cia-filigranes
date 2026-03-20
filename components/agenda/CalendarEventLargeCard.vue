<script setup lang="ts">
import type { CalendarEvent } from '~/types'
import CalendarSchedule from '~/components/agenda/CalendarSchedule.vue'
import CardImage from '~/components/CardImage.vue'
import FiliButton from '~/components/FiliButton.vue'
import CircleIcon from '~/assets/icons/circle.svg'
import { useCalendarDisplay } from '~/composables/calendar/use-calendar-display.composable'

const props = defineProps({
  event: {
    type: Object as PropType<CalendarEvent>,
    required: true
  }
})

const { isMobile, isSmallTablet } = useResponsive()
const event = computed(() => props.event)
const {
  footerColor,
  formatEventTime,
  imageAlt,
  mainColor,
  reservationLabel,
} = useCalendarDisplay(event)
const scheduleSize = computed(() => (isMobile.value && !isSmallTablet.value ? 'small' : 'medium'))
</script>

<template>
  <article class="relative flex h-full w-full overflow-hidden">
    <div
      v-if="event.image"
      class="relative w-[30%] shrink-0"
    >
      <CardImage
        :image="event.image"
        :content-type="event.eventType"
        :image-alt="imageAlt"
        class="!aspect-[420/420]"
      />
      <FiliButton
        v-if="event.reservationLink"
        :href="event.reservationLink"
        target="_blank"
        :text="reservationLabel"
        button-class="button-solid-neutral text-[10px] md:text-xs !px-2"
        class="absolute bottom-2 right-2 z-10"
      >
        <template #text>
          {{ reservationLabel }}
        </template>
      </FiliButton>
    </div>

    <div class="flex min-w-0 flex-1 flex-col">
      <div :class="`flex flex-1 flex-col justify-center gap-4 py-6 px-4 md:px-6 2xl:px-12 ${mainColor}`">
        <h3 class="font-grotesk text-4xl font-bold uppercase text-white !leading-none">
          {{ event.title }}
        </h3>

        <CalendarSchedule class="w-fit" :date="event.start" :size="scheduleSize" />

        <div class="flex flex-col gap-1">
          <time
            v-if="!event.isAllDay"
            class="font-alternative text-xl font-extrabold text-white !leading-tight"
            :datetime="event.start"
          >
            {{ formatEventTime(event.start) }}
          </time>
          <a
            v-if="event.location"
            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`"
            target="_blank"
            rel="noopener noreferrer"
            class="line-clamp-2 text-sm text-white !leading-tight no-underline underline-offset-2 hover:opacity-90 hover:underline"
          >
            {{ event.location }}
          </a>
        </div>
      </div>

      <footer :class="`flex h-[22px] items-center gap-2 px-2 py-0.5 sm:px-4 md:px-6 2xl:px-12 md:h-[26px] md:py-1 ${footerColor}`">
        <CircleIcon
          v-if="event.description"
          class="!h-3 !w-3 flex-shrink-0 text-white"
          aria-hidden="true"
        />
        <p
          v-if="event.description"
          class="mb-0.5 text-xs font-medium text-white"
        >
          <span class="line-clamp-1">{{ event.description }}</span>
        </p>
      </footer>
    </div>
  </article>
</template>
