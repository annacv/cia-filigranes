<script setup lang="ts">
import { computed } from 'vue'
import { getImageByRoute } from "~/utils/image-by-route";
import { useResponsive } from "~/composables/use-responsive.composable";
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from "~/constants";

definePageMeta({
  headerBackgroundColor: '#000'
})

const { t } = useI18n();
const { isMobile } = useResponsive();

useHead({
  meta: [
    { name: 'description', content: t('contact.metaDescription') }
  ]
})
const getImageAlt = () => useImageAlt('contact');

const headerHeight = computed(() => isMobile.value ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT);
</script>

<template>
  <div class="h-full bg-quaternary-500">
    <div :style="{ height: headerHeight }"/>
    <MainContent>
      <template #unwrapped>
        <ContactCard />
        <Synopsis
          :image="getImageByRoute('contacte', 'contacte-1')"
          content-type="contact"
          :alt="getImageAlt()"
          show-full-content
          background-position="center 30%"
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
