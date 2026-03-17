<script setup lang="ts">
import type { CalendarEvent } from '~/types'
import CalendarSchedule from '~/components/CalendarSchedule.vue'
import CardImage from '~/components/CardImage.vue'
import CircleIcon from '~/assets/icons/circle.svg'
import { useDateFormat } from '~/composables/calendar/use-date-format.composable'
import { useImageAlt } from '~/composables/use-image-alt.composable'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  event: {
    type: Object as PropType<CalendarEvent>,
    required: true
  }
})

const { formatEventTime } = useDateFormat()
const imageAlt = computed(() => useImageAlt(props.event.eventType, props.event.title))

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

const reservationButtonText = computed(() => {
  return props.event.eventType === 'workshops'
    ? t('agenda.reservationPlace')
    : t('agenda.reservationEntry')
})
</script>

<template>
  <article class="h-full w-full max-w-[388px] relative">
    <div v-if="event.image" class="relative w-full aspect-[420/420]">
      <CardImage
        :image="event.image"
        :content-type="event.eventType"
        :image-alt="imageAlt"
      />
      <FiliButton
        v-if="event.reservationLink"
        :href="event.reservationLink"
        target="_blank"
        :text="reservationButtonText"
        :button-class="`absolute bottom-4 right-4 button-solid-neutral`"
      />
    </div>
    <header :class="`absolute top-4 left-4 mr-4 ${getMainColor}`">
      <h3 class="uppercase text-xl font-grotesk font-bold text-white !leading-none p-2">
        {{ event.title }}
      </h3>
    </header>

    <div :class="`p-5 ${getMainColor}`">
      <div class="flex items-center gap-4">
        <CalendarSchedule :date="event.start" />
        <div class="flex flex-col gap-1">
          <time
            v-if="!event.isAllDay"
            class="text-white text-4xl font-extrabold font-alternative"
            :datetime="event.start"
          >
            {{ formatEventTime(event.start) }}
          </time>
          <a
            v-if="event.location"
            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white text-base !leading-tight no-underline hover:underline underline-offset-2 hover:opacity-90 line-clamp-4"
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
        {{ event.description }}
      </p>
    </footer>
  </article>
</template>
