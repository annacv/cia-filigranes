<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import ArrowRight from '~/assets/icons/arrow-right.svg'
import ArrowLeft from '~/assets/icons/arrow-left.svg'

const { t } = useI18n()

const props = withDefaults(defineProps<{
  scrollFactor?: number
  buttonClass?: string | object | unknown[]
  iconClass?: string | object | unknown[]
}>(), {
  buttonClass: 'rounded-full h-6 w-6',
  iconClass: 'text-white hover:text-white/50',
  scrollFactor: 1
})

const { isMobile } = useResponsive()
const isScrollAtStart = ref(true)
const isScrollAtEnd = ref(true)
const scrollContainerRef = ref<HTMLDivElement>()

function updateScrollPosition() {
  if (scrollContainerRef.value) {
    const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.value
    isScrollAtStart.value = !scrollLeft
    isScrollAtEnd.value = scrollLeft + clientWidth + 2 >= scrollWidth
  }
}

const debouncedUpdateScroll = useDebounceFn(updateScrollPosition, 100)

function scrollTo(scrollValue: number) {
  scrollContainerRef.value?.scrollBy({
    left: scrollValue * props.scrollFactor,
    behavior: 'smooth',
  })
}

function scrollLeft() {
  scrollTo(-(scrollContainerRef.value?.clientWidth ?? 0))
}

function scrollRight() {
  scrollTo(scrollContainerRef.value?.clientWidth ?? 0)
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!scrollContainerRef.value) return

  resizeObserver = new ResizeObserver(debouncedUpdateScroll)
  resizeObserver.observe(scrollContainerRef.value)

  updateScrollPosition()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div class="sliding-panel flex items-center no-wrap relative py-4 xl:py-6 -mr-5 lg:mr-0">
    <button
      v-if="!isMobile"
      class="sliding-panel__button sliding-panel-button-left right-8"
      :class="[
        buttonClass,
        { '!opacity-100 !pointer-events-auto': !isScrollAtStart }
      ]"
      :aria-label="t('button.scrollLeft')"
      @click="scrollLeft"
    >
      <ArrowLeft :class="iconClass"/>
    </button>
    <div
      ref="scrollContainerRef"
      class="sliding-panel__scroll no-scrollbar flex no-wrap overflow-x-auto overflow-y-hidden flex-1"
      @scroll="debouncedUpdateScroll"
      @transitionend="debouncedUpdateScroll"
      @animationend="debouncedUpdateScroll"
    >
      <slot />
    </div>
    <button
      v-if="!isMobile"
      class="sliding-panel__button sliding-panel-button-right right-0"
      :class="[
        buttonClass,
        { '!opacity-100 !pointer-events-auto': !isScrollAtEnd }
      ]"
      :aria-label="t('button.scrollRight')"
      @click="scrollRight"
    >
      <ArrowRight :class="iconClass" />
    </button>
  </div>
</template>
