<script setup lang="ts">

const props = defineProps({
  cssClasses: {
    type: String,
    default: 'highlight-content--1'
  },
  isCurrentContent: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  titleClasses: {
    type: String,
    required: true
  }
})

const capital = computed(() => props.title.slice(0,1))
const title = computed(() => props.title.slice(1))
</script>

<template>
  <section>
    <div class="grid-layout">
      <div class="layout-cols">
        <h2 class="flex text-2xl lg:text-4xl font-sans" :class="titleClasses">
          <span
            v-if="isCurrentContent"
            class="font-thin mr-2">+
          </span>
          <span class="font-black">{{ capital }}</span>
          <span class="font-thin">{{ title }}</span>
        </h2>
      </div>
    </div>
    <div :class="[cssClasses, 'py-2 lg:py-4']">
      <div class="grid-layout justify-center">
        <div class="layout-cols">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </section>
</template>
