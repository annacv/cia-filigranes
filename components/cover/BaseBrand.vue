<script setup lang="ts">
import type { LocaleCode } from '~/types'

import CircFilixicBrand from '~/assets/brands/circ-filixic-brand.svg?raw'
import CircFilixicBrandEn from '~/assets/brands/circ-filixic-brand-en.svg?raw'
import CircFilixicBrandEs from '~/assets/brands/circ-filixic-brand-es.svg?raw'
import CircMakutuBrand from '~/assets/brands/circ-makutu-brand.svg?raw'
import CircMakutuBrandEn from '~/assets/brands/circ-makutu-brand-en.svg?raw'
import CircMakutuBrandEs from '~/assets/brands/circ-makutu-brand-es.svg?raw'
import CircTrinxetaBrand from '~/assets/brands/circ-trinxeta-brand.svg?raw'
import CircTrinxetaBrandEn from '~/assets/brands/circ-trinxeta-brand-en.svg?raw'
import CircTrinxetaBrandEs from '~/assets/brands/circ-trinxeta-brand-es.svg?raw'
import FreakFracBrand from '~/assets/brands/freak-frac-brand.svg?raw'
import FreakFracBrandEn from '~/assets/brands/freak-frac-brand-en.svg?raw'
import FreakFracBrandEs from '~/assets/brands/freak-frac-brand-es.svg?raw'
import PlisPlasBrand from '~/assets/brands/plis-plas-brand.svg?raw'
import VintAnysBrand from '~/assets/brands/vint-anys-brand.svg?raw'
import VintAnysBrandEn from '~/assets/brands/vint-anys-brand-en.svg?raw'
import VintAnysBrandEs from '~/assets/brands/vint-anys-brand-es.svg?raw'

defineOptions({
  inheritAttrs: false
})

type BrandSlug =
  | 'circ-filixic'
  | 'circ-makutu'
  | 'circ-trinxeta'
  | 'freak-frac'
  | 'plis-plas'
  | 'vint-anys'

const DEFAULT_SIZE_CLASS = 'w-[310px] md:w-[348px] lg:w-[448px] xl:w-[548px] 2xl:w-[648px]'
const FREAK_FRAC_SIZE_CLASS = 'w-[350px] md:w-[422px] lg:w-[522px] xl:w-[622px] 2xl:w-[722px]'

const props = defineProps<{
  slug: BrandSlug
}>()

const { locale, t } = useI18n()

const brandBySlug = {
  'circ-filixic': {
    ca: CircFilixicBrand,
    en: CircFilixicBrandEn,
    es: CircFilixicBrandEs,
  },
  'circ-makutu': {
    ca: CircMakutuBrand,
    en: CircMakutuBrandEn,
    es: CircMakutuBrandEs,
  },
  'circ-trinxeta': {
    ca: CircTrinxetaBrand,
    en: CircTrinxetaBrandEn,
    es: CircTrinxetaBrandEs,
  },
  'freak-frac': {
    ca: FreakFracBrand,
    en: FreakFracBrandEn,
    es: FreakFracBrandEs,
  },
  'plis-plas': {
    ca: PlisPlasBrand,
  },
  'vint-anys': {
    ca: VintAnysBrand,
    en: VintAnysBrandEn,
    es: VintAnysBrandEs,
  },
} satisfies Record<BrandSlug, { ca: unknown; en?: unknown; es?: unknown }>

const localeCode = computed(() => {
  const currentLocale = locale.value as LocaleCode
  return currentLocale === 'en' || currentLocale === 'es' ? currentLocale : 'ca'
})

const brandAlt = computed(() => t(`routes.${props.slug}`))
const brandMarkup = computed(() => {
  const selectedBrand = brandBySlug[props.slug] as { ca: string; en?: string; es?: string }
  const markup = selectedBrand[localeCode.value] ?? selectedBrand.ca

  // This avoids inheriting nuxt icon classes
  return markup.replace(
    '<svg',
    '<svg aria-hidden="true" focusable="false"',
  )
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <span
    :class="[props.slug === 'freak-frac' ? FREAK_FRAC_SIZE_CLASS : DEFAULT_SIZE_CLASS, 'block h-auto md:mt-8 lg:mt-0']"
    role="img"
    :aria-label="brandAlt"
    v-html="brandMarkup"
  />
</template>

<style scoped>
:deep(svg) {
  display: block;
  width: 100%;
  height: auto;
}
</style>
