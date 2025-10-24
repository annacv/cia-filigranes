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

const splitTitle = props.title.split(' ');

const getTitleRows = (splitTitle: string[]) => {
    const firstRow = splitTitle.slice(0, props.sliceEnd)
    const secondRow = splitTitle.slice(props.sliceEnd)
    return {
        firstRow: firstRow.join(' '),
        secondRow: secondRow.join(' ')
    }
}

const titleRows = computed(() => getTitleRows(splitTitle))
</script>


<template>
  <h1
    class="p-5 xs:px-0 sm:px-5 lg:pr-7 flex flex-col font-grotesk uppercase text-white text-5xl md:text-6xl lg:text-7xl"
    :class="titleClass"
  >
    <span>{{ titleRows.firstRow }}</span>
    <span>{{ titleRows.secondRow }}</span>
  </h1>
</template>