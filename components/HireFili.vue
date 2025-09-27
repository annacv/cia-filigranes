<script setup lang="ts">
import { CONTACT } from "~/constants";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  textColor: {
    type: String,
    required: false,
    default: 'text-black'
  },
  bgColor: {
    type: String,
    required: false,
    default: 'bg-quaternary-500'
  }
});
</script>

<template>
  <div :class="`grid-layout ${bgColor}`">
    <div class="w-full text-center layout-cols justify-center content-center flex flex-wrap gap-x-4 text-base md:text-lg">
      <h2 :class="`font-bold ${textColor}`">
        {{ title }}
      </h2>
      <i18n-t
        :class="textColor"
        tag="p"
        scope="global"
        :keypath="description"
      >
        <template #email>
          <a
            class="font-bold hover:opacity-80"
            :href="`mailto:${CONTACT.email}`"
          >
            {{ CONTACT.email }}
          </a>
        </template>
        <template #phone>
          <a
            class="font-bold hover:opacity-80 whitespace-nowrap"
            :href="`tel:${CONTACT.phones.albert}`"
          >
            {{ CONTACT.phones.albert }}
          </a>
        </template>
      </i18n-t>
    </div>
  </div>
</template>

