<template>
  <form class="language-selector">
    <select
      id="selectLang"
      :aria-label="$t('selectLang')"
      class="language-selector__field"
      @change="onLocaleChanged"
    >
      <option
        v-for="lang in (locales as LocaleObject[])"
        :key="lang.code"
        :value="lang.code"
        :aria-label="lang.name"
        :aria-selected="lang.code === locale"
      >
        {{ lang.code }}
      </option>
    </select>
  </form>
</template>

<script setup lang="ts">
import { LocaleObject } from "@nuxtjs/i18n/dist/runtime/composables"

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();

function onLocaleChanged(event: Event) {
  const target = event.target as HTMLInputElement
  router.push({ path: switchLocalePath(target.value) })
}

</script>
