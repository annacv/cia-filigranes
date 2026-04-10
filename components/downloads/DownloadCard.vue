<script setup lang="ts">
import ArrowDown from '~/assets/icons/arrow-down.svg'

defineProps<{
  title: string
  actions: { labelKey: string }[]
}>()

const emit = defineEmits<{
  download: [labelKey: string]
}>()

const { t } = useI18n()

function handleDownload(labelKey: string) {
  emit('download', labelKey)
}
</script>

<template>
  <article class="h-full flex flex-col gap-4 items-start border border-white p-6 text-white">
    <h3 class="mx-auto text-center text-xl font-semibold">
      {{ title }}
    </h3>
    <div
      v-if="$slots.description"
      class="text-left text-sm flex-1"
    >
      <slot name="description" />
    </div>
    <div v-if="$slots.dropdown" class="h-full w-full">
      <slot name="dropdown" />
    </div>
    <div class="flex gap-2">
      <FiliButton
        v-for="(action, index) in actions"
        :key="`${action.labelKey}-${index}`"
        type="button"
        button-class="button-outline-primary w-full justify-center"
        :text="t(action.labelKey)"
        :on-click="() => handleDownload(action.labelKey)"
      >
        <template #text>
          {{ t(action.labelKey) }}
        </template>
        <template #icon-right>
          <ArrowDown class="h-4 w-4 shrink-0 !mt-0" aria-hidden="true" />
        </template>
      </FiliButton>
    </div>
  </article>
</template>
