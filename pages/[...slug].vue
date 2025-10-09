<script setup>
import ArrowRight from "assets/icons/arrow-right.svg";
// This is a catch-all route that will match any route not defined.
// It will show a 404 page for any unknown routes

definePageMeta({
  name: 'catch-all',
  path: '/:pathMatch(.*)*',
  meta: {
    layout: 'error'
  }
});

const { t } = useI18n();
const { isMobile } = useDevice();
const imageSrc = useImageUrl('espectacles_circ-filixic', 'espectacles');
const imageAlt = '404';
</script>

<template>
  <div :class="[isMobile ? 'h-[72px]' : 'h-[87px]', 'bg-primary-500']"></div>
  <MainContent class="bg-primary-500">
    <template #wrapped>
      <div class="flex flex-col items-center justify-center h-full bg-primary-500 pt-6 pb-32">
        <img
          class="h-[150px] md:h-[200px] aspect-square object-cover object-center pointer-events-none"
          :src="imageSrc"
          :alt="imageAlt"
          style="clip-path: circle(50% at 50% 50%)"
          loading="lazy"
          draggable="false"
        />
        <h1 class="px-4 my-2 text-center text-white font-black uppercase text-6xl lg:text-7xl">
          404
        </h1>
        <p class="font-black text-center !leading-tight text-lg md:text-xl text-white mb-5"
        >{{ t('404.title') }}</p>
        <p class="w-[280px] text-center !leading-tight text-lg md:text-xl text-white mb-5"
        >{{ t('404.description') }}</p>
        <FiliButton
          href="/"
          buttonClass="button-outline-primary"
          target="_top"
        >
          <template #text>
            {{ t('button.goHome') }}
          </template>
          <template #icon-left>
            <ArrowRight class="arrow-right self-start mt-0.5 rotate-180"/>
          </template>
        </FiliButton>
      </div>
    </template>
  </MainContent>
</template>
