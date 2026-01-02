<script setup lang="ts">
import type { ContentType, ImageRoute } from "~/types";
import { getItemsByRoute } from "~/utils/items-by-route";

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('shows', title);

useHead({
  meta: [
    { name: 'description', content: t('shows.metaDescription') }
  ]
})

const shows = getItemsByRoute('espectacles');

const synopsisItems = computed(() => {
  return shows?.children?.map((show) => {
    const title = t(`routes.${show}`)

    return {
      description: getTranslatedList(`shows.${show}.synopsis`, ['paragraph']),
      image: {
        imageName: `espectacles_${show}-3`,
        imageRoute: 'espectacles' as ImageRoute,
      },
      contentType: 'shows' as ContentType,
      alt: getImageAlt(title),
      title: t(`routes.${show}`),
      buttons: {
        infoButton: {
          href: `/espectacles/${show}`,
          class: 'button-outline-primary'
        },
        downloadButton: {
          download: `CiaFiligranes-${show}-${locale.value}.pdf`,
          href: `/downloads/CiaFiligranes-${show}-${locale.value}.pdf`,
        }
      }
    }
  }) || []
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="espectacles_hero"
      image-route="espectacles"
      :alt="t('shows.hero.alt')"
      background-position="center 40%"
    >
      <template #content>
        <SectionCoverTitle :title="t('shows.hero.title')" />
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <SynopsisList
          :claim="t('shows.claim')"
          :claim-title="t('shows.claimTitle')"
          :items="synopsisItems"
        />
        <HeroFooter
          image-name="espectacles_footer"
          image-route="espectacles"
          :alt="t('shows.hero.alt')"
          background-position="center 30%"
        />
        <HireFili
          :title="t('shows.hire.title')"
          description="shows.hire.description"
        />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
