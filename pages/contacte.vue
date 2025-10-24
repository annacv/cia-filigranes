<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";
import { CONTACT } from "~/constants";
import ArrowRightIcon from "assets/icons/arrow-right.svg";

// Set header background color for this page
definePageMeta({
  headerBackgroundColor: '#000'
})

const { t } = useI18n();

useHead({
  meta: [
    { name: 'description', content: t('contact.metaDescription') }
  ]
})

const getImageAlt = (title?: string) => useImageAlt('contact', title);
const { canLoadGoogleMaps } = useCookies();
</script>

<template>
  <div class="h-full bg-black">
    <HeroCover
      image-name="contacte_hero"
      image-route="contacte"
      content-type="contact"
      :alt="getImageAlt()"
    >
      <template #content>
        <div class="p-5 font-grotesk uppercase text-black max-w-[352px] md:max-w-[442px] lg:max-w-[558px]">
          <h1 class="text-5xl lg:text-6xl">
            {{ t('contact.hero.title') }}
          </h1>
          <h2 class="text-3xl md:text-4xl lg:text-5xl">
            {{ t('contact.hero.subtitle') }}
          </h2>
        </div>
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <Synopsis
          :image="getImageByRoute('contacte', 'hero')"
          content-type="contact"
          :alt="getImageAlt()"
          show-full-content
        >
          <template #content>
            <div class="flex flex-col items-start gap-8">
              <h2 class="font-grotesk uppercase text-3xl lg:text-5xl">
                {{ t('contact.info.title') }}
              </h2>
              <div class=" flex flex-col items-start gap-4 font-semibold">
                <a class="flex gap-2 items-end" :href="`mailto:${CONTACT.email}`">
                  <ArrowRightIcon /><span class="hover:opacity-80">{{ CONTACT.email }}</span>
                </a>
                <a class="flex gap-2 items-end" :href="`tel:${CONTACT.phones.albert}`"> 
                  <ArrowRightIcon />Albert: <span class="hover:opacity-80">{{ CONTACT.phones.albert }}</span>
                </a>
                <a class="flex gap-2 items-end" :href="`tel:${CONTACT.phones.jordi}`">   
                  <ArrowRightIcon />Jordi: <span class="hover:opacity-80">{{ CONTACT.phones.jordi }}</span>
                </a>
              </div>
              
              <div class="flex flex-col items-start gap-2">
                <Transition
                  enter-active-class="transition-all duration-500 ease-out"
                  enter-from-class="opacity-0 transform scale-95"
                  enter-to-class="opacity-100 transform scale-100"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="opacity-100 transform scale-100"
                  leave-to-class="opacity-0 transform scale-95"
                  mode="out-in"
                >
                  <div v-if="canLoadGoogleMaps" key="map" class="w-full">
                    <iframe
                      :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5970.133862969208!2d2.0127018!3d41.56779600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a492c3e2155299%3A0x4d072d8f6b4f6768!2sCia%20Filigranes!5e0!3m2!1s${locale}!2s${locale}!4v1759615126607!5m2!1s${locale}!2s${locale}&lang=${locale}`"
                      class="w-full h-full aspect-video"
                      style="border:0;"
                      allowfullscreen
                      loading="lazy"
                      :title="t('contact.map.title')"
                    />
                  </div>
                  <div v-else key="placeholder" class="w-full">
                    <ConsentPlaceholder
                      :title="t('consent.map.title')"
                      :description="t('consent.map.consentRequired')"
                    />
                  </div>
                </Transition>
                <a class="flex gap-2 items-end hover:opacity-80 text-sm" :href="CONTACT.adressHref">
                  {{ CONTACT.adress }}
                </a>
              </div>
            </div>
          </template>
        </Synopsis>
        <Synopsis
          :image="getImageByRoute('contacte', 'hero')"
          content-type="contact"
          :alt="getImageAlt()"
          show-full-content
          is-full-reversed
        >
          <template #content>
            <div class="flex flex-col items-start gap-8 py-5 lg:py-20">
              <h2 class="font-grotesk text-3xl lg:text-5xl">
                {{ t('contact.rrss.title') }}
              </h2>
              <p class="text-lg lg:text-xl">
                {{ t('contact.rrss.description') }}
              </p>
              <SocialMedia size="w-7 h-7" gap="gap-4 xl:gap-6" />
            </div> 
          </template>
        </Synopsis>
      </template>
    </MainContent>
  </div>
</template>
