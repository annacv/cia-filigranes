<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  },
  bgClass: {
    type: String,
    default: 'bg-neutral-100'
  },
  icon: {
    type: [Object, String],
    required: false
  },
  iconClass: {
    type: String,
    required: false
  }
  
})
</script>

<template>
    <div :class="`flex flex-col items-center justify-center text-neutral-600 py-12 px-6 mb-2 md:mb-14 ${bgClass}`">
      <slot name="icon">
        <Component
          v-if="typeof icon === 'object'"
          :is="icon"
          :class="`!w-9 !h-9 text-primary-300 !fill-none ${iconClass}`"
        />
        <img
          v-else-if="typeof icon === 'string'"
          :src="icon"
          :class="`!w-9 !h-9 text-primary-300 !fill-none ${iconClass}`"
          alt=""
        />
      </slot>
      <p class="text-xl !leading-normal max-w-md text-center p-7">{{ text }}</p>
    </div>
</template>