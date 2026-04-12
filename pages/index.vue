<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";
import { getItemIndex } from "~/utils/get-item-index";
import { useCalendarEvents } from "~/composables/calendar/use-calendar-events.composable"
import { useCalendarLayout } from "~/composables/calendar/use-calendar-layout.composable"
import CalendarEventList from "~/components/agenda/CalendarEventList.vue"
import ArrowRight from "assets/icons/arrow-right.svg";

const { t } = useI18n()
const { getTranslatedList } = useI18nUtils()
const { events, pending, error, ensureLoaded } = useCalendarEvents()
const { maxVisibleEvents } = useCalendarLayout()

if (import.meta.server) {
  await ensureLoaded()
}

useHead({
  meta: [
    { name: 'description', content: t('home.metaDescription') }
  ]
})

const abstract = getTranslatedList('shows.vint-anys.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.vint-anys.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.vint-anys.synopsis', ['paragraph'])
const aboutUs = getTranslatedList('home.aboutUs.description', ['paragraph'])

const slicedEvents = computed(() => {
  const shows = events.value.filter((event) => event.eventType === 'shows')
  const workshops = events.value.filter((event) => event.eventType === 'workshops')
  const performances = events.value.filter((event) => event.eventType === 'performances')

  const selectedIds = new Set<string>()
  const prioritizedGroups = [shows, workshops, performances]

  // Pick one event per type first to maximize variety.
  for (const group of prioritizedGroups) {
    if (selectedIds.size >= maxVisibleEvents.value) break
    const nextEvent = group[0]
    if (nextEvent) {
      selectedIds.add(nextEvent.id)
    }
  }
  // Fill remaining slots.
  for (const group of prioritizedGroups) {
    for (const event of group) {
      if (selectedIds.size >= maxVisibleEvents.value) break
      selectedIds.add(event.id)
    }
  }

  return events.value.filter((event) => selectedIds.has(event.id))
})
</script>

<template>
  <div class="h-full">
    <HeroCover image-name="hero_cover" image-route="" :alt="t('home.hero.alt')">
      <template #content>
        <h1>
          <span class="sr-only">{{ t('routes.vint-anys') }}</span>
          <VintAnysBrand
            class="w-[310px] md:w-[348px] lg:w-[448px] xl:w-[548px] 2xl:w-[748px] md:mt-8 lg:mt-0"
          />
        </h1>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrappedTop>
        <Summary
          :abstract="abstract"
          :items="summaryItems"
        />
      </template>
      <template #unwrappedTop>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('espectacles', 'vint-anys-5')"
          content-type="shows"
          :alt="t('home.hero.alt')"
          :hire-contract="{ kind: 'show', productKey: 'vint-anys' }"
          :info-button="{
            href: '/espectacles/vint-anys#video',
            textKey: 'button.teaser'
          }"
        />
      </template>
      <template #wrapped>
        <ClaimTitle
          v-if="events.length > 0"
          class="text-center"
          :claim-title="t('agenda.claimTitle')"
          is-section-title
        />
        <CalendarEventList
          v-if="events.length > 0"
          :events="slicedEvents"
          :pending="pending"
          :error="error"
        />
        <FiliButton
          v-if="events.length > 0 && events.length > maxVisibleEvents"
          class="mt-1"
          button-class="button-link-neutral justify-self-end"
          :text="t('agenda.viewAllEvents')"
          href="/agenda"
          target="_top"
        >
          <template #text>
            {{ t('agenda.viewAllEvents') }}
          </template>
          <template #icon-right>
            <ArrowRight class="arrow-right !mt-0"/>
          </template>
        </FiliButton>

        <ClaimTitle
          class="text-center"
          :claim-title="t('shows.homeClaim')"
          is-section-title
        />
      </template>
      <template #unwrapped>
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24">
          <HighlightShows :reorder-index="getItemIndex('espectacles', 'vint-anys')" />
          <HighlightWorkshops />
          <HighlightPerformances />
        </div>
        <HireOrganizersSection />
        <ClaimTitle
          :claim-title="t('home.aboutUs.title')"
          is-section-title
        />
        <Synopsis
          :description="aboutUs"
          :image="getImageByRoute('filipersones', 'home')"
          content-type="shows"
          :alt="t('home.aboutUs.title')"
          show-full-content
          is-reversed
          :info-button="{
            href: '/filipersones',
            textKey: 'home.aboutUs.buttonText'
          }"
        />
      </template>
      <template #wrappedBottom>
        <HireContactSection id="#home-contact" content-type="shows" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          :alt="t('home.hero.alt')"
          image-name="hero_footer"
          image-route=""
          background-position="center 30%"
        />
        <HireFiliBanner
          :title="t('home.hire.title')"
          description="home.hire.description"
        />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
