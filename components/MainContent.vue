<script setup lang="ts">
import { computed } from 'vue'
import { useResponsive } from '~/composables/use-responsive.composable'
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '~/constants'

const { isMobile } = useResponsive()

const scrollMarginTop = computed(() => isMobile.value ? HEADER_MOBILE_HEIGHT : HEADER_DESKTOP_HEIGHT)
</script>

<template>
  <main role="main">
    <div 
      id="main-content-anchor" 
      :style="{ scrollMarginTop: scrollMarginTop }"
    ></div>
    <div
      v-if="$slots.wrapped" 
      class="grid-layout min-w-full w-full h-full"
    >
      <div class="layout-cols">
        <slot name="wrapped"/>
      </div>
    </div>
    <template v-if="$slots.unwrapped">
      <slot name="unwrapped"/>
    </template>
    <div
      v-if="$slots.wrappedBottom" 
      class="grid-layout min-w-full w-full h-full"
    >
      <div class="layout-cols">
        <slot name="wrappedBottom"/>
      </div>
    </div>
    <template v-if="$slots.unwrappedBottom">
      <slot name="unwrappedBottom"/>
    </template>
  </main>
</template>
