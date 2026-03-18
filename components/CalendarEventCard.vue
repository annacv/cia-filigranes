<script setup lang="ts">
import type { CalendarEvent } from '~/types'
import CalendarSchedule from '~/components/CalendarSchedule.vue'
import CardImage from '~/components/CardImage.vue'
import CircleIcon from '~/assets/icons/circle.svg'
import { useDateFormat } from '~/composables/calendar/use-date-format.composable'
import { useImageAlt } from '~/composables/use-image-alt.composable'

const props = defineProps({
  event: {
    type: Object as PropType<CalendarEvent>,
    required: true
  }
})
const { isMobile, isSmallTablet } = useResponsive();
const { formatEventTime } = useDateFormat()
const imageAlt = computed(() => useImageAlt(props.event.eventType, props.event.title))
const scheduleSize = computed(() => (isMobile.value && !isSmallTablet.value ? 'medium' : 'large'))

const mainColorMap = {
  'shows': 'bg-primary-500',
  'workshops': 'bg-secondary-500',
  'performances': 'bg-tertiary-500',
}

const footerColorMap = {
  'shows': 'bg-primary-400',
  'workshops': 'bg-secondary-400',
  'performances': 'bg-tertiary-400',
}

const getMainColor = computed(() => {
  return mainColorMap[props.event.eventType as keyof typeof mainColorMap] ?? 'bg-primary-500'
})

const getFooterColor = computed(() => {
  return footerColorMap[props.event.eventType as keyof typeof footerColorMap] ?? 'bg-primary-400'
})
</script>

<template>
  <article class="h-full w-full relative">
    <div v-if="event.image" class="w-full aspect-[420/420]">
      <CardImage
        :image="event.image"
        :content-type="event.eventType"
        :image-alt="imageAlt"
      />
    </div>
    <header :class="`absolute top-2 md:top-4 left-2 md:left-4 mr-2 md:mr-4 ${getMainColor}`">
      <h3 class="uppercase text-lg md:text-xl font-grotesk font-bold text-white !leading-none p-1 md:p-2">
        {{ event.title }}
      </h3>
    </header>
    <!--add img component-->

    <div :class="`p-5 ${getMainColor}`">
      <div class="flex flex-col md:flex-row md:items-center gap-4">
        <CalendarSchedule :date="event.start" :size="scheduleSize" />
        <div class="flex flex-col gap-1 w-full">
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
            :class="`text-white !leading-tight no-underline hover:underline underline-offset-2 hover:opacity-90 ${scheduleSize === 'large' ? 'text-base line-clamp-4' : 'min-h-[36px] text-sm line-clamp-2'}`"
          >
            {{ event.location }}
          </a>
        </div>
      </div>
    </div>
    <footer :class="`flex gap-2 px-5 py-1 items-center ${getFooterColor} h-[26px]`">
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
