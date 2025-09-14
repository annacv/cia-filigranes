<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ImageRoute } from "~/types";

const { t } = useI18n()

const props = defineProps({
  items: {
    type: Array as () => Array<{
      synopsis: Array<Record<string, any>>
      imageName: string
      imageRoute: string
      bgColor: string
      alt: string
      title: string
      isReversed?: boolean
      infoButton: {
        href: string
        class: string
      }
      dossierButton: {
        href: string
        download: string
      }
    }>,
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div>
    <Synopsis
      v-for="(item, index) in items"
      :key="index"
      :synopsis="item.synopsis"
      :image-name="item.imageName"
      :image-route="item.imageRoute as ImageRoute"
      :bg-color="item.bgColor"
      :alt="item.alt"
      :title="item.title"
      :is-reversed="(index + 1) % 2 === 0"
      :info-button="item.infoButton"
      :dossier-button="item.dossierButton"
    />
  </div>
</template>
