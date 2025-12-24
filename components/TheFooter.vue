<script setup lang="ts">
import { CONTACT } from "~/constants";

const { t } = useI18n()
const { isMobileOrTablet } = useResponsive()

</script>
<template>
  <footer
    role="contentinfo"
    class="min-w-full w-full"
  >
    <FooterNavigation />
    <div class="grid-layout bg-black text-white text-center text-sm">
      <div class="layout-cols flex flex-wrap flex-row items-center justify-center gap-2 xl:gap-4 py-12">
        <SocialMedia />
        <b class="md:px-1">·</b>
        <a
          class="hover:opacity-80"
          :href="`mailto:${CONTACT.email}`"
        >
          {{ CONTACT.email }}
        </a>
        <b class="md:px-1">·</b>
        <a
          class="hover:opacity-80"
          :href="CONTACT.adressHref">
          {{ CONTACT.adress }}
        </a>
      </div>
    </div>
    <div class="grid-layout bg-neutral-900 py-6">
      <div class="layout-cols text-white m-auto flex flex-col lg:flex-row lg:justify-between w-full items-center gap-1 gap-y-4">
        <div class="flex flex-col lg:flex-row lg:flex-wrap justify-center items-center gap-1 gap-y-4 text-center text-xs">
          <p class="flex items-center gap-1 font-bold lg:text-xs text-sm">
            <CiaBrand class="text-white !w-8 !h-auto pr-1" />
            Companyia Filigranes, 2025
          </p>
          <b v-if="!isMobileOrTablet" class="px-2">·</b>
          <span>
            {{ t('footer.design.text') }}
            <a
              class="font-bold transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80"
              href="https://www.linkedin.com/in/anna-condal-vela/"
              target="_blank"
              rel="noopener nofollow"
            >Anna Condal</a>
          </span>
          <b v-if="!isMobileOrTablet" class="px-1">·</b>
          <span>
            {{ t('footer.foto.text') }}
            <a
              class="font-bold transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80"
              href="https://www.linkedin.com/in/gerard-bañó-4283162a"
              target="_blank"
              rel="noopener nofollow"
            >Gerard Bañó</a>
            <span class="px-1">|</span>
            <a
              class="font-bold transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80"
              href="https://www.martacardellach.com/"
              target="_blank"
              rel="noopener nofollow"
            >Marta Garcia</a>
            <span class="px-1">|</span>
            <a
              class="font-bold transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80"
              href="https://www.evabalcellsfotografia.cat/"
              target="_blank"
              rel="noopener nofollow"
            >Eva Balcells</a>
          </span>
        </div>
        <span v-if="isMobileOrTablet">·</span>
        <p class="text-center text-xs">
          <NuxtLinkLocale to="/avis-legal" class="transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80 cursor-pointer">
            {{ t('footer.legal.advice') }}
          </NuxtLinkLocale>
          <b class="px-2">·</b>
          <NuxtLinkLocale to="/politica-cookies" class="transition-opacity duration-200 border-b-2 border-white pb-1 border-opacity-0 hover:border-opacity-50 hover:opacity-80 cursor-pointer">
            {{ t('footer.legal.cookies') }}
          </NuxtLinkLocale>
        </p>
      </div>
    </div>
  </footer>
</template>
