<script setup lang="ts">
import ArrowDown from '~/assets/icons/arrow-down.svg'

defineProps<{
  title: string
  actionLabel: string
  href: string
  filename: string
  description?: string
}>()
</script>

<template>
  <article class="h-full flex flex-col gap-4 items-start border border-white p-6 lg:px-3.5 xl:px-5 2xl:px-6 text-white md:min-h-[277px]">
    <h3 class="mx-auto text-center text-xl font-semibold">
      {{ title }}
    </h3>
    <p v-if="description" class="text-left text-sm flex-1">
      {{ description }}
    </p>
    <FiliButton
      button-class="button-outline-primary w-full justify-center"
      :text="actionLabel"
      :href="href"
      :download="filename"
    >
      <template #text>
        {{ actionLabel }}
      </template>
      <template #icon-right>
        <ArrowDown class="h-4 w-4 shrink-0 !mt-0" aria-hidden="true" />
      </template>
    </FiliButton>
  </article>
</template>
