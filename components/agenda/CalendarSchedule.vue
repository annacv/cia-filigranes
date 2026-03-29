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
  <div :class="`flex gap-2 text-white font-alternative ${props.size === 'large' ? 'flex-col items-start' : 'items-center'}`">
    <p
      v-if="showClaim"
      :class="`w-full font-extrabold !leading-none ${props.size === 'large' ? 'text-lg' : 'text-base'}`"
    >
      {{ t('agenda.live') }}
    </p>
    <div
      :class="`w-full inline-flex items-center border-2 border-white ${props.size === 'large' ? 'flex-col' : 'flex-row'}`"
    >
      <!-- Visually hidden, accessible full date -->
      <span class="sr-only">
        <time :datetime="props.date">
          {{ schedule.day }} {{ schedule.month }} {{ schedule.year }}
        </time>
      </span>

      <!-- Visual layout -->
      <div 
        :class="[
          'flex items-center justify-center flex-1',
          {'flex-col py-3 px-6 md:px-7 min-w-[116px]' : props.size === 'large'},
          {'px-2 gap-1.5' : props.size === 'medium'},
          {'px-2 gap-1' : props.size === 'small'}
        ]">
        <span
          :class="[
            'font-extrabold',
            { 'text-6xl': props.size === 'large' },
            { 'text-2xl !leading-none': props.size === 'medium' },
            { 'text-xl !leading-none': props.size === 'small' },
          ]"
        >
          {{ schedule.day }}
        </span>
        <span :class="[
          'uppercase font-extrabold',
          {'-mt-1 text-2xl' : props.size === 'large'},
          {'text-base !leading-none' : props.size === 'medium'},
          {'text-sm !leading-none' : props.size === 'small'},
        ]">
          {{ schedule.month }}
        </span>
      </div>
      <div :class="`md:w-full border-white ${props.size === 'large' ? 'border-t-2 px-6 md:px-7' : 'border-l-2 p-2'}`">
        <p :class="[
          'text-center font-extrabold',
          {'text-xl !leading-tight' : props.size === 'large'},
          {'text-base !leading-none' : props.size === 'medium'},
          {'text-sm !leading-none' : props.size === 'small'},
        ]">
          {{ schedule.year }}
        </p>
      </div>
    </div>
  </div>
</template>

