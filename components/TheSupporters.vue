<script setup lang="ts">
import { GLOB_IMPORTS } from '~/constants'

const { t } = useI18n()

interface Supporter {
  url: string
  alt: string
  logoName: string
}

const { locale } = useI18n()

const getGeneUrl = (locale: string) => {
  switch (locale) {
    case 'ca':
      return 'https://cultura.gencat.cat/ca/inici/'
    case 'es':
      return 'https://cultura.gencat.cat/ca/inici/index.html#googtrans(ca|es)'
    case 'en':
      return 'https://cultura.gencat.cat/ca/inici/index.html#googtrans(ca|en)'
  }
  return `https://cultura.gencat.cat/ca/inici/`
}

/**
 * Loads an image URL from commonImages
 */
async function loadLogoUrl(logoName: string): Promise<string | undefined> {
  try {
    const commonImages = GLOB_IMPORTS.commonImages
    const imageKey = Object.keys(commonImages).find(path => {
      const filename = path.split('/').pop() || path
      return filename === `${logoName}.webp` || filename.includes(logoName)
    })
    
    if (!imageKey || !commonImages[imageKey]) {
      return undefined
    }
    
    const url = await commonImages[imageKey]()
    return typeof url === 'string' ? url : undefined
  } catch (error) {
    console.warn(`[loadLogoUrl] Failed to load logo ${logoName}:`, error)
    return undefined
  }
}

const supportersData = computed<Supporter[]>(() => [
  {
    url: 'https://tubdassaig.com/',
    alt: 'Tub d\'Assaig',
    logoName: 'logo-tub'
  },
  {
    url: 'https://www.apcc.cat/ca/',
    alt: 'APCC - Associació de Professionals de Circ de Catalunya',
    logoName: 'logo-apcc'
  },
  {
    url: 'https://clowns.org/ca/',
    alt: 'Pallassos Sense Fronteres',
    logoName: 'logo-psf'
  },
  {
    url: getGeneUrl(locale.value),
    alt: 'Generalitat de Catalunya, Departament de Cultura',
    logoName: 'logo-dep-cultura'
  }
])

// Load logo URLs once (logo names are static)
const { data: logoUrls } = await useAsyncData<Record<string, string | undefined>>(
  'supporters-logos',
  async () => {
    const urls: Record<string, string | undefined> = {}
    const logoNames = supportersData.value.map(supporter => supporter.logoName)
    for (const logoName of logoNames) {
      urls[logoName] = await loadLogoUrl(logoName)
    }
    return urls
  },
  {
    server: true,
    default: () => ({} as Record<string, string | undefined>)
  }
)

const supporters = computed<Supporter[]>(() => supportersData.value)

const getLogoUrl = (logoName: string) => logoUrls.value?.[logoName]
</script>

<template>
  <section
    role="contentinfo"
    aria-label="Supporters"
    class="w-full"
  >
    <div class="grid-layout bg-neutral-900 text-white">
      <div class="layout-cols py-2 xl:py-4 border-t border-neutral-600">
        <h2 class="flex justify-start text-sm font-semibold mb-2 xl:mb-4 text-center">
          {{ t('footer.supporters.title') }}
        </h2>
        <div class="flex flex-wrap items-center justify-center gap-6 xl:gap-8">
          <div
            v-for="(supporter, index) in supporters"
            :key="index"
            class="flex items-center justify-center"
          >
            <a
              :href="supporter.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${t('footer.supporters.visit')} ${supporter.alt}`"
              class="hover:opacity-80 transition-opacity duration-200"
            >
              <img
                :src="getLogoUrl(supporter.logoName)"
                :alt="supporter.alt"
                class="w-auto object-contain"
                :class="supporter.logoName === 'logo-tub' ? 'h-14 xl:h-16': 'h-8 xl:h-10'"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

