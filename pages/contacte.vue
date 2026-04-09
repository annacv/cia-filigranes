<script setup lang="ts">
import { getImageByRoute } from "~/utils/image-by-route";

const { t } = useI18n();

useHead({
  meta: [
    { name: 'description', content: t('contact.metaDescription') }
  ]
})
const getImageAlt = () => useImageAlt('contact');
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="contacte_hero"
      image-route="contacte"
      :alt="t('shows.hero.alt')"
      background-position="center 60%"
      is-section-cover
    >
      <template #content>
        <SectionCoverTitle
          :title="t('contact.hero.title')"
          title-class="max-w-[310px] md:max-w-[448px] lg:max-w-[524px]"
        />
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrappedTop>
        <ContactCard />  
      </template>
      <template #wrapped>
        <HireContactSection
          class="pt-8"
          title-class="font-grotesk lg:text-5xl !p-0 !leading-none"
          :claim-title="t('hire.pageSectionTitleAlternative')"
          content-type="contact"
        />
      </template>
      <template #unwrapped>
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
      <template #unwrappedBottom>
        <BottomNavigation />
        <TheSupporters />
      </template>
    </MainContent>
  </div>
</template>
