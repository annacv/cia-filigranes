<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import type { ImageRoute } from "~/types";
import { getItemsByRoute } from "~/utils/";

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()

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
        imageName: `espectacles_${show}`,
        imageRoute: 'espectacles' as ImageRoute,
      },
      bgColor: 'bg-primary-500',
      alt: t(`shows.commonAlt`, {title: title}),
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
    <HeroCover image-name="espectacles_hero" image-route="espectacles" :alt="t('shows.hero.alt')">
      <template #content>
        <h1 class="p-5 font-grotesk uppercase text-white text-3xl md:text-5xl lg:text-6xl w-[300px] md:w-[448px] lg:w-[552px]">
          {{ t('shows.hero.title') }}
        </h1>
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <SynopsisList
          :claim="t('shows.claim')"
          :claimTitle="t('shows.claimTitle')"
          :items="synopsisItems"
        />
        <HeroFooter
          image-name="espectacles_hero"
          image-route="espectacles"
          :alt="t('shows.hero.alt')"
        />
        <HireFili
          :title="t('shows.hire.title')"
          description="shows.hire.description"
        />
      </template>
    </MainContent>
  </div>
</template>
