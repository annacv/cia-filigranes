<script setup lang="ts">
import { ROUTES_INDEX, LOCALE_ROUTES } from "~/constants";
import type { CardLink } from "~/components/SmallCard.vue";

const { t, locale } = useI18n()
useHead({
  meta: [
    { name: 'description', content: t('home.description') }
  ]
})

const routes = ROUTES_INDEX;
const shows = routes.find(route => route.name === 'espectacles');
const workshops = routes.find(route => route.name === 'tallers');

const getLink = (route: string, item?: string): CardLink => {
  const key = item ? `${route}/${item}` : route
  const page = LOCALE_ROUTES[key as keyof typeof LOCALE_ROUTES]

  return {
    target: '_top',
    href: page[locale.value as 'ca' | 'es' | 'en']
  }
}
</script>

<template>
  <div class="h-full">
    <HeroCover image-name="hero_cover" image-route="" :alt="t('home.hero.alt')">
      <template #content>
        <NuxtLinkLocale :to="'/espectacles/vint-anys'">
          <VintAnysBrand class="w-[300px] lg:w-[448px] xl:w-[548px] 2xl:w-[748px] hover:opacity-85"/>
        </NuxtLinkLocale>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrapped>
      </template>
      <template #unwrapped>
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 mb-8 lg:mb-12 xl:mb-24 2xl:mb-32">
          <HighlightContent
            :title="t('routes.espectacles')"
            titleClasses="-skew-y-3"
            css-classes="highlight-content--1"
          >
              <template #content>
                <SlidingPanel :showButtons="true" class="-skew-y-3">
                <ul class="flex w-full gap-1">
                  <li v-for="(item, index) in shows!.children" :key="index">
                    <SmallCard
                      card-type="show"
                      :title="t(`routes.${item}`)"
                      :image-name="`espectacles_${item}`"
                      image-route="espectacles"
                      :link="getLink(shows!.name,item)"
                    />
                  </li>
                </ul>
            </SlidingPanel>
              </template>
          </HighlightContent>

          <HighlightContent
            :title="t('routes.tallers')"
            titleClasses="-skew-y-3"
            css-classes="highlight-content--2"
          >
            <template #content>
              <SlidingPanel :showButtons="true" class="-skew-y-3">
              <ul class="flex w-full gap-1">
                <li v-for="(item, index) in workshops!.children" :key="index">
                  <SmallCard
                    card-type="workshop"
                    :title="t(`routes.${item}`)"
                    :image-name="`tallers_${item}`"
                    image-route="tallers"
                    :link="getLink(workshops!.name,item)"
                  />
                </li>
              </ul>
              </SlidingPanel>
            </template>
          </HighlightContent>

          <HighlightContent
            :title="t('routes.animacions')"
            titleClasses="-skew-y-3"
            css-classes="highlight-content--3"
          >
            <template #content>
              <SlidingPanel :showButtons="true" class="-skew-y-3">
              <ul class="flex w-full gap-1">
                <li>
                  <SmallCard
                    card-type="performance"
                    :title="t('performances.title')"
                    image-name="animacions_foc"
                    image-route="animacions"
                    :link="getLink('animacions')"
                  />
                </li>
              </ul>
              </SlidingPanel>
            </template>
          </HighlightContent>
        </div>
        <HireFili
          :alt="t('home.hire-fili.alt')"
          image-name="035" image-route=""
          :title="t('home.hire-fili.title')"
          description="home.hire-fili.description"
        />
      </template>
    </MainContent>
  </div>
</template>
