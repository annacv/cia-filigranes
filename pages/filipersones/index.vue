<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ContentType, ImageRoute } from "~/types";
import { getImageByRoute } from "~/utils/image-by-route";

const { t } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('filipersones');

useHead({
  meta: [
    { name: 'description', content: t('filipersones.metaDescription') }
  ]
})

const origins = getTranslatedList('filipersones.origins', ['paragraph'])
const history = getTranslatedList('filipersones.history', ['paragraph'])
const background = getTranslatedList('filipersones.background', ['paragraph'])
const stories = getTranslatedList('filipersones.stories', ['title', 'description'])
const prices = getTranslatedList('filipersones.prices', ['title', 'description'])
const scenariosLeft = getTranslatedList('filipersones.scenariosLeft', ['title', 'description'])
const scenariosRight = getTranslatedList('filipersones.scenariosRight', ['title', 'description'])

const filipersones = getItemsByRoute('filipersones');

const filipersonesItems = computed(() => {
  return filipersones?.children?.map((filipersona) => {
    const title = t(`routes.${filipersona}`)

    return {
      description: getTranslatedList(`filipersones.${filipersona}.intro`, ['paragraph']),
      image: {
        imageName: `filipersones_${filipersona}_1`,
        imageRoute: 'filipersones' as ImageRoute,
      },
      contentType: 'shows' as ContentType,
      alt: getImageAlt(title),
      title: t(`routes.${filipersona}`),
      buttons: {
        infoButton: {
          href: `/filipersones/${filipersona}`,
          class: 'button-outline-primary'
        }
      }
    }
  }) || []
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="filipersones_hero"
      image-route="animacions"
      :alt="t('shows.hero.alt')"
    >
      <template #content>
        <div class="px-5 lg:px-0 font-grotesk uppercase text-white lg:max-w-[543px]">
          <h1 class="text-4xl md:text-5xl lg:text-6xl">
            {{ t('routes.filipersones') }}
          </h1>
          <h2 class="text-5xl md:text-6xl lg:text-7xl">
            {{ t('filipersones.hero.subtitle') }}
          </h2>
        </div>
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <ClaimTitle
          :claim="t('filipersones.claim')"
          :claim-title="t('filipersones.claimTitle')"
        />
        <Synopsis
          :description="origins"
          :image="getImageByRoute('filipersones', 'filigranes_1')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
        />
        <DataSheet
          :techCard="prices"
          :artCard="stories"
          :image="getImageByRoute('filipersones', 'filigranes_2')"
          :alt="t('shows.hero.alt')"
          isReversed
        />
        <Synopsis
          :description="history"
          :image="getImageByRoute('filipersones', 'filigranes_3')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
          isReversed
        />
        <DataSheet
          :techCard="scenariosRight"
          :artCard="scenariosLeft"
          :image="getImageByRoute('filipersones', 'filigranes_4')"
          :alt="t('shows.hero.alt')"
        />
        <Synopsis
          :description="background"
          :image="getImageByRoute('filipersones', 'filigranes_5')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
          isFullReversed
        />
        <SynopsisList
          :items="filipersonesItems"
          :claim="t('filipersones.knowMore')"
          :claim-title="t('filipersones.knowMoreTitle')"
        />
      </template>
    </MainContent>
    <HeroFooter
      image-name="filipersones_footer"
      image-route="filipersones"
      :alt="t('shows.hero.alt')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
