<script setup lang="ts">
import { computed, onMounted, nextTick, watch } from 'vue'
import { getImageUrlsForPreload } from "~/composables/use-image-url.composable";
import { useColor } from "~/composables/use-color.composable";
import { useScrollState } from "~/composables/use-scroll-state.composable";
import { useHeroFirstScrollHijack } from "~/composables/hero-scroll/use-hero-first-scroll-hijack.composable";
import { scrollToAnchor } from '~/composables/hero-scroll/follow-anchor-animation'
import { isSchedulableContentType, useContentSchedule } from "~/composables/calendar/use-content-schedule.composable";
import CalendarSchedule from "~/components/agenda/CalendarSchedule.vue";
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, HERO_COVER_ANIMATION_DURATION_MS, IN_PAGE_ANCHOR_HASHES } from "~/constants";
import type { ImageRoute, ContentType } from "~/types";

const props = defineProps({
  alt: {
    type: String,
    default: ''
  },
  imageName: {
    type: String,
    required: true
  },
  imageRoute: {
    type: String as PropType<ImageRoute>,
    required: true
  },
  contentType: {
    type: String as PropType<ContentType>,
    default: 'shows'
  },
  scheduleContentKey: {
    type: String,
    default: undefined
  },
  backgroundPosition: {
    type: String,
    default: 'center 30%'
  },
  isSectionCover: {
    type: Boolean,
    default: false
  }
})

const { isScrolled } = useScrollState()
useHeroFirstScrollHijack()
const { gradientOverlayValue } = useColor(props.contentType);
const { isMobile } = useResponsive()
const { getScheduleDateForContentKey } = useContentSchedule()
const route = useRoute()
const { t } = useI18n()

// If the user navigates directly to an in-page anchor, follow the anchor while the hero-cover
// layout transitions (otherwise layout settles after the hash scroll and lands too far down).
const maybeScrollToInPageAnchor = async () => {
  if (!IN_PAGE_ANCHOR_HASHES.has(route.hash)) return
  const anchorId = route.hash.slice(1)
  await nextTick()
  await nextTick()

  let attempts = 0
  const maxAttempts = 40
  const tryScroll = (): void => {
    const cleanup = scrollToAnchor(anchorId)
    if (cleanup) return
    if (attempts >= maxAttempts) return
    attempts++
    requestAnimationFrame(tryScroll)
  }
  tryScroll()
}

onMounted(maybeScrollToInPageAnchor)
watch(() => route.hash, () => {
  maybeScrollToInPageAnchor()
})

// Resolve image URLs during SSR for LCP optimization
const { data: imageUrls } = await useAsyncData(
  `hero-image-${props.imageName}-${props.imageRoute}`,
  () => getImageUrlsForPreload(props.imageName, props.imageRoute),
  {
    server: true,
    default: () => ({ mobile: undefined, desktop: undefined })
  }
);

const mobileImageUrl = computed(() => imageUrls.value?.mobile);
const desktopImageUrl = computed(() => imageUrls.value?.desktop);
const fallbackImageUrl = computed(() => desktopImageUrl.value || mobileImageUrl.value);

const imageSrcset = computed(() => {
  const parts: string[] = [];
  if (mobileImageUrl.value) {
    parts.push(`${mobileImageUrl.value} 1023w`);
  }
  if (desktopImageUrl.value) {
    parts.push(`${desktopImageUrl.value} 1024w`);
  }
  return parts.length > 0 ? parts.join(', ') : undefined;
});

// Preload images in head during SSR
useHead({
  link: computed(() => {
    const links = [];
    if (mobileImageUrl.value) {
      links.push({
        rel: 'preload',
        as: 'image' as const,
        href: mobileImageUrl.value,
        media: '(max-width: 1023px)',
        fetchpriority: 'high' as const
      });
    }
    if (desktopImageUrl.value) {
      links.push({
        rel: 'preload',
        as: 'image' as const,
        href: desktopImageUrl.value,
        media: '(min-width: 1024px)',
        fetchpriority: 'high' as const
      });
    }
    return links;
  })
});

