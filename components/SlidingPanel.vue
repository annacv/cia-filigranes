<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import ArrowRight from '~/assets/icons/arrow-right.svg'
import ArrowLeft from '~/assets/icons/arrow-left.svg'

const props = withDefaults(defineProps<{
  scrollFactor?: number
  buttonClass?: string | object | any[]
  iconClass?: string | object | any[]
}>(), {
  buttonClass: 'rounded-full hover:bg-neutral-100/10 h-6 w-6',
  iconClass: 'text-white',
  scrollFactor: 0.8,
  resetOnContentChange: true
})

const { isMobile } = useDevice()
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

const debouncedUpdateScroll = useDebounceFn(updateScrollPosition, 50)

function scrollTo(scrollValue: number) {
  scrollContainerRef.value?.scrollBy({
    left: scrollValue * (isMobile ? 1.1 : props.scrollFactor),
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
  <div
    class="sliding-panel flex items-center no-wrap relative py-8"
    :class="{'sliding-panel-at-start' : isScrollAtStart, 'sliding-panel-at-end' : isScrollAtEnd }"
  >
    <button
      class="sliding-panel__button sliding-panel-button-left right-8"
      :class="[
        buttonClass,
        { '!opacity-100 !pointer-events-auto': !isScrollAtStart }
      ]"
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
      class="sliding-panel__button sliding-panel-button-right right-0"
      :class="[
        buttonClass,
        { '!opacity-100 !pointer-events-auto': !isScrollAtEnd }
      ]"
      @click="scrollRight"
    >
      <ArrowRight class="text-white" />
    </button>
  </div>
</template>

<style lang="css">
.sliding-panel__button {
  @apply absolute top-0 z-[2] pointer-events-none opacity-0 transition-all duration-200 ease-in-out flex items-center justify-center;
}

.sliding-panel__scroll > * {
  @apply flex-none;
}
</style>
