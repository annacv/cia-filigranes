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
  [key: string]: any;
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

const { locale } = useI18n()

const dynamicPlayerVars = computed(() => ({
  ...props.playerVars,
  hl: locale.value
}))
</script>

<template>
  <div class="relative w-full h-auto">
    <ScriptYouTubePlayer
      :video-id="videoId"
      :player-options="{ host: 'https://www.youtube.com' }"
      :above-the-fold="aboveTheFold"
      :trigger="trigger"
      :cookies="cookies"
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
  </div>
</template>
