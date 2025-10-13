<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSwitchLocalePath } from '#imports';
import type { LocaleCode } from "~/types";

interface LocaleObject {
  code: LocaleCode;
  name: string;
  file?: string;
  language?: string;
  [key: string]: any;
}

const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const selected = ref<LocaleCode>(locale.value as LocaleCode);
const isSelected = (code: string) => code === selected.value;

const ariaLabel = computed(() => t('selectLang'));

function changeLocale(code: LocaleCode) {
  selected.value = code;
  const path = switchLocalePath(code);
  if (path) {
    router.push({ path });
  }
}
</script>

<template>
  <div
    v-if="Array.isArray(locales) && locales.length > 0"
    class="flex gap-4"
    role="radiogroup"
    :aria-label="ariaLabel"
  >
    <button
      v-for="lang in (locales as LocaleObject[])"
      :key="lang.code"
      :value="lang.code"
      :aria-label="lang.name"
      :aria-checked="isSelected(lang.code)"
      :class="[
        'flex flex-col justify-center items-center',
        isSelected(lang.code) ? 'opacity-100' : 'opacity-20 hover:opacity-75'
      ]"
      @click="changeLocale(lang.code as LocaleCode)"
    >
      <span class="text-white text-sm">{{ lang.code }}</span>
      <span
        class="bg-white h-1 w-1 rounded-full mt-1"
        :class="isSelected(lang.code) ? 'opacity-100' : 'opacity-20 hover:opacity-100'"
      />
    </button>
  </div>
</template>
