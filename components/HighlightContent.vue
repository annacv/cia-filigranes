<script setup lang="ts">

const props = defineProps({
  cssClasses: {
    type: String,
    default: 'highlight-content--1'
  },
  title: {
    type: String,
    required: true
  }
})

const { t } = useI18n()
</script>

<template>
  <section class="pt-24">
    <div class="grid-layout">
      <div class="layout-cols">
        <h2 class="text-4xl font-bold -skew-y-6 uppercase">
          {{ title }}
        </h2>
      </div>
    </div>
    <div :class="cssClasses">
      <div class="grid-layout">
        <div class="layout-cols">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </section>
</template>
