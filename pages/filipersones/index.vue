<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import type { ContentType, ImageRoute } from "~/types";
import { getImageByRoute } from "~/utils/image-by-route";

const showMoreContent = ref(false);
const dataSheetRef = ref<HTMLElement | null>(null);

const { isMobile } = useResponsive();
const { t } = useI18n();
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('filipersones', title);
const { height: dataSheetHeight } = useElementSize(dataSheetRef);

useHead({
  meta: [
    { name: 'description', content: t('filipersones.metaDescription') }
  ]
})

const origins = getTranslatedList('filipersones.origins', ['paragraph']) as Record<string, PropertyKey>[]
const prices = getTranslatedList('filipersones.prices', ['title', 'description'])
const stories = getTranslatedList('filipersones.stories', ['title', 'description'])
const history = getTranslatedList('filipersones.history', ['paragraph']) as Record<string, PropertyKey>[]
const filiFriends = getTranslatedList('filipersones.filiFriends', ['paragraph']) as Record<string, PropertyKey>[]
const scenariosRight1 = getTranslatedList('filipersones.scenariosRight1', ['title', 'description'])
const scenariosLeft1 = getTranslatedList('filipersones.scenariosLeft1', ['title', 'description'])
const scenariosRight2 = getTranslatedList('filipersones.scenariosRight2', ['title', 'description'])
const scenariosLeft2 = getTranslatedList('filipersones.scenariosLeft2', ['title', 'description'])
const background = getTranslatedList('filipersones.background', ['paragraph']) as Record<string, PropertyKey>[]

const filipersones = getItemsByRoute('filipersones');

const filipersonesItems = computed(() => {
  return filipersones?.children?.map((filipersona) => {
    const title = t(`routes.${filipersona}`)

    return {
      description: getTranslatedList(`filipersones.${filipersona}.intro`, ['paragraph']),
      image: {
        imageName: `filipersones_${filipersona}-1`,
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

const currentScenariosRight = computed(() => showMoreContent.value ? scenariosRight2 : scenariosRight1);
const currentScenariosLeft = computed(() => showMoreContent.value ? scenariosLeft2 : scenariosLeft1);
const dataSheetStyle = computed(() => dataSheetHeight.value > 0 ? { minHeight: `${dataSheetHeight.value}px` } : {});

const showMore = () => {
  showMoreContent.value = !showMoreContent.value;
};
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="filipersones_hero"
      image-route="filipersones"
      :alt="t('shows.hero.alt')"
    >
      <template #content>
        <div class="py-5 xs:px-0 sm:px-5 font-grotesk uppercase text-white max-w-[332px] md:max-w-[432px] lg:max-w-[532px]">
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
          :image="getImageByRoute('filipersones', 'filigranes-1')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
          should-clip
        />
        <DataSheet
          :tech-card="prices"
          :art-card="stories"
          :image="getImageByRoute('filipersones', 'filigranes-2')"
          :alt="t('shows.hero.alt')"
          is-reversed
          should-clip
        />
        <Synopsis
          :description="history"
          :image="getImageByRoute('filipersones', 'filigranes-3')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          background-position="center 3%"
          show-full-content
          is-reversed
        />
        <Synopsis
          :description="filiFriends"
          :image="getImageByRoute('filipersones', 'filigranes-4')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
          should-clip
        />
        <DataSheet
          ref="dataSheetRef"
          :tech-card="currentScenariosRight"
          :art-card="currentScenariosLeft"
          :image="getImageByRoute('filipersones', 'filigranes-5')"
          :alt="t('shows.hero.alt')"
          extra-content
          :show-more="showMoreContent"
          is-reversed
          :style="dataSheetStyle"
          should-clip
          :hide-image="isMobile"
          background-position="center 20%"
          @view-more="showMore"
        />
        <Synopsis
          :description="background"
          :image="getImageByRoute('filipersones', 'filigranes-6')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
          is-full-reversed
          should-clip
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
      background-position="center top"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
    <BottomNavigation />
    <TheSupporters />
  </div>
</template>
