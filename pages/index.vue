<script setup>
import { ROUTES_INDEX } from "~/constants/constants";

const { t } = useI18n()
useHead({
  meta: [
    { name: 'description', content: t('home.description') }
  ]
})

const routes = ROUTES_INDEX;
const shows = routes.find(route => route.name === 'espectacles');
const workshops = routes.find(route => route.name === 'tallers');

const showsImages = ['050']
const workshopsImages = ['050']

</script>

<template>
  <div class="h-full">
    <HeroCover image-name="007" :alt="t('home.hero.alt')">
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
                  <li v-for="item in shows.children" :key="item">
                    <SmallCard
                      card-type="show"
                      :title="t(`routes.${item}`)"
                      :image-name="showsImages[0]"
                    />
                  </li>
                </ul>
            </SlidingPanel>
              </template>
          </HighlightContent>

          <HighlightContent
            :title="t('routes.tallers')"
            titleClasses="skew-y-7 justify-end"
            css-classes="highlight-content--2"
          >
            <template #content>
              <SlidingPanel :showButtons="true" class="skew-y-6">
              <ul class="flex gap-x-3 w-full">
                <li v-for="item in workshops.children" :key="item">
                  <SmallCard
                    card-type="workshop"
                    :title="t(`routes.${item}`)"
                    :image-name="workshopsImages[0]"
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
                    image-name="050"
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
