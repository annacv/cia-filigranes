<script setup lang="ts">
interface PlayerVars {
  autoplay?: 0 | 1;
  controls?: 0 | 1;
  loop?: 0 | 1;
  mute?: 0 | 1;
  start?: number;
  end?: number;
  [key: string]: any;
}

interface YouTubeProps {
  videoId: string;
  playerVars?: PlayerVars;
  width?: number;
  height?: number;
  trigger?: 'visible' | 'mouseover';
  aboveTheFold?: boolean;
}

const props = withDefaults(defineProps<YouTubeProps>(), {
  width: 1280,
  height: 720,
  playerVars: () => ({
    autoplay: 0,
  }),
  image: () => ({
    imageName: '',
    imageRoute: '',
  }),
  trigger: 'visible',
  aboveTheFold: true,
})
</script>

<template>
  <div class="relative w-full h-auto">
    <ScriptYouTubePlayer
      :video-id="videoId"
      :player-options="{ host: 'https://www.youtube.com' }"
      trigger="mouseover"
      :above-the-fold="true"
    > 
      <template #loading>
        <div class="bg-blue-500 text-white p-5">
          Loading...
        </div>
      </template>
    </ScriptYouTubePlayer>
  </div>
</template>
