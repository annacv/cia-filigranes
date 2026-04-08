<script setup lang="ts">
import { CONTACT } from "~/constants";

const { t } = useI18n()
const { isMobile, isSmallTablet } = useResponsive()
const { openModal } = useCookies()

</script>
<template>
  <footer
    role="contentinfo"
    class="min-w-full w-full"
  >
    <div class="grid-layout bg-black text-white text-center text-sm">
      <div class="layout-cols flex flex-wrap flex-row items-center justify-center gap-2 xl:gap-4 py-8 md:py-12">
        <SocialMedia />
        <b class="md:px-1 leading-none">·</b>
        <a
          class="hover:opacity-80"
          :href="`mailto:${CONTACT.email}`"
        >
          {{ CONTACT.email }}
        </a>
        <b class="md:px-1 leading-none">·</b>
        <a
          class="hover:opacity-80"
          :href="CONTACT.adressHref">
          {{ CONTACT.adress }}
        </a>
      </div>
    </div>
    <div class="grid-layout bg-neutral-900 py-8 md:py-6">
      <div class="layout-cols text-white m-auto flex flex-col xl:flex-row lg:justify-between w-full items-center gap-1 gap-y-4">
        <div class="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center gap-1 gap-y-4 text-center text-xs">
          <p class="flex items-center gap-1 font-bold lg:text-xs text-sm">
            <CiaBrand class="text-white !w-8 md:!w-6 !h-auto pr-1" />
            Companyia Filigranes, 2026
          </p>
          <b v-if="!isMobile || !isSmallTablet" class="px-2 leading-none">·</b>
          <span>
            {{ t('footer.design.text') }}
            <a
              class="font-bold transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80"
              href="https://www.linkedin.com/in/anna-condal-vela/"
              target="_blank"
              rel="noopener nofollow"
            >Anna Condal</a>
          </span>
          <b v-if="!isMobile ||!isSmallTablet" class="px-1 leading-none">·</b>
          <span>
            {{ t('footer.foto.text') }}
            <a
              class="font-bold transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80"
              href="https://www.linkedin.com/in/gerard-bf-4283162a/"
              target="_blank"
              rel="noopener nofollow"
            >Gerard Bañó</a>
            <span class="px-1 leading-none">|</span>
            <a
              class="font-bold transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80"
              href="https://www.martacardellach.com/"
              target="_blank"
              rel="noopener nofollow"
            >Marta Garcia</a>
            <span class="px-1 leading-none">|</span>
            <a
              class="font-bold transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80"
              href="https://www.evabalcellsfotografia.cat/"
              target="_blank"
              rel="noopener nofollow"
            >Eva Balcells</a>
          </span>
        </div>
        <b v-if="isMobile || isSmallTablet" class="leading-none">·</b>
        <p class="h-full flex flex-wrap justify-center items-center text-center text-xs">
          <NuxtLinkLocale to="/avis-legal" class="transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80 cursor-pointer">
            {{ t('footer.legal.advice') }}
          </NuxtLinkLocale>
          <b class="px-2 leading-none">·</b>
          <NuxtLinkLocale to="/politica-cookies" class="transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80 cursor-pointer">
            {{ t('footer.legal.cookies') }}
          </NuxtLinkLocale>
          <b class="px-2 leading-none">·</b>
          <NuxtLinkLocale to="/politica-privacitat" class="transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80 cursor-pointer">
            {{ t('footer.legal.privacy') }}
          </NuxtLinkLocale>
          <b class="px-2 leading-none">·</b>
          <button
            type="button"
            class="transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80 cursor-pointer"
            @click="openModal"
          >
            {{ t('footer.legal.manageCookies') }}
          </button>
        </p>
      </div>
    </div>
  </footer>
</template>
