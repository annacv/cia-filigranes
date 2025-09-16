<script setup lang="ts">
import type { CardImage } from "~/types";

const props = defineProps({
  claim: {
    type: String,
  },
  claimTitle: {
    type: String,
  },
  items: {
    type: Array as () => Array<{
      description: Array<Record<string, any>>
      image: CardImage
      bgColor: string
      alt: string
      title: string
      buttons: {
        infoButton: {
          href: string
          class: string
        }
        downloadButton: {
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
  <div class="flex flex-col mt-20">
    <div class="grid-layout mb-20">
      <h2 class="layout-cols font-light text-neutral-800 text-3xl lg:text-5xl">
        {{ claimTitle }} <br> {{ claim }}
      </h2>
    </div>
    <Synopsis
      v-for="(item, index) in items"
      :key="index"
      :description="item.description"
      :image="item.image"
      :bg-color="item.bgColor"
      :alt="item.alt"
      :title="item.title"
      :is-reversed="(index + 1) % 2 === 0"
      :info-button="item.buttons.infoButton"
      :download-button="item.buttons.downloadButton"
    />
  </div>
</template>
