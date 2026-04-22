<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  isSection: {
    type: Boolean,
    default: false
  },
  titleClass: {
    type: String,
    default: undefined
  },
  sliceEnd: {
    type: Number,
    default: 1
  }
})

const BASE_HEADING_CLASS = 'py-5 xs:px-0 sm:px-5 flex flex-col font-grotesk uppercase text-white drop-shadow-xl'
const splitTitle = computed(() => props.title.split(' '))

const resolvedTitleClass = computed(() => {
  if (props.titleClass) return props.titleClass
  return props.isSection
    ? 'max-w-[310px] sm:max-w-[342px] md:max-w-[448px] lg:max-w-[542px]'
    : 'lg:max-w-[543px]'
})

const headingClass = computed(() => {
  return props.isSection
    ? `${BASE_HEADING_CLASS} text-4xl md:text-5xl lg:text-6xl`
    : `${BASE_HEADING_CLASS} lg:pr-7 text-5xl md:text-6xl lg:text-7xl`
})

const getTitleRows = (splitTitle: string[]) => {
  const firstRow = splitTitle.slice(0, props.sliceEnd)
  const secondRow = splitTitle.slice(props.sliceEnd)
  return {
    firstRow: firstRow.join(' '),
    secondRow: secondRow.join(' ')
  }
}

const titleRows = computed(() => getTitleRows(splitTitle.value))
</script>


<template>
  <h1
    :class="[headingClass, resolvedTitleClass]"
  >
    <template v-if="isSection">
      {{ title }}
    </template>
    <template v-else>
      <span>{{ titleRows.firstRow }}</span>
      <span>{{ titleRows.secondRow }}</span>
    </template>
  </h1>
</template>