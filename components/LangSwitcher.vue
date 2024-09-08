<template>
  <div
    class="flex gap-4" role="radiogroup"
    :aria-label="$t('selectLang')"
  >
    <button
      v-for="lang in (locales as LocaleObject[])"
      :key="lang.code"
      :value="lang.code"
      :aria-label="lang.name"
      :aria-checked="isSelected(lang.code)"
      :class="isSelected(lang.code) ? 'opacity-100' : 'opacity-20 hover:opacity-75'"
      class="flex flex-col justify-center items-center"
      @click="changeLocale(lang.code)"
    >
      <span class="text-white text-sm">{{ lang.code }}</span>
      <span class="bg-white h-1 w-1 rounded-full mt-1" :class="isSelected(lang.code) ? 'opacity-100' : 'opacity-20 hover:opacity-100'"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables"

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();
const selected = ref<string>(locale.value);

const isSelected = (code: string) => code === selected.value;

function changeLocale(code: string) {
  router.push({ path: switchLocalePath(code) })
  selected.value = code;
}
</script>