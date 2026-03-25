<script setup lang="ts">
import CardImage from '~/components/CardImage.vue'
import CircleIcon from '~/assets/icons/circle.svg'
import ArrowRight from '~/assets/icons/arrow-right.svg'
import { EVENT_TYPE_COLORS } from '~/constants'
import { useCalendarHistory } from '~/composables/calendar/use-calendar-history.composable'
import { useImageAlt } from '~/composables/use-image-alt.composable'
import type { CalendarEvent, ContentType, EventInfoLink } from '~/types'
import { getMatchedContentKeyByTitle } from '~/utils/calendar-events'

const MAX_TRENDS = 6

type TrendContentType = Extract<ContentType, 'shows' | 'workshops' | 'performances'>

type TrendItem = {
  id: string
  eventType: TrendContentType
  image: NonNullable<CalendarEvent['image']>
  title: string
  totalScheduled: number
  events: CalendarEvent[]
  imageAlt: string
  button: EventInfoLink | null
}

type TrendItemBase = Omit<TrendItem, 'imageAlt' | 'button'>

const { t } = useI18n()
const localePath = useLocalePath()
const { events, pending, error } = useCalendarHistory()

const isTrendContentType = (eventType: ContentType): eventType is TrendContentType => {
  return eventType === 'shows' || eventType === 'workshops' || eventType === 'performances'
}

const getTrendKey = (event: CalendarEvent) => {
  const matchedContentKey = isTrendContentType(event.eventType)
    ? getMatchedContentKeyByTitle(event.title, event.eventType)
    : undefined

  return `${event.eventType}:${matchedContentKey ?? event.title.trim().toLowerCase()}`
}

const trends = computed<TrendItem[]>(() => {
  const groupedEvents = new Map<string, TrendItemBase>()

  for (const event of events.value) {
    if (!isTrendContentType(event.eventType) || !event.image) continue

    const key = getTrendKey(event)
    const existingTrend = groupedEvents.get(key)
    if (!existingTrend) {
      groupedEvents.set(key, {
        id: key,
        eventType: event.eventType,
        image: event.image,
        title: event.title,
        totalScheduled: 1,
        events: [event],
      })
      continue
    }

    existingTrend.totalScheduled += 1
    existingTrend.events.push(event)
  }

  return [...groupedEvents.values()]
    .map((trend): TrendItem => ({
      ...trend,
      imageAlt: useImageAlt(trend.eventType, trend.title),
      button: getTrendButton(trend),
    }))
    .sort((left, right) => right.totalScheduled - left.totalScheduled)
    .slice(0, MAX_TRENDS)
})

const getTrendTitleBackgroundClass = (eventType: TrendContentType) => {
  return EVENT_TYPE_COLORS[eventType].bg
}

const getCircleColorClass = (eventType: TrendContentType) => {
  return EVENT_TYPE_COLORS[eventType].text
}

const getTrendButtonClass = (eventType: TrendContentType) => {
  if (eventType === 'shows') return 'button-outline-primary'
  if (eventType === 'workshops') return 'button-outline-secondary'
  return 'button-outline-tertiary'
}

const getTrendButton = (trend: TrendItemBase): EventInfoLink | null => {
  const eventInfoLink = trend.events.find((event) => !!event.eventInfoLink)?.eventInfoLink
  if (!eventInfoLink) return null

  const isInternal = eventInfoLink.href.startsWith('/')
  const target: '_self' | '_blank' = eventInfoLink.target

  const localizedHref = (() => {
    if (!isInternal) return eventInfoLink.href

    const split = eventInfoLink.href.split('#')
    const path = split[0] ?? ''
    const hash = split[1]
    const base = localePath(path)
    return hash ? `${base}#${hash}` : base
  })()

  return {
    href: localizedHref,
    target,
    text: eventInfoLink.text,
  }
}
</script>

<template>
  <section
    v-if="!pending && !error && trends.length"
    class="mb-10 grid grid-cols-6 xl:grid-cols-10 gap-2 md:gap-5"
    :aria-label="t('agenda.trends.ariaLabel')"
  >
    <div class="cols-span-1 xl:col-span-2 flex flex-col gap-1.5">
      <div
        v-for="trend in trends"
        :key="`${trend.id}-legend`"
        class="flex flex-col gap-3 relative"
      >
        <div class="group flex w-full flex-wrap justify-end gap-1.5" tabindex="0">
          <CircleIcon
            v-for="event in trend.events"
            :key="event.id"
            :class="['!h-3.5 !w-3.5 md:!h-4 md:!w-4', getCircleColorClass(event.eventType as TrendContentType)]"
            aria-hidden="true"
          />
          <span
            class="first-letter:uppercase pointer-events-none absolute left-0 -top-1 line-clamp-1 rounded-full bg-neutral-900 px-2 pb-1 pt-0.5 text-left text-xs text-white opacity-0 invisible transition-opacity [@media(hover:hover)_and_(pointer:fine)]:group-hover:visible [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:visible [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:opacity-100"
          >
            {{ trend.title }}
          </span>
        </div>
      </div>
    </div>

    <div class="col-span-5 xl:col-span-8 grid grid-cols-2 xl:grid-cols-6 gap-y-0.5 md:gap-y-2 gap-x-0.5 md:gap-x-1">
      <article
        v-for="trend in trends"
        :key="trend.id"
        class="col-span-1 flex min-w-0 flex-col"
      >
        <header class="w-full min-w-0">
          <h3
            :class="[
              getTrendTitleBackgroundClass(trend.eventType),
              'mb-0 w-full min-w-0 truncate p-2 font-grotesk text-xs md:text-sm font-bold uppercase !leading-none text-white',
            ]"
          >
            {{ trend.title }}
          </h3>
        </header>
        <div class="relative aspect-square">
          <CardImage
            :image="trend.image"
            :content-type="trend.eventType"
            :image-alt="trend.imageAlt"
            :show-gradient="false"
            class="h-full w-full"
          />
          <FiliButton
            v-if="trend.button"
            :href="trend.button.href"
            :target="trend.button.target"
            :text="t(trend.button.text)"
            :button-class="[getTrendButtonClass(trend.eventType), '!px-2 !py-0.5 !text-xs md:!text-sm absolute bottom-2 left-2 z-10']"
          >
            <template #icon-right>
              <ArrowRight class="!mt-0" />
            </template>
          </FiliButton>
        </div>
      </article>
    </div>
  </section>
</template>