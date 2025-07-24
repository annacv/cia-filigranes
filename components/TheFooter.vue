<script setup lang="ts">
  import { RRSS, CONTACT } from "~/constants";
  import CiaBrand from "~/components/CiaBrand.vue";
  import FacebookIcon from "~/assets/icons/facebook.svg";
  import InstagramIcon from "~/assets/icons/instagram.svg";
  import YoutubeIcon from "~/assets/icons/youtube.svg";
  import LinkedinIcon from "~/assets/icons/linkedin.svg";

  const { t } = useI18n()

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
  <div class="bg-black text-white text-center text-sm py-6">
    <div class="grid-layout">
      <div class="layout-cols flex flex-wrap flex-row items-center justify-center gap-4">
        <ul class="flex flex-row justify-center gap-4">
          <li v-for="(item, index) in RRSS" :key="index">
            <a :href="item" target="_blank" rel="noopener noreferrer">
              <Component
                :is="getIcon(item)"
                class="!w-5 !h-5 !mb-0"
              />
            </a>
          </li>
        </ul>
        <b class="md:px-1">·</b>
        <a :href="`mailto:${CONTACT.email}`">
          {{ CONTACT.email }}
        </a>
        <b class="md:px-1">·</b>
        <a :href="CONTACT.adressHref">
          {{ CONTACT.adress }}
        </a>
        <CiaBrand class="text-white !w-12 md:!w-8 !h-auto" />
      </div>
    </div>

  </div>
  <div class=" bg-neutral-900 text-white m-auto p-3">
    <p class="flex flex-wrap justify-center gap-1 text-center text-xs">
      Companyia Filigranes, 2025 <b class="px-2">·</b>
      {{ t('footer.design.text') }}
      <a
        href="https://www.linkedin.com/in/anna-condal-vela/"
        target="_blank"
        rel="noopener nofollow"
      >Anna Condal</a>
      <b class="px-1">·</b>
      {{ t('footer.foto.text') }}
      <a
        href="http://linkedin.com/in/gerard-bañó-4283162a"
        target="_blank"
        rel="noopener nofollow"
      >Gerard Bañó</a>
      <span class="px-1">&</span>
      <a
        href="http://www.martagc.com/"
        target="_blank"
        rel="noopener nofollow"
      >Marta Garcia</a>
    </p>
  </div>
  <div class="bg-quaternary-500 text-black py-1 px-3">
    <p class="text-center text-xs">
      {{ t('footer.legal.advice') }}
      <b class="px-1">|</b>
      {{ t('footer.legal.privacy') }}
    </p>
  </div>
  </footer>
</template>
