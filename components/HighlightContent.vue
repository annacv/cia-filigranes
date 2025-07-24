<script setup lang="ts">

const props = defineProps({
  cssClasses: {
    type: String,
    default: 'highlight-content--1'
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

</script>

<template>
  <section>
    <div class="grid-layout">
      <div class="layout-cols">
        <h2 class="flex text-xl md:text-2xl lg:text-4xl font-sans font-thin" :class="titleClasses">
          {{ title }}
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
