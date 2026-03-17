<script setup lang="ts">
import { useDateFormat } from '~/composables/calendar/use-date-format.composable'

const props = withDefaults(defineProps<{
  date: string
  showClaim?: boolean
}>(), {
  showClaim: false,
});

const { t } = useI18n();
const { getScheduleParts } = useDateFormat();

const schedule = computed(() => getScheduleParts(props.date));
</script>

<template>
  <div class="flex flex-col items-start gap-2 text-white font-alternative">
    <p v-if="showClaim" class="text-lg font-extrabold !leading-none">
      {{ t('agenda.live') }}
    </p>
  <div
    class="inline-flex flex-col items-center border-2 border-white"
  >
    <!-- Visually hidden, accessible full date -->
    <span class="sr-only">
      <time :datetime="props.date">
        {{ schedule.day }} {{ schedule.month }} {{ schedule.year }}
      </time>
    </span>

    <!-- Visual layout -->
      <div class="flex flex-col items-center py-3 px-6 md:px-8">
        <span class="text-6xl font-extrabold">
          {{ schedule.day }}
        </span>
        <span class="-mt-1 text-2xl uppercase font-extrabold">
          {{ schedule.month }}
        </span>
      </div>
      <div class="px-6 md:px-8 w-full border-t-2 border-white">
        <p class="text-xl text-center font-extrabold !leading-tight">
          {{ schedule.year }}
        </p>
      </div>
     </div>
  </div>
</template>

