<script setup lang="ts">
import type { CardImage, ContentType } from "~/types";

const props = defineProps({
  claim: {
    type: String,
    required: true
  },
  claimTitle: {
    type: String,
    required: true
  },
  items: {
    type: Array as () => Array<{
      description: Array<Record<string, any>>
      image: CardImage
      contentType: ContentType
      alt: string
      title: string
      buttons: {
        infoButton: {
          href: string
          class: string
        }
        downloadButton?: {
          href: string
          download: string
        }
      }
    }>,
    required: true,
    default: () => []
  }
})
</script>

<template>
  <div class="flex flex-col mb-20">
    <ClaimTitle
      :claim="claim"
      :claim-title="claimTitle"
    />
    <Synopsis
      v-for="(item, index) in items"
      :key="index"
      :description="item.description"
      :image="item.image"
      :content-type="item.contentType"
      :alt="item.alt"
      :title="item.title"
      :is-reversed="(index + 1) % 2 === 0"
      :info-button="item.buttons.infoButton"
      :download-button="item.buttons.downloadButton"
    />
  </div>
</template>
