<script setup lang="ts">
import ArrowDown from '~/assets/icons/arrow-down.svg'
import type { CardImage } from '~/types'
import type { MultiselectContentType, SpecificActionId } from '~/types/downloads'

const props = defineProps<{
  title: string
  image: CardImage
  imageAlt: string
  contentType: MultiselectContentType
  disabled?: boolean
  busy?: boolean
}>()

const emit = defineEmits<{
  download: [action: SpecificActionId]
}>()

const { t } = useI18n()

const buttonClass = computed(() =>
  props.contentType === 'workshops'
    ? 'button-solid-secondary hover:bg-secondary-500 hover:border-secondary-500'
    : 'button-solid-primary hover:bg-primary-500 hover:border-primary-500'
)

</script>

<template>
  <article class="relative group w-[277px] 2xl:w-[320px] aspect-square contain-card">
    <CardImage
      :image="image"
      :content-type="contentType"
      :image-alt="imageAlt"
      use-internal-touch-state
    />
    <header :class="`absolute top-4 left-6 mr-6`">
      <h3 class="[word-spacing:-6%] sm:[word-spacing:0%] uppercase text-lg md:text-xl font-grotesk font-bold text-white !leading-none">
        {{ title }}
      </h3>
    </header>
    <footer class="absolute inset-x-0 bottom-3 flex flex-wrap items-center justify-center gap-2 p-3">
      <FiliButton
        type="button"
        :button-class="buttonClass"
        :text="t('button.dossier')"
        :disabled="disabled"
        :aria-busy="busy"
        :on-click="() => emit('download', 'dossier')"
      >
        <template #text>
          {{ t('button.dossier') }}
        </template>
        <template #icon-right>
          <ArrowDown class="h-3 w-3 shrink-0 !mt-0" aria-hidden="true" />
        </template>
      </FiliButton>
      <FiliButton
        type="button"
        :button-class="buttonClass"
        :text="t('button.images')"
        :disabled="disabled"
        :aria-busy="busy"
        :on-click="() => emit('download', 'images')"
      >
        <template #text>
          {{ t('button.images') }}
        </template>
        <template #icon-right>
          <ArrowDown class="h-3 w-3 shrink-0 !mt-0" aria-hidden="true" />
        </template>
      </FiliButton>
    </footer>
  </article>
</template>
