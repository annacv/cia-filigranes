<script setup lang="ts">
import type { ContentType, ImageRoute } from "~/types";
import { getItemsByRoute } from "~/utils/items-by-route";

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('workshops', title);

useHead({
  meta: [
    { name: 'description', content: t('workshops.metaDescription') }
  ]
})

const workshops = getItemsByRoute('tallers');

const synopsisItems = computed(() => {
  return workshops?.children?.map((workshop) => {
    const title = t(`routes.${workshop}`)

    return {
      description: getTranslatedList(`workshops.${workshop}.synopsis`, ['paragraph']),
      image: {
        imageName: `tallers_${workshop}`,
        imageRoute: 'tallers' as ImageRoute,
      },
      contentType: 'workshops' as ContentType,
      alt: getImageAlt(title),
      title: t(`routes.${workshop}`),
      buttons: {
        infoButton: {
          href: `/tallers/${workshop}`,
          class: 'button-outline-secondary'
        },
        downloadButton: {
          download: `CiaFiligranes-${workshop}-${locale.value}.pdf`,
          href: `/downloads/CiaFiligranes-${workshop}-${locale.value}.pdf`,
        }
      }
    }
  }) || []
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="tallers_hero"
      image-route="tallers"
      :alt="t('workshops.hero.alt')"
      content-type="workshops"
    >
      <template #content>
        <SectionCoverTitle
          :title="t('workshops.hero.title')"
          title-class="max-w-[324px] md:max-w-[448px] lg:max-w-[504px]"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <SynopsisList
          :claim="t('workshops.claim')"
          :claim-title="t('workshops.claimTitle')"
          :items="synopsisItems"
        />
        <HeroFooter
          image-name="tallers_footer"
          image-route="tallers"
          :alt="t('workshops.hero.alt')"
          content-type="workshops"
        />
        <HireFili
          :title="t('workshops.hire.title')"
          description="workshops.hire.description"
        />
      </template>
    </MainContent>
  </div>
</template>
