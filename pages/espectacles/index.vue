<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t, locale } = useI18n()
const { getTranslatedList } = useI18nUtils()

useHead({
  meta: [
    { name: 'description', content: t('shows.description') }
  ]
})

const synopsisItems = computed(() => [
  {
    synopsis: getTranslatedList('shows.vint-anys.synopsis', ['paragraph']),
    imageName: 'espectacles_vint-anys',
    imageRoute: 'espectacles',
    bgColor: 'bg-primary-500',
    alt: t('home.hero.alt'),
    title: t('routes.vint-anys'),
    infoButton: {
      href: '/espectacles/vint-anys',
      class: 'button-outline-primary'
    },
    dossierButton: {
      download: `CiaFiligranes-vint-anys-${locale.value}.pdf`,
      href: `/downloads/CiaFiligranes-vint-anys-${locale.value}.pdf`,
    }
  },
  {
    synopsis: getTranslatedList('shows.plis-plas.synopsis', ['paragraph']),
    imageName: 'espectacles_plis-plas',
    imageRoute: 'espectacles',
    bgColor: 'bg-primary-500',
    alt: t('shows.plis-plas.alt'),
    title: t('routes.plis-plas'),
    infoButton: {
      href: '/espectacles/plis-plas',
      class: 'button-outline-primary'
    },
    dossierButton: {
      download: `CiaFiligranes-plis-plas-${locale.value}.pdf`,
      href: `/downloads/CiaFiligranes-plis-plas-${locale.value}.pdf`,
    }
  },
  {
    synopsis: getTranslatedList('shows.circ-filixic.synopsis', ['paragraph']),
    imageName: 'espectacles_circ-filixic',
    imageRoute: 'espectacles',
    bgColor: 'bg-primary-500',
    alt: t('shows.circ-filixic.alt'),
    title: t('routes.circ-filixic'),
    infoButton: {
      href: '/espectacles/circ-filixic',
      class: 'button-outline-primary'
    },
    dossierButton: {
      download: `CiaFiligranes-circ-filixic-${locale.value}.pdf`,
      href: `/downloads/CiaFiligranes-circ-filixic-${locale.value}.pdf`,
    }
  },
  {
    synopsis: getTranslatedList('shows.circ-makutu.synopsis', ['paragraph']),
    imageName: 'espectacles_circ-makutu',
    imageRoute: 'espectacles',
    bgColor: 'bg-primary-500',
    alt: t('shows.circ-makutu.alt'),
    title: t('routes.circ-makutu'),
    infoButton: {
      href: '/espectacles/circ-makutu',
      class: 'button-outline-primary'
    },
    dossierButton: {
      download: `CiaFiligranes-circ-makutu-${locale.value}.pdf`,
      href: `/downloads/CiaFiligranes-circ-makutu-${locale.value}.pdf`,
    }
  },
  {
    synopsis: getTranslatedList('shows.circ-trinxeta.synopsis', ['paragraph']),
    imageName: 'espectacles_circ-trinxeta',
    imageRoute: 'espectacles',
    bgColor: 'bg-primary-500',
    alt: t('shows.circ-trinxeta.alt'),
    title: t('routes.circ-trinxeta'),
    infoButton: {
      href: '/espectacles/circ-trinxeta',
      class: 'button-outline-primary'
    },
    dossierButton: {
      download: `CiaFiligranes-circ-trinxeta-${locale.value}.pdf`,
      href: `/downloads/CiaFiligranes-circ-trinxeta-${locale.value}.pdf`,
    }
  },
  {
    synopsis: getTranslatedList('shows.freak-frac.synopsis', ['paragraph']),
    imageName: 'espectacles_freak-frac',
    imageRoute: 'espectacles',
    bgColor: 'bg-primary-500',
    alt: t('shows.freak-frac.alt'),
    title: t('routes.freak-frac'),
    infoButton: {
      href: '/espectacles/freak-frac',
      class: 'button-outline-primary'
    },
    dossierButton: {
      download: `CiaFiligranes-freak-frac-${locale.value}.pdf`,
      href: `/downloads/CiaFiligranes-freak-frac-${locale.value}.pdf`,
    }
  }
]);
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
        <SynopsisList :items="synopsisItems" />
        <HeroFooter image-name="espectacles_hero" image-route="espectacles" :alt="t('shows.hero.alt')" />
        <HireFili
          :title="t('shows.hire.title')"
          description="shows.hire.description"
        />
      </template>
    </MainContent>
  </div>
</template>
