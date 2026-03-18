<script setup lang="ts">
import { useDateFormat } from '~/composables/calendar/use-date-format.composable'

type ScheduleSize = 'large' | 'medium' | 'small'

const props = withDefaults(defineProps<{
  date: string
  showClaim?: boolean
  size: ScheduleSize
}>(), {
  showClaim: false
});

const { t } = useI18n();
const { getScheduleParts } = useDateFormat();

const schedule = computed(() => getScheduleParts(props.date));
</script>

<template>
  <div class="flex flex-col items-start gap-2 text-white font-alternative">
    <p
      v-if="showClaim"
      :class="`font-extrabold !leading-none ${props.size === 'large' ? 'text-lg' : 'text-base'}`"
    >
      {{ t('agenda.live') }}
    </p>
    <div
      :class="`inline-flex items-center border-2 border-white ${props.size === 'large' ? 'flex-col' : 'flex-row'}`"
    >
      <!-- Visually hidden, accessible full date -->
      <span class="sr-only">
        <time :datetime="props.date">
          {{ schedule.day }} {{ schedule.month }} {{ schedule.year }}
        </time>
      </span>

      <!-- Visual layout -->
      <div :class="`flex items-center ${props.size === 'large' ? 'flex-col py-3 px-6 md:px-8' : 'flex-row px-2 gap-2'}`">
        <span
          :class="[
            'font-extrabold',
            { 'text-6xl': props.size === 'large' },
            { 'text-3xl !leading-tight': props.size === 'medium' },
            { 'text-2xl': props.size === 'small' },
          ]"
        >
          {{ schedule.day }}
        </span>
        <span :class="`${props.size === 'large' ? '-mt-1 text-2xl' : 'text-xl !leading-tight'} uppercase font-extrabold`">
          {{ schedule.month }}
        </span>
      </div>
      <div :class="`w-full border-white ${props.size === 'large' ? 'border-t-2 px-6 md:px-8' : 'border-l-2 py-2 px-2'}`">
        <p class="text-xl text-center font-extrabold !leading-tight">
          {{ schedule.year }}
        </p>
      </div>
    </div>
  </div>
</template>

