<script setup lang="ts">
import { computed } from 'vue';
import { ROUTES_INDEX, LOCALE_ROUTES } from "~/constants";
import type { CardLink } from "~/components/SmallCard.vue";
import ArrowRight from "assets/icons/arrow-right.svg";

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()

useHead({
  meta: [
    { name: 'description', content: t('home.description') }
  ]
})

const routes = ROUTES_INDEX;
const shows = routes.find(route => route.name === 'espectacles');
const workshops = routes.find(route => route.name === 'tallers');

const performancesImages = [
  {
    imageName: 'animacions_foc',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_forner',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_domador',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_cuiners',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_torpede',
    imageRoute: 'animacions' as const
  }
]

const abstract = getTranslatedList('shows.vint-anys.abstract', ['paragraph'])
const items = getTranslatedList('shows.vint-anys.list', ['title', 'description'])
const synopsis = getTranslatedList('shows.vint-anys.synopsis', ['paragraph'])

const getButton = computed(() => {
  return {
    download: `CiaFiligranes-vint-anys-${locale.value}.pdf`,
    href: `/downloads/CiaFiligranes-vint-anys-${locale.value}.pdf`,
  }
});

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
        <Summary
          :abstract="abstract"
          :items="items"
          :button="getButton"
        />
      </template>
      <template #unwrapped>
        <Synopsis
          :synopsis="synopsis"
          image-name='espectacles_vint-anys'
          image-route="espectacles"
          bg-color="bg-primary-500"
          :alt="t('home.hero.alt')"
        >
          <template #extra-left-content>
            <FiliButton
              class="mt-4"
              href="/espectacles/vint-anys"
              buttonClass="button-outline-primary self-start"
              :text="t('button.info')"
              target="_top"
            >
              <template #text>
                {{ t('button.info') }}
              </template>
              <template #icon-right>
                <ArrowRight class="arrow-right self-end"/>
              </template>
            </FiliButton>
          </template>
        </Synopsis>
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 my-8 lg:my-12 xl:my-24 2xl:my-32">
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
            titleClasses="skew-y-3 justify-end"
            css-classes="highlight-content--2"
          >
            <template #content>
              <SlidingPanel :showButtons="true" class="skew-y-3">
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
              <div class="relative">
                <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end gap-4 z-10 pointer-events-none">
                  <h3 class="text-2xl xl:text-3xl text-left font-grotesk font-bold uppercase text-white wrap-break-word hyphens-auto leading-7 max-w-[75%] 2xl:max-w-[73%]">
                    {{ t('performances.title') }}
                  </h3>
                </div>
                <SlidingPanel :showButtons="true" class="-skew-y-3">
                  <MidCard
                    card-type="performance"
                    :title="t('performances.title')"
                    :images="performancesImages"
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
          color="primary"
          isOutlined
        />
      </template>
    </MainContent>
  </div>
</template>
