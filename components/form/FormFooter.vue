<script setup lang="ts">
import CircleIcon from '~/assets/icons/circle.svg'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="bg-neutral-100 h-0.5 rounded-full" />
    <div class="flex gap-4 justify-between">
      <p class="flex gap-2 items-baseline text-neutral-900">
        <sub class="font-bold text-base !leading-none">*</sub>
        <span class="text-xs">{{ t('hire.requiredFields') }}</span>
      </p>
      <p class="flex gap-2 items-baseline text-xs text-neutral-900">
        <CircleIcon class="!w-2 !h-2 text-neutral-900" />
        <span>
          <span class="hidden md:inline">{{ t('hire.privacyNote') }}</span>
          <NuxtLinkLocale
            to="/politica-privacitat"
            class="ml-1 underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            {{ t('footer.legal.privacy') }}
          </NuxtLinkLocale>
        </span>
      </p>
    </div>
  </div>
</template>
