<script setup lang="ts">
interface PlayerVars {
  autoplay?: 0 | 1;
  controls?: 0 | 1;
  loop?: 0 | 1;
  mute?: 0 | 1;
  start?: number;
  end?: number;
  hl?: string;
  playlist?: string;
  [key: string]: unknown;
}

interface YouTubeProps {
  videoId: string;
  playerVars?: PlayerVars;
  width?: number;
  height?: number;
  trigger?: 'visible' | 'mouseover';
  aboveTheFold?: boolean;
  webp?: boolean;
  cookies?: boolean;
}

const props = withDefaults(defineProps<YouTubeProps>(), {
  width: 1280,
  height: 720,
  playerVars: () => ({
    autoplay: 0,
    loop: 0,
    mute: 0,
    start: 0,
    controls: 1,
    playlist: 'TBbBS05njec,VOcQTqZ9C2A,rg3XzGQIPpU,dY4GelzNlRc,GQ67p38vqcY,lU5b5V7U6Wc,D46T_hy1Mck'
  }),
  trigger: 'visible',
  aboveTheFold: true,
  webp: true,
  cookies: false,
})

const { locale, t } = useI18n()

const { canLoadYouTubeWithCookies } = useCookies()
const effectiveCookies = computed(() => canLoadYouTubeWithCookies.value)

const dynamicPlayerVars = computed(() => ({
  ...props.playerVars,
  hl: locale.value
}))
</script>

<template>
  <div class="relative w-full h-auto">
    <ClientOnly>
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 transform scale-95"
        enter-to-class="opacity-100 transform scale-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 transform scale-100"
        leave-to-class="opacity-0 transform scale-95"
        mode="out-in"
      >
        <ScriptYouTubePlayer
          v-if="canLoadYouTubeWithCookies"
          key="player"
          :video-id="videoId"
          :player-options="{ host: 'https://www.youtube.com' }"
          :above-the-fold="aboveTheFold"
          :trigger="trigger"
          :cookies="effectiveCookies"
          :webp="webp"
          :player-vars="dynamicPlayerVars"
          :width="width"
          :height="height"
        > 
          <template #loading>
            <div class="bg-blue-500 text-white p-5">
              Loading...
            </div>
          </template>
        </ScriptYouTubePlayer>
        <ConsentPlaceholder
          v-else
          key="placeholder"
          :title="t('consent.youtube.title')"
          :description="t('consent.youtube.consentRequired')"
        />
      </Transition>
    </ClientOnly>
  </div>
</template>
