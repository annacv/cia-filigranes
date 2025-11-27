<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";

definePageMeta({
  headerBackgroundColor: '#000'
})

const { t } = useI18n();

useHead({
  meta: [
    { name: 'description', content: t('contact.metaDescription') }
  ]
})
const getImageAlt = () => useImageAlt('contact');
</script>

<template>
  <div class="h-full bg-black">
    <div class="xs:h-[72px] lg:h-[87px]"/>
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
