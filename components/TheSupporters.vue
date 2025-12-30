<script setup lang="ts">
const { t } = useI18n()

interface Supporter {
  name: string
  url?: string
  logo?: string
  alt?: string
}

const supporters: Supporter[] = [
  {
    name: 'tub-dassaig',
    url: 'https://tubdassaig.com/',
    alt: 'Tub d\'Assaig'
  },
  {
    name: 'apcc',
    url: 'https://www.apcc.cat/ca/',
    alt: 'APCC - Associació de Professionals de Circ de Catalunya'
  },
  {
    name: 'lestruch',
    url: 'https://lestruch.sabadell.cat/',
    alt: 'L\'Estruch - Fàbrica de creació de les arts en viu'
  },
  {
    name: 'generalitat-catalunya',
    alt: 'Generalitat de Catalunya, Departament de Cultura'
  }
]
</script>

<template>
  <section
    role="contentinfo"
    aria-label="Supporters"
    class="w-full border-t border-neutral-700"
  >
    <div class="grid-layout bg-neutral-900 text-white">
      <div class="layout-cols py-8 xl:py-12">
        <h2 class="text-sm xl:text-base font-semibold mb-6 xl:mb-8 text-center">
          {{ t('footer.supporters.title') }}
        </h2>
        <div class="flex flex-wrap items-center justify-center gap-6 xl:gap-8">
          <div
            v-for="(supporter, index) in supporters"
            :key="index"
            class="flex items-center justify-center"
          >
            <a
              v-if="supporter.url"
              :href="supporter.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${t('footer.supporters.visit')} ${supporter.alt || supporter.name}`"
              class="hover:opacity-80 transition-opacity duration-200"
            >
              <img
                v-if="supporter.logo"
                :src="supporter.logo"
                :alt="supporter.alt || supporter.name"
                class="h-8 xl:h-10 w-auto object-contain"
              />
              <span
                v-else
                class="text-xs xl:text-sm text-neutral-400"
              >
                {{ supporter.alt || supporter.name }}
              </span>
            </a>
            <div
              v-else
              class="flex items-center justify-center"
            >
              <img
                v-if="supporter.logo"
                :src="supporter.logo"
                :alt="supporter.alt || supporter.name"
                class="h-8 xl:h-10 w-auto object-contain opacity-60"
              />
              <span
                v-else
                class="text-xs xl:text-sm text-neutral-400"
              >
                {{ supporter.alt || supporter.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

