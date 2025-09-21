<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import type { ContentType, ImageRoute } from "~/types";
import { getItemsByRoute } from "~/utils/items-by-route";
import { useGetImageAlt } from "~/composables/use-get-image-alt.composable";

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()
const { getImageAlt } = useGetImageAlt('workshops');

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
        <h1 class="p-5 font-grotesk uppercase text-white text-3xl md:text-5xl lg:text-6xl w-[300px] md:w-[448px] lg:w-[552px]">
          {{ t('workshops.hero.title') }}
        </h1>
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <SynopsisList
          :claim="t('workshops.claim')"
          :claimTitle="t('workshops.claimTitle')"
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
