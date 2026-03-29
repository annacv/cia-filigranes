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
  displayTitle,
  footerColor,
  formatEventTime,
  imageAlt,
  mainColor,
  reservationLabel,
} = useCalendarDisplay(event)

const scheduleSize = computed(() => (isMobile.value && !isSmallTablet.value ? 'medium' : 'large'))
</script>

<template>
  <article class="relative flex h-full w-full flex-col">
    <div v-if="event.image" class="relative w-full">
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
    <header :class="`absolute top-2 md:top-4 left-1.5 sm:left-2 md:left-4 mr-1.5 sm:mr-2 md:mr-4 ${mainColor}`">
      <h3 class="[word-spacing:-6%] sm:[word-spacing:0%] uppercase text-base sm:text-lg md:text-xl font-grotesk font-bold text-white !leading-none p-1 md:p-2">
        {{ displayTitle }}
      </h3>
    </header>

    <div :class="`flex flex-1 flex-col gap-4 p-2 sm:p-5 md:flex-row md:items-center ${mainColor}`">
      <CalendarSchedule :date="event.start" :size="scheduleSize" />
      <div class="flex w-full flex-1 flex-col md:justify-center gap-1">
        <time
          v-if="!event.isAllDay"
          :class="`text-white ${scheduleSize === 'large' ? 'text-4xl' : 'text-xl !leading-tight'} font-extrabold font-alternative`"
          :datetime="event.start"
        >
          {{ formatEventTime(event.start) }}
        </time>
        <a
          v-if="event.location"
          :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`"
          target="_blank"
          rel="noopener noreferrer"
          :class="`text-white !leading-tight no-underline hover:underline underline-offset-2 hover:opacity-90 ${scheduleSize === 'large' ? 'text-base line-clamp-4' : 'text-sm line-clamp-2'}`"
        >
          {{ event.location }}
        </a>
      </div>
    </div>
    <footer :class="`flex gap-2 px-2 sm:px-5 py-0.5 md:py-1 items-center ${footerColor} h-[22px] md:h-[26px]`">
      <CircleIcon
        v-if="event.description"
        class="flex-shrink-0 text-white !w-3 !h-3"
        aria-hidden="true"
      />
      <p v-if="event.description" class="text-xs mb-0.5 text-white font-medium">
        <span :class="{ 'line-clamp-1': scheduleSize !== 'large' }">{{ event.description }}</span>
      </p>
    </footer>
  </article>
</template>
