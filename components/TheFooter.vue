<script setup lang="ts">
  import { RRSS, CONTACT } from "~/constants";
  import CiaBrand from "~/components/CiaBrand.vue";
  import FacebookIcon from "~/assets/icons/facebook.svg";
  import InstagramIcon from "~/assets/icons/instagram.svg";
  import YoutubeIcon from "~/assets/icons/youtube.svg";
  import LinkedinIcon from "~/assets/icons/linkedin.svg";

  const { t } = useI18n()
  const { isMobileOrTablet } = useDevice()

  const socialIcons = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    youtube: YoutubeIcon,
    linkedin: LinkedinIcon
  }

  const getIcon = (url: string) => {
    const platform = Object.keys(socialIcons).find(platform =>
      url.includes(platform)
    )
    return platform ? socialIcons[platform as keyof typeof socialIcons] : null
  }

</script>
<template>
  <footer
    role="contentinfo"
    class="min-w-full w-full"
  >
    <div class="grid-layout bg-black text-white text-center text-sm">
      <div class="layout-cols flex flex-wrap flex-row items-center justify-center gap-2 xl:gap-4 py-12">
        <ul class="flex flex-row justify-center gap-2 xl:gap-4">
          <li v-for="(item, index) in RRSS" :key="index">
            <a :href="item" target="_blank" rel="noopener noreferrer">
              <Component
                :is="getIcon(item)"
                class="!w-5 !h-5 !mb-0 hover:opacity-80"
              />
            </a>
          </li>
        </ul>
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
      <div class="layout-cols text-white m-auto flex flex-col xl:flex-row xl:justify-between w-full items-center gap-1 gap-y-4">
        <div class="flex flex-col xl:flex-row xl:flex-wrap justify-center items-center gap-1 gap-y-4 text-center text-xs">
          <p class="flex items-center gap-1 font-bold">
            <CiaBrand class="text-white !w-8 !h-auto pr-1" />
            Companyia Filigranes, 2025
          </p>
          <b v-if="!isMobileOrTablet" class="px-2">·</b>
          <span>
            {{ t('footer.design.text') }}
          <a
            class="cursor-pointer hover:opacity-80"
            href="https://www.linkedin.com/in/anna-condal-vela/"
            target="_blank"
            rel="noopener nofollow"
          >Anna Condal</a>
          </span>
          <b v-if="!isMobileOrTablet" class="px-1">·</b>
          <span>
            {{ t('footer.foto.text') }}
            <a
              class="hover:opacity-80"
              href="http://linkedin.com/in/gerard-bañó-4283162a"
              target="_blank"
              rel="noopener nofollow"
            >Gerard Bañó</a>
            <span class="px-1">&</span>
            <a
              class="hover:opacity-80"
              href="http://www.martagc.com/"
              target="_blank"
              rel="noopener nofollow"
            >Marta Garcia</a>
          </span>
        </div>
        <span v-if="isMobileOrTablet">·</span>
        <p class="text-center text-xs">
          <span class="hover:opacity-80 cursor-pointer">{{ t('footer.legal.advice') }}</span>
          <b class="px-2">·</b>
          <span class="hover:opacity-80 cursor-pointer">{{ t('footer.legal.privacy') }}</span>
        </p>
      </div>
    </div>
  </footer>
</template>
