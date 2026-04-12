<script setup lang="ts">
import OrganizersCard from './OrganizersCard.vue'

const { t } = useI18n()
</script>

<template>
  <div class="grid-layout py-4 md:py-8">
    <div class="layout-cols">
      <ClaimTitle
        class="text-center"
        :claim-title="t('home.organizers.claimTitle')"
        :subtitle="t('home.organizers.claimSubtitle')"
        is-section-title
      />
      <div
        class="grid w-full min-w-0 grid-cols-2 gap-5 pb-0 px-4 md:gap-8 xl:px-20 [&>article]:min-w-0"
      >
        <OrganizersCard
          gradient-class="bg-gradient-primary-bottom"
          :title="t('home.organizers.downloads.title')"
          :button-text="t('home.organizers.downloads.button')"
          href="/descarregues"
          content-path="home.organizers.downloads.content"
        />
        <OrganizersCard
          gradient-class="bg-gradient-primary-reverse"
          :title="t('home.organizers.contact.title')"
          :button-text="t('home.organizers.contact.button')"
          href="/#home-contact"
          content-path="home.organizers.contact.content"
        />
      </div>
    </div>
  </div>
</template>
