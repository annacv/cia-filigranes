<script setup lang="ts">
import { CONTACT } from "~/constants";
import ArrowRight from "~/assets/icons/arrow-right.svg";	

const { isMobile } = useDevice()
const { t, locale } = useI18n()
const { canLoadGoogleMaps } = useCookies();
const desktopClip = 'polygon(0% 100%, 80% 100%, 96% 0%, 0% 0%)';
const mobileClip = 'polygon(0% 0%, 100% 0%, 100% 96%, 50% 100%, 0% 96%)';

</script>

<template>
  <div
    class="p-0 grid-layout bg-quaternary-500 text-neutral-900"
    :style="{ clipPath: isMobile ? mobileClip : 'none'}"
  >
    <div class="flex flex-col md:flex-row gap-0 xl:gap-5 layout-cols--to-left">
      <div
        class="w-full h-[400px] md:h-auto bg-no-repeat bg-cover items-center shadow transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        :style="{
          backgroundPosition: 'center center',
          clipPath: isMobile ? 'none' : desktopClip
        }"
      >
        <ClientOnly>
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 transform scale-95"
            enter-to-class="opacity-100 transform scale-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100 transform scale-100"
            leave-to-class="opacity-0 transform scale-95"
            mode="out-in"
          >
            <div v-if="canLoadGoogleMaps" key="map" class="w-full h-full">
              <iframe
                :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5970.133862969208!2d2.0127018!3d41.56779600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a492c3e2155299%3A0x4d072d8f6b4f6768!2sCia%20Filigranes!5e0!3m2!1s${locale.value}!2s${locale.value}!4v1759615126607!5m2!1s${locale.value}!2s${locale.value}&lang=${locale.value}`"
                class="w-full h-full aspect-video"
                style="border:0;"
                allowfullscreen
                loading="lazy"
                :title="t('consent.map.title')"
              />
            </div>
            <div v-else key="placeholder" class="w-full">
              <ConsentPlaceholder
                :title="t('consent.map.title')"
                :description="t('consent.map.consentRequired')"
              />
            </div>
          </Transition>
          <template #fallback>
            <div class="w-full aspect-video bg-gray-200 flex flex-col items-center justify-center text-gray-600 p-4 gap-2">
              <ConsentPlaceholder
                :title="t('consent.map.title')"
                :description="t('consent.map.consentRequired')"
              />
            </div>
          </template>
        </ClientOnly>
      </div>
      <div class="w-full lg:w-[50%] flex flex-col gap-4 px-5 py-10 lg:py-20 2xl:py-36">
        <h2 class="font-grotesk text-4xl lg:text-5xl">
          {{ t('contact.info.title') }}
        </h2>
        <p class="text-3xl lg:text-4xl mb-4 max-w-[85%]">
          {{ t('contact.info.subtitle') }}
        </p>
        <div class=" flex flex-col items-start gap-6 font-semibold">
          <a class="flex gap-2 items-center" :href="`mailto:${CONTACT.email}`">
            <ArrowRight class="self-end !h-4 !w-4"/><span class="hover:opacity-80">{{ CONTACT.email }}</span>
          </a>
          <a class="flex gap-2 items-center" :href="`tel:${CONTACT.phones.albert}`"> 
            <ArrowRight class="self-end !h-4 !w-4"/><span class="hover:opacity-80">Albert: {{ CONTACT.phones.albert }}</span>
          </a>
          <a class="flex gap-2 items-center" :href="`tel:${CONTACT.phones.jordi}`">   
            <ArrowRight class="self-end !h-4 !w-4"/>Jordi: <span class="hover:opacity-80">{{ CONTACT.phones.jordi }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>