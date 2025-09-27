<script setup lang="ts">
import VideoPlayerIcon from "assets/icons/video-player.svg";

interface VideoPlayerProps {
  videoSrc: string
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
  loop?: boolean
  preload?: 'none' | 'metadata' | 'auto'
}

const props = withDefaults(defineProps<VideoPlayerProps>(), {
  autoplay: true,
  muted: false,
  controls: true,
  loop: false,
  preload: 'metadata',
})

const { t } = useI18n();

const isPlaying = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)

const playVideo = () => {
  if (videoRef.value) {
    videoRef.value.play()
    isPlaying.value = true
  }
}

defineExpose({
  playVideo
})
</script>

<template>
  <div class="video-container relative w-full overflow-hidden bg-gray-900 aspect-video rounded-lg">
    <div class="relative w-full h-full">
      <video
        class="w-full h-full object-cover"
        ref="videoRef"
        :src="videoSrc"
        :autoplay="autoplay"
        :muted="muted"
        :controls="controls"
        :loop="loop"
        :preload="preload"
        @play="isPlaying = true"
        @pause="isPlaying = false"
        @ended="isPlaying = false"
      />
      
      <div 
        v-if="!isPlaying"
        class="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer hover:bg-black/30 transition-colors duration-300"
        role="button"
        :alt="t('button.playVideo')"
        @click="playVideo"
      >
        <div class="opacity-75 w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
          <VideoPlayerIcon class="!w-10 !h-10 text-neutral-900" />
        </div>
      </div>
    </div>
  </div>
</template>
