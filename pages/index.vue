<script setup lang="ts">
import { ROUTES_INDEX, LOCALE_ROUTES } from "~/constants";
import type { CardButton } from "~/components/SmallCard.vue";

const { t, locale } = useI18n()
useHead({
  meta: [
    { name: 'description', content: t('home.description') }
  ]
})

const routes = ROUTES_INDEX;
const shows = routes.find(route => route.name === 'espectacles');
const workshops = routes.find(route => route.name === 'tallers');

const checkIfFileExists = async (path: string): Promise<boolean> => {
  try {
    const res = await fetch(path, { method: 'HEAD' })
    return res.ok
  } catch (err) {
    return false
  }
}

const getButton = (route: string, item?: string): CardButton => {
  const key = item ? `${route}/${item}` : route
  const page = LOCALE_ROUTES[key as keyof typeof LOCALE_ROUTES]

  return {
    class:
      route === 'espectacles'
        ? 'button-outline-primary'
        : route === 'tallers'
          ? 'button-outline-secondary'
          : 'button-outline-tertiary',
    href: page[locale.value as 'ca' | 'es' | 'en']
  }
}
</script>

<template>
  <div class="h-full">
    <HeroCover image-name="hero_cover" image-route="" :alt="t('home.hero.alt')">
      <template #content>
        <NuxtLinkLocale :to="'/espectacles/vint-anys'">
          <VintAnysBrand class="w-[300px] lg:w-[448px] xl:w-[600px] 2xl:w-[748px]"/>
        </NuxtLinkLocale>
      </template>
    </HeroCover>
    <MainContent>
      <template #wrapped>
      </template>
      <template #unwrapped>
        <div class="flex flex-col gap-y-48">
          <HighlightContent
            :title="t('routes.espectacles')"
            titleClasses="-skew-y-6"
            css-classes="highlight-content--1"
          >
              <template #content>
                <SlidingPanel :showButtons="true" class="-skew-y-6">
                <ul class="flex gap-x-3 w-full">
                  <li v-for="(item, index) in shows!.children" :key="index">
                    <SmallCard
                      card-type="show"
                      :title="t(`routes.${item}`)"
                      :image-name="`espectacles_${item}`"
                      image-route="espectacles"
                      :button="getButton(shows!.name,item)"
                    />
                  </li>
                </ul>
            </SlidingPanel>
              </template>
          </HighlightContent>

          <HighlightContent
            :title="t('routes.tallers')"
            titleClasses="skew-y-6 justify-end"
            css-classes="highlight-content--2"
          >
            <template #content>
              <SlidingPanel :showButtons="true" class="skew-y-6">
              <ul class="flex gap-x-3 w-full">
                <li v-for="(item, index) in workshops!.children" :key="index">
                  <SmallCard
                    card-type="workshop"
                    :title="t(`routes.${item}`)"
                    :image-name="`tallers_${item}`"
                    image-route="tallers"
                    :button="getButton(workshops!.name,item)"
                  />
                </li>
              </ul>
              </SlidingPanel>
            </template>
          </HighlightContent>

          <HighlightContent
            :title="t('routes.animacions')"
            titleClasses="-skew-y-6"
            css-classes="highlight-content--3"
          >
            <template #content>
              <SlidingPanel :showButtons="true" class="-skew-y-6">
              <ul class="flex gap-x-3 w-full">
                <li>
                  <SmallCard
                    card-type="performance"
                    :title="t('performances.title')"
                    image-name="animacions_foc"
                    image-route="animacions"
                    :button="getButton('animacions')"
                  />
                </li>
              </ul>
              </SlidingPanel>
            </template>
          </HighlightContent>
        </div>
      </template>
    </MainContent>
  </div>
</template>
