<script setup lang="ts">
import ArrowDown from "assets/icons/arrow-down.svg";

const { t } = useI18n()

const props = defineProps({
  abstract: {
    type: Array as () => Record<string, any>[],
    required: true,
    default: () => []
  },
  items: {
    type: Array as () => Record<string, any>[],
    required: true,
    default: () => []
  },
  button: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="flex lg:flex-row flex-col justify-between my-8 lg:my-12 gap-10 lg:gap-24">
    <div class="flex flex-col gap-4 lg:w-[68%] md:mb-6">
      <p
        v-for="item in abstract"
        :key="item.paragraph"
        class="text-lg lg:text-xl"
      >
        {{ item.paragraph }}
      </p>
    </div>

    <div class="flex flex-col gap-2 lg:w-[32%] mt-1.5">
      <ul
        class="flex flex-col gap-5"
      >
        <li
          v-for="item in items"
          :key="item.title"
          class="flex flex-col gap-2 text-sm lg:text-base"
        >
          <p class="font-bold">
            {{ item.title }}
          </p>
          <p class="font-light">
          {{ item.description }}
          </p>
        </li>
      </ul>
      <FiliButton
        :href="button.href"
        buttonClass="button-outline-neutral self-end"
        :text="t('button.dossier')"
        :download="button.download"
      >
        <template #text>
          {{ t('button.dossier') }}
        </template>
        <template #icon-right>
          <ArrowDown class="arrow-down self-end"/>
        </template>
      </FiliButton>
    </div>
  </div>
</template>
