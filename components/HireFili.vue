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
  color: {
    type: String,
    required: true
  },
  isOutlined: {
    type: Boolean,
    default: false
  }
});

const textColor = computed(() => {
  return props.isOutlined ? `text-${props.color}-500` : 'text-white'
})

const bgColor = computed(() => {
  return props.isOutlined ? `bg-white` : `bg-${props.color}-500`
})

</script>

<template>
  <div
    class="grid-layout"
    :class="bgColor"
  >
    <div class="w-full text-center layout-cols justify-center content-center flex flex-wrap gap-x-4 text-base md:text-lg">
      <h2
        :class="textColor"
        class="font-bold">
        {{ title }}
      </h2>
      <i18n-t
        tag="p"
        scope="global"
        :keypath="description"
      >
        <template #email>
          <a
            :class="textColor"
            class="font-bold hover:opacity-80"
            :href="`mailto:${CONTACT.email}`"
          >
              {{ CONTACT.email }}
          </a>
        </template>
        <template #phone>
          <a
            :class="textColor"
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

