<template>
  <div
    class="flex items-center justify-center gap-2 text-primary-300"
    aria-hidden="true"
  >
    <span
      v-for="i in 3"
      :key="i"
      class="loading-dot h-3 w-3 rounded-full bg-current"
      :style="{ animationDelay: `${(i - 1) * 0.12}s` }"
    />
  </div>
</template>

<style scoped>
.loading-dot {
  animation: loading-dot-bounce 0.7s ease-in-out infinite;
}

@keyframes loading-dot-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }

  50% {
    transform: translateY(-0.25rem);
    opacity: 1;
  }
}
</style>
