<script setup lang="ts">
import { computed } from 'vue';
import { LOCALE_ROUTES, PERFORMANCES_IMG } from "~/constants";
import { useI18n } from "vue-i18n";
import type { CardLink, CardImage, ImageRoute } from "~/types";
import { getItemsByRoute, reorderItems } from "~/utils/";

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()

useHead({
  meta: [
    { name: 'description', content: t('home.description') }
  ]
})

const abstract = getTranslatedList('shows.vint-anys.abstract', ['paragraph'])
const summaryItems = getTranslatedList('shows.vint-anys.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.vint-anys.synopsis', ['paragraph'])

const getSummaryButton = computed(() => {
  return {
    download: `CiaFiligranes-vint-anys-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-vint-anys-${locale.value}.pdf`,
  }
});

const shows = getItemsByRoute('espectacles');
const workshops = getItemsByRoute('tallers');

const showItems = computed(() => {
  if (!shows?.children) return [];
  return reorderItems(shows.children, 0);
});

const getLink = (route: string, item?: string): CardLink => {
  const key = item ? `${route}/${item}` : route
  const page = LOCALE_ROUTES[key as keyof typeof LOCALE_ROUTES]

  return {
    target: '_top',
    href: page[locale.value as 'ca' | 'es' | 'en']
  }
}

const getImage = (route: string, item?: string): CardImage => {
  return {
    imageName: `${route}_${item}`,
    imageRoute: route as ImageRoute
  }
}
</script>

<template>
  <div class="h-full">
    <HeroCover image-name="hero_cover" image-route="" :alt="t('home.hero.alt')">
      <template #content>
        <VintAnysBrand class="w-[300px] lg:w-[448px] xl:w-[548px] 2xl:w-[748px]"/>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrapped>
        <Summary
          :abstract="abstract"
          :items="summaryItems"
          :button="getSummaryButton"
        />
      </template>
      <template #unwrapped>
        <Synopsis
          :description="synopsis"
          :image="getImage('espectacles', 'vint-anys')"
          bg-color="bg-primary-500"
          :alt="t('home.hero.alt')"
          :info-button="{
            href: '/espectacles/vint-anys',
            class: 'button-outline-primary'
          }"
        />
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
          <HighlightContent
            :title="t('routes.espectacles')"
            contentLink="/espectacles"
            titleClasses="-skew-y-3 hover:text-primary-700"
            css-classes="highlight-content--1"
            isCurrentContent
          >
              <template #content>
                <SlidingPanel class="-skew-y-3">
                  <ul class="flex w-full gap-1">
                    <li v-for="(item, index) in showItems" :key="index">
                      <SmallCard
                        card-type="espectacles"
                        :title="t(`routes.${item}`)"
                        :image="getImage('espectacles', item)"
                        :link="getLink(shows!.name,item)"
                      />
                    </li>
                  </ul>
                </SlidingPanel>
              </template>
          </HighlightContent>

          <HighlightContent
            :title="t('routes.tallers')"
            contentLink="/tallers"
            titleClasses="-skew-y-3 hover:text-secondary-500"
            css-classes="highlight-content--2"
          >
            <template #content>
              <SlidingPanel class="-skew-y-3">
              <ul class="flex w-full gap-1">
                <li v-for="(item, index) in workshops!.children" :key="index">
                  <SmallCard
                    card-type="tallers"
                    :title="t(`routes.${item}`)"
                    :image="getImage('tallers', item)"
                    :link="getLink(workshops!.name,item)"
                  />
                </li>
              </ul>
              </SlidingPanel>
            </template>
          </HighlightContent>

          <HighlightContent
            :title="t('routes.animacions')"
            contentLink="/animacions"
            titleClasses="-skew-y-3 hover:text-tertiary-700"
            css-classes="highlight-content--3"
          >
            <template #content>
              <div class="relative">
                <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end gap-4 z-10 pointer-events-none">
                  <h3 class="text-2xl xl:text-3xl text-left font-grotesk font-bold uppercase text-white wrap-break-word hyphens-auto leading-7 max-w-[75%] 2xl:max-w-[73%]">
                    {{ t('performances.title') }}
                  </h3>
                </div>
                <SlidingPanel class="-skew-y-3">
                  <MidCard
                    card-type="animacions"
                    :title="t('performances.title')"
                    :images="PERFORMANCES_IMG"
                    :link="getLink('animacions')"
                  />
                </SlidingPanel>
              </div>
            </template>
          </HighlightContent>
        </div>
        <HeroFooter :alt="t('home.hero.alt')" image-name="hero_footer" image-route=""/>
        <HireFili
          :title="t('home.hire.title')"
          description="home.hire.description"
        />
      </template>
    </MainContent>
  </div>
</template>
