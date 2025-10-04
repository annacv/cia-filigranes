<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getImageByRoute } from "~/utils/image-by-route";
import { CONTACT } from "~/constants";

const { t, locale } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('contact');

useHead({
  meta: [
    { name: 'description', content: t('contact.metaDescription') }
  ]
})

const abstract = getTranslatedList('contact.synopsis', ['paragraph'])
const synopsis = getTranslatedList('contact.synopsis', ['paragraph'])

</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="contacte_hero"
      image-route="contacte"
      content-type="contact"
      :alt="getImageAlt()"
    >
      <template #content>
        <h1 class="px-5 lg:px-0 font-grotesk uppercase text-white lg:max-w-[543px] text-4xl md:text-5xl lg:text-6xl">
          {{ t('contact.hero.title') }}
        </h1>
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <Synopsis
          :description="abstract"
          :image="getImageByRoute('contacte', 'hero')"
          content-type="contact"
          :alt="getImageAlt()"
          show-full-content
        >
          <template #content>
            <div class="flex flex-col items-start gap-8 py-5 lg:py-20">
              <a
                class="font-bold hover:opacity-80"
                :href="`mailto:${CONTACT.email}`"
              >
                {{ CONTACT.email }}
              </a>
              <a
                class="font-bold hover:opacity-80"
                :href="`mailto:${CONTACT.phones.albert}`"
              >
                Albert: {{ CONTACT.phones.albert }}
              </a>
              <a
                class="font-bold hover:opacity-80"
                :href="`mailto:${CONTACT.phones.jordi}`"
              >
                Jordi: {{ CONTACT.phones.jordi }}
              </a>
              <div class="flex flex-col items-start gap-2">
                <iframe
                  :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5970.133862969208!2d2.0127018!3d41.56779600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a492c3e2155299%3A0x4d072d8f6b4f6768!2sCia%20Filigranes!5e0!3m2!1sen!2ses!4v1759615126607!5m2!1sen!2ses&lang=${locale}`"
                  width="600"
                  height="450"
                  style="border:0;"
                  allowfullscreen
                  loading="lazy"
                  :title="t('contact.map.title')"
                >
                </iframe>
                <a
                  class="font-bold hover:opacity-80"
                  :href="CONTACT.adressHref">
                  {{ CONTACT.adress }}
                </a>
              </div>
            </div>
          </template>
        </Synopsis>
        <Synopsis
          :description="synopsis"
          :image="getImageByRoute('contacte', 'hero')"
          content-type="contact"
          :alt="getImageAlt()"
          show-full-content
          isFullReversed
        >
        <template #content>
          <div class="flex flex-col items-start gap-8 py-5 lg:py-20">
            <h2 class="font-grotesk text-3xl lg:text-5xl">
              {{ t('contact.rrss.title') }}
            </h2>
            <p class="text-lg lg:text-xl">
              {{ t('contact.rrss.description') }}
            </p>
            <SocialMedia />
          </div> 
        </template>
        </Synopsis>
      </template>
    </MainContent>
  </div>
</template>
