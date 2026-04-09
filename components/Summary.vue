<script setup lang="ts">
defineProps({
  abstract: {
    type: Array as () => Record<string, string | unknown>[],
    required: true
  },
  items: {
    type: Array as () => Record<string, string | unknown>[],
    required: true
  }
})
</script>

<template>
  <div class="flex lg:flex-row flex-col justify-between my-8 lg:my-12 gap-10 lg:gap-24">
    <div class="flex flex-col gap-4 lg:w-[68%] md:mb-6">
      <p
        v-for="item in abstract"
        :key="item.paragraph as string"
        class="text-lg lg:text-xl"
      >
        {{ item.paragraph }}
      </p>
    </div>

    <div class="flex flex-col gap-2 lg:w-[32%] mt-1.5">
      <ul
        class="flex flex-col gap-5"
      >
        <li
          v-for="item in items"
          :key="item.title as string"
          class="flex flex-col gap-2 text-sm lg:text-base"
        >
          <p class="font-bold">
            {{ item.title }}
          </p>
          <p class="font-light">
            {{ item.description }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
