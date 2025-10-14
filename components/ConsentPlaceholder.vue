<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useCookies } from "~/composables/use-cookies.composable";

interface Props {
  title: string;
  description: string;
}

defineProps<Props>();

const { t } = useI18n();
const { acceptAll, openModal } = useCookies();
</script>

<template>
  <div class="aspect-video bg-gray-200 flex flex-col items-center justify-center text-gray-600 p-4 gap-2">
    <h3 class="text-sm text-center font-semibold text-neutral-800">
      {{ title }}
    </h3>
    <p class="text-center text-sm mb-6">
      {{ description }}
    </p>
    <div class="flex gap-2">
      <FiliButton
        :text="t('consent.manageCookies')"
        button-class="px-3 py-1.5 text-sm !border-0 button-outline-neutral"
        :on-click="openModal"
      />
      <FiliButton
        :text="t('consent.acceptCookies')"
        button-class="px-3 py-1.5 text-sm !border-0 button-outline-primary"
        :on-click="acceptAll"
      />
    </div>
  </div>
</template>
