<script setup lang="ts">
import { getItemIndex } from "~/utils/get-item-index";

const { t } = useI18n()

useHead({
  meta: [
    { name: 'description', content: t('descarregues.metaDescription') }
  ]
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="descarregues_hero"
      image-route="descarregues"
      :alt="t('commonAlt')"
      background-position="center center"
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
        <div class="py-10">
          <div class="grid-layout bg-gradient-primary">
            <div class="layout-cols">
              <ClaimTitle
                class="text-center"
                :claim-title="t('descarregues.claimTitle')"
                :subtitle="t('descarregues.claimSubtitle')"
                is-section-title
              />
              <ul class="grid grid-cols-2 md:grid-cols-4 text-white">
                <li>
                  <h2>{{ t('routes.espectacles') }}</h2>
                </li>
                <li>
                  <h2>{{ t('routes.tallers') }}</h2>
                </li>
                <li>
                  <h2>{{ t('routes.animacions') }}</h2>
                </li>
                <li>
                  <h2>{{ t('descarregues.logoHeading') }}</h2>
                </li>
              </ul>
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
        <div class="flex flex-col gap-y-8 lg:gap-y-12 xl:gap-y-24 mb-8 lg:mb-12 xl:mb-24 2xl:mb-32">
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
