<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  buttonText: string
  href: string
  gradientClass: string
  contentPath: string
}>()

const { getTranslatedList } = useI18nUtils()

const description = computed(() =>
  getTranslatedList(props.contentPath, ['paragraph'])
)

const isList = computed(() => description.value.length > 1)


</script>

<template>
  <article :class="`${gradientClass} flex w-full h-full md:h-[402px] flex-col items-start gap-10 py-10 px-14 text-white`">
    <h3 class="text-left text-2xl font-semibold">
      {{ title }}
    </h3>
    <div class="flex min-h-0 w-full flex-1 flex-col">
      <component
        :is="isList ? 'ul' : 'p'"
        :class="['text-lg md:text-xl text-left', {'!leading-normal mt-1.5': !isList}]"
        :role="isList ? 'list' : undefined"
      >
        <component
          :is="isList ? 'li' : 'span'"
          v-for="item in description"
          :key="item.paragraph as string"
        >
          {{ item.paragraph }}
        </component>
      </component>
    </div>
    <div class="mt-auto pt-2">
      <FiliButton
        :href="href"
        button-class="button-outline-primary self-start"
        :text="buttonText"
      >
        <template #text>
          {{ buttonText }}
        </template>
      </FiliButton>
    </div>
  </article>
</template>
