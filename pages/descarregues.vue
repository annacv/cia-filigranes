<script setup lang="ts">
import { ROUTES_INDEX } from '~/constants'
import { BULK_CARD_IDS } from '~/constants/downloads'
import { useSpecificDownloads } from '~/composables/use-specific-downloads.composable'
import { contentTypeToImageRoute, resolveBulkAsset, toDownloadLocale } from '~/utils/downloads-resolver'
import { getImageByRoute } from '~/utils/image-by-route'
import BulkDownloadCard from '~/components/downloads/BulkDownloadCard.vue'
import MultiselectDownloadCard from '~/components/downloads/MultiselectDownloadCard.vue'
import ItemDownloadCard from '~/components/downloads/ItemDownloadCard.vue'
import type { BulkCardId, MultiselectContentType } from '~/types/downloads'

const { t, locale } = useI18n()

useHead({
  meta: [
    { name: 'description', content: t('descarregues.metaDescription') },
  ],
})

const { isMobile } = useResponsive()

const bulkAssets = computed(() =>
  Object.fromEntries(
    BULK_CARD_IDS.map((cardId) => [cardId, resolveBulkAsset(cardId, toDownloadLocale(locale.value))]),
  ) as Record<BulkCardId, ReturnType<typeof resolveBulkAsset>>,
)

const BULK_COPY: Record<BulkCardId, {
  titleKey: string
  actionLabelKey: string
  descriptionKey?: string
}> = {
  espectacles: {
    titleKey: 'routes.espectacles',
    actionLabelKey: 'descarregues.bulk.download',
    descriptionKey: 'descarregues.bulk.espectacles.description',
  },
  tallers: {
    titleKey: 'routes.tallers',
    actionLabelKey: 'descarregues.bulk.download',
    descriptionKey: 'descarregues.bulk.tallers.description',
  },
  animacions: {
    titleKey: 'routes.animacions',
    actionLabelKey: 'descarregues.bulk.download',
    descriptionKey: 'descarregues.bulk.animacions.description',
  },
  logo: {
    titleKey: 'descarregues.logoHeading',
    actionLabelKey: 'descarregues.logoHeading',
    descriptionKey: 'descarregues.bulk.logo.description',
  },
}

const SPECIFIC_ROWS: Array<{
  contentType: MultiselectContentType
  titleKey: string
  i18nPrefix: string
  imageRoute: 'espectacles' | 'tallers'
  backgroundClass: string
}> = [
  {
    contentType: 'shows',
    titleKey: 'routes.espectacles',
    i18nPrefix: 'descarregues.cards.shows',
    imageRoute: contentTypeToImageRoute('shows'),
    backgroundClass: 'bg-primary-500',
  },
  {
    contentType: 'workshops',
    titleKey: 'routes.tallers',
    i18nPrefix: 'descarregues.cards.workshops',
    imageRoute: contentTypeToImageRoute('workshops'),
    backgroundClass: 'bg-secondary-500',
  },
]

function routeChildrenOptions(routeName: string) {
  const children = ROUTES_INDEX.find((r) => r.name === routeName)?.children ?? []
  return children.map((value) => ({ value, labelKey: `routes.${value}` }))
}

const multiselectOptions = computed(() => ({
  shows: routeChildrenOptions('espectacles'),
  workshops: routeChildrenOptions('tallers'),
}))

const selection = reactive({
  shows: [] as string[],
  workshops: [] as string[],
})

const {
  downloadGroup,
  downloadItem,
  isDownloading: specificBusy,
  disabledShowsGroup,
  disabledWorkshopsGroup,
} = useSpecificDownloads({
  locale,
  selection,
  options: multiselectOptions,
})

function disabledGroupFor(contentType: MultiselectContentType) {
  return contentType === 'shows' ? disabledShowsGroup.value : disabledWorkshopsGroup.value
}
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="descarregues_hero"
      image-route="descarregues"
      :alt="t('commonAlt')"
      background-position="center bottom"
      is-section-cover
    >
      <template #content>
        <SectionCoverTitle
          :title="t('descarregues.hero.title')"
          title-class="max-w-[312px] md:max-w-[456px] lg:max-w-[538px]"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <div class="grid-layout bg-gradient-primary pb-20 md:pb-36">
          <div class="layout-cols">
            <ClaimTitle
              class="text-center !text-white lg:py-0 !px-0"
              :claim-title="t('descarregues.claimTitle')"
              :subtitle="isMobile ? undefined : t('descarregues.claimSubtitle')"
              is-section-title
            />
            <div class="pb-5 grid w-full grid-cols-1 gap-3 2xl:gap-5 md:grid-cols-2 xl:grid-cols-4">
              <BulkDownloadCard
                v-for="cardId in BULK_CARD_IDS"
                :key="cardId"
                :title="t(BULK_COPY[cardId].titleKey)"
                :action-label="t(BULK_COPY[cardId].actionLabelKey)"
                :description="BULK_COPY[cardId].descriptionKey ? t(BULK_COPY[cardId].descriptionKey!) : undefined"
                :href="bulkAssets[cardId].href"
                :filename="bulkAssets[cardId].filename"
              />
            </div>
          </div>
        </div>
        <div class="min-w-full w-full h-full pt-4">
          <ClaimTitle
            class="text-center"
            :claim-title="t('descarregues.specific.claimTitle')"
            :subtitle="isMobile ? undefined : t('descarregues.specific.claimSubtitle')"
            is-section-title
          />
        </div>
        <div class="flex flex-col">
          <section
            v-for="row in SPECIFIC_ROWS"
            :key="row.contentType"
            :class="['w-full py-6 md:py-16', row.backgroundClass]"
          >
            <div class="grid-layout">
              <div class="layout-cols grid grid-cols-1 gap-3 2xl:gap-5 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-4 md:items-stretch">
                <MultiselectDownloadCard
                  v-model="selection[row.contentType]"
                  :title="t(row.titleKey)"
                  :content-type="row.contentType"
                  :options="multiselectOptions[row.contentType]"
                  :i18n-prefix="row.i18nPrefix"
                  :busy="specificBusy"
                  :disabled="disabledGroupFor(row.contentType)"
                  class="md:col-span-3 lg:col-span-2 xl:col-span-1"
                  @download="(action) => downloadGroup(row.contentType, action)"
                />
                <div class="min-w-0 md:col-span-5 lg:col-span-4 xl:col-span-3">
                  <SlidingPanel button-class="-top-4 xl:-top-6" class="h-full !py-0">
                    <ul class="flex gap-3 md:gap-1">
                      <li
                        v-for="option in multiselectOptions[row.contentType]"
                        :key="option.value"
                      >
                        <ItemDownloadCard
                          :title="t(option.labelKey)"
                          :image="getImageByRoute(row.imageRoute, option.value)"
                          :image-alt="t(option.labelKey)"
                          :content-type="row.contentType"
                          :busy="specificBusy"
                          @download="(action) => downloadItem(row.contentType, option.value, action)"
                        />
                      </li>
                    </ul>
                  </SlidingPanel>
                </div>
              </div>
            </div>
          </section>
        </div>
      </template>
      <template #wrappedBottom>
        <HireContactSection content-type="shows" />
      </template>
      <template #unwrappedBottom>
        <HeroFooter
          :alt="t('commonAlt')"
          image-name="descarregues_footer"
          image-route="descarregues"
          background-position="center center"
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