const transitionDuration = computed(() => `${HERO_COVER_ANIMATION_DURATION_MS}ms`);
const imagePosition = computed(() => isScrolled.value ? 'center center' : props.backgroundPosition);
const scheduleSize = computed(() => isMobile.value ? 'small' : 'large')
const isHomepage = computed(() => route.path === '/' || route.path === '/ca' || route.path === '/es' || route.path === '/en')
const reserveScheduleSpace = computed(() => {
  return Boolean(props.scheduleContentKey) && isSchedulableContentType(props.contentType)
})
const schedulePlaceholderClass = computed(() => {
  return scheduleSize.value === 'large'
    ? 'min-h-[180px] min-w-[120px]'
    : 'min-h-[34px] min-w-[208px]'
})
const scheduleDate = computed(() => {
  if (!props.scheduleContentKey) return undefined
  if (!isSchedulableContentType(props.contentType)) return undefined
  return getScheduleDateForContentKey(props.scheduleContentKey, props.contentType)
})

const scrolledHeight = computed(() => {
  if (!isScrolled.value) return undefined
  if (import.meta.client && window.matchMedia('(min-width: 1024px)').matches) {
    return HEADER_DESKTOP_HEIGHT
  }
  return HEADER_MOBILE_HEIGHT
})
</script>

<template>
  <section
    data-hero-cover
    :aria-label="`Hero section ${contentType}`"
    :class="[
      'sticky top-0 w-full z-10 grid-layout items-center shadow relative overflow-hidden',
      'transition-[clip-path,height] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[clip-path,height]',
      isScrolled
        ? '[clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]'
        : '[clip-path:polygon(0%_0%,100%_0%,100%_94%,0%_100%)] lg:[clip-path:polygon(0%_0%,100%_0%,100%_86%,0%_100%)]',
    ]"
    :style="{
      transitionDuration: transitionDuration,
      height: isScrolled ? scrolledHeight : '100dvh',
    }"
  >
    <picture v-if="fallbackImageUrl" class="absolute inset-0 w-full h-full">
      <source v-if="mobileImageUrl" :srcset="mobileImageUrl" media="(max-width: 1023px)">
      <source v-if="desktopImageUrl" :srcset="desktopImageUrl" media="(min-width: 1024px)">
      <img
        :src="fallbackImageUrl"
        :alt="alt"
        :srcset="imageSrcset"
        sizes="100vw"
        fetchpriority="high"
        loading="eager"
        decoding="sync"
        width="1920"
        height="1080"
        class="w-full h-full object-cover transition-[object-position] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-object-position"
        :style="{
          objectPosition: imagePosition,
          transitionDuration: transitionDuration,
        }"
      >
    </picture>
    
    <!-- Gradient overlay -->
    <div
      class="absolute inset-0 w-full h-full"
      :class="isScrolled ? 'mix-blend-soft-light' : 'mix-blend-hard-light'"
      :style="{
        background: `linear-gradient(to right bottom, ${gradientOverlayValue})`,
      }"
    />
    
    <div
      class="h-full flex flex-col justify-center layout-cols transition-opacity duration-500 relative z-10 will-change-opacity"
      :class="isScrolled ? 'opacity-0' : 'opacity-100'"
    >
      <div
        :class="[
          'flex justify-start order-1 md:order-2 md:mb-20',
          { 'md:-mt-12 md:mb-48 2xl:mb-64' : reserveScheduleSpace },
          { 'md:justify-end' : isSectionCover || (isHomepage && !scheduleDate) }
        ]">
        <slot name="content"/>
      </div>
      <div
        v-if="reserveScheduleSpace"
        class="pointer-events-none order-2 md:order-1 w-fit md:self-end"
        :class="schedulePlaceholderClass"
      >
        <NuxtLink
          v-if="scheduleDate"
          :to="{ path: route.path, hash: '#agenda' }"
          class="inline-flex w-fit pointer-events-auto rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          :aria-label="t('agenda.goToPageSection')"
        >
          <CalendarSchedule
            :date="scheduleDate"
            :size="scheduleSize"
            class="inline-flex w-fit"
            show-claim
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
