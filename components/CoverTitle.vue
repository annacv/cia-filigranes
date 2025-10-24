<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  titleClass: {
    type: String,
    default: 'lg:max-w-[543px]'
  },
  sliceEnd: {
    type: Number,
    default: 1
  }
})

const splitedTitle = props.title.split(' ');

const getTitleRows = (splitedTitle: string[]) => {
    const firstRow = splitedTitle.slice(0, props.sliceEnd)
    const secondRow = splitedTitle.slice(props.sliceEnd)
    return {
        firstRow: firstRow.join(' '),
        secondRow: secondRow.join(' ')
    }
}

const titleRows = computed(() => getTitleRows(splitedTitle))
</script>


<template>
  <h1
    class="p-5 lg:pr-7 flex flex-col font-grotesk uppercase text-white text-5xl md:text-6xl lg:text-7xl"
    :class="titleClass"
  >
    <span>{{ titleRows.firstRow }}</span>
    <span>{{ titleRows.secondRow }}</span>
  </h1>
</template>