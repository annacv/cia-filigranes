<script setup lang="ts">
import CoverTitle from "~/components/cover/CoverTitle.vue";
import HeroCover from "~/components/cover/HeroCover.vue";
import { COLLABORATION_ENTRIES } from "~/constants";
import type { ContentType, ImageRoute } from "~/types";

const { t } = useI18n()
const { getTranslatedList } = useI18nUtils()
const getImageAlt = (title?: string) => useImageAlt('shows', title);

useHead({
  meta: [
    { name: 'description', content: t('collaborations.metaDescription') }
  ]
})

const synopsisItems = computed(() => {
  return COLLABORATION_ENTRIES.map((entry) => {
    const title = t(`collaborations.${entry.i18nKey}.title`)

    return {
      description: getTranslatedList(`collaborations.${entry.i18nKey}.synopsis`, ['paragraph']),
      anchorId: entry.imageSlug,
      image: {
        imageName: `espectacles_${entry.imageSlug}-1`,
        imageRoute: 'espectacles' as ImageRoute,
      },
      contentType: 'shows' as ContentType,
      alt: getImageAlt(title),
      title,
      buttons: {
        infoButton: {
          href: entry.href,
          target: '_blank',
        },
      }
    }
  })
})
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="collaboracions_hero"
      image-route="collaboracions"
      :alt="t('collaborations.hero.alt')"
      background-position="center 40%"
      is-section-cover
    >
      <template #content>
        <CoverTitle
          is-section
          :title="t('collaborations.hero.title')"
          title-class="max-w-[310px] md:max-w-[490px] lg:max-w-[598px]"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <SynopsisList
          :claim="t('collaborations.claim')"
          :claim-title="t('collaborations.claimTitle')"
          :items="synopsisItems"
        />
        <HeroFooter
          image-name="collaboracions_footer"
          image-route="collaboracions"
          :alt="t('collaborations.hero.alt')"
          background-position="center 30%"
        />
        <HireFiliBanner
          :title="t('collaborations.hire.title')"
          description="collaborations.hire.description"
          text-color="text-white"
          bg-color="bg-primary-500"
        />
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
