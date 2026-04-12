<script setup lang="ts">
import { ROUTES_INDEX } from '~/constants'
import { getItemIndex } from '~/utils/get-item-index'
import DownloadCard from '~/components/downloads/DownloadCard.vue'
import FormMultiselectDropdown from '~/components/form/FormMultiselectDropdown.vue'

const { t } = useI18n()

useHead({
  meta: [
    { name: 'description', content: t('descarregues.metaDescription') },
  ],
})

type MultiselectContentType = 'shows' | 'workshops'

type DownloadCard = {
  id: string
  titleKey: string
  actions: { labelKey: string }[]
  descriptionKey?: string
  multiselect?: {
    contentType: MultiselectContentType
    i18nPrefix: string
  }
}

const DOSSIER_IMAGES_ACTIONS: { labelKey: string }[] = [
  { labelKey: 'button.dossier' },
  { labelKey: 'button.images' },
]

const LOGO_ACTIONS: { labelKey: string }[] = [{ labelKey: 'descarregues.logoHeading' }]

const downloadCards: DownloadCard[] = [
  {
    id: 'shows',
    titleKey: 'routes.espectacles',
    actions: DOSSIER_IMAGES_ACTIONS,
    multiselect: {
      contentType: 'shows',
      i18nPrefix: 'descarregues.cards.shows',
    },
  },
  {
    id: 'workshops',
    titleKey: 'routes.tallers',
    actions: DOSSIER_IMAGES_ACTIONS,
    multiselect: {
      contentType: 'workshops',
      i18nPrefix: 'descarregues.cards.workshops',
    },
  },
  {
    id: 'performances',
    titleKey: 'routes.animacions',
    actions: DOSSIER_IMAGES_ACTIONS,
    descriptionKey: 'descarregues.cards.performances.description',
  },
  {
    id: 'logo',
    titleKey: 'descarregues.logoHeading',
    actions: LOGO_ACTIONS,
    descriptionKey: 'descarregues.cards.logo.description',
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

const multiselectModel = reactive({
  shows: [] as string[],
  workshops: [] as string[],
})
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
              class="text-center !text-white py-0"
              :claim-title="t('descarregues.claimTitle')"
              :subtitle="t('descarregues.claimSubtitle')"
              is-section-title
            />
            <div class="pb-5 grid w-full grid-cols-2 gap-5 md:grid-cols-4">
              <DownloadCard
                v-for="card in downloadCards"
                :key="card.id"
                :title="t(card.titleKey)"
                :actions="card.actions"
              >
                <template v-if="card.descriptionKey" #description>
                  <p>{{ t(card.descriptionKey) }}</p>
                </template>
                <template v-if="card.multiselect" #dropdown>
                  <FormMultiselectDropdown
                    v-model="multiselectModel[card.multiselect.contentType]"
                    :options="multiselectOptions[card.multiselect.contentType]"
                    :content-type="card.multiselect.contentType"
                    :label-key="`${card.multiselect.i18nPrefix}.selectLabel`"
                    :select-all-label-key="`${card.multiselect.i18nPrefix}.optionAll`"
                  />
                </template>
              </DownloadCard>
            </div>
          </div>
        </div>
        <div class="grid-layout min-w-full w-full h-full">
          <div class="layout-cols">
            <ClaimTitle
              class="text-center"
              :claim-title="t('shows.homeClaim')"
              is-section-title
            />
          </div>
        </div>
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24">
          <HighlightShows :reorder-index="getItemIndex('espectacles', 'plis-plas')" />
          <HighlightWorkshops :reorder-index="getItemIndex('tallers', 'bombolles-sabo')" />
          <HighlightPerformances :reorder-index="4" />
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
