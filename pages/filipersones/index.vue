<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch, type ComponentPublicInstance } from 'vue';
import { useI18n } from "vue-i18n";
import type { ContentType, ImageRoute } from "~/types";
import { getImageByRoute } from "~/utils/image-by-route";

const { t } = useI18n();
const { getTranslatedList } = useI18nUtils()
const { imageAlt: getImageAlt } = useImageAlt('filipersones');

useHead({
  meta: [
    { name: 'description', content: t('filipersones.metaDescription') }
  ]
})

const showMoreContent = ref(false);
const dataSheetRef = ref<ComponentPublicInstance<{ $el: HTMLElement }> | null>(null);
const initialDataSheetHeight = ref<number>(0);
const isDataSheetHeightMeasured = ref(false);
let mutationObserver: MutationObserver | null = null;

const origins = getTranslatedList('filipersones.origins', ['paragraph'])
const prices = getTranslatedList('filipersones.prices', ['title', 'description'])
const stories = getTranslatedList('filipersones.stories', ['title', 'description'])
const history = getTranslatedList('filipersones.history', ['paragraph'])
const filiFriends = getTranslatedList('filipersones.filiFriends', ['paragraph'])
const scenariosRight1 = getTranslatedList('filipersones.scenariosRight1', ['title', 'description'])
const scenariosLeft1 = getTranslatedList('filipersones.scenariosLeft1', ['title', 'description'])
const scenariosRight2 = getTranslatedList('filipersones.scenariosRight2', ['title', 'description'])
const scenariosLeft2 = getTranslatedList('filipersones.scenariosLeft2', ['title', 'description'])
const background = getTranslatedList('filipersones.background', ['paragraph'])

const filipersones = getItemsByRoute('filipersones');

const filipersonesItems = computed(() => {
  return filipersones?.children?.map((filipersona) => {
    const title = t(`routes.${filipersona}`)

    return {
      description: getTranslatedList(`filipersones.${filipersona}.intro`, ['paragraph']),
      image: {
        imageName: `filipersones_${filipersona}_1`,
        imageRoute: 'filipersones' as ImageRoute,
      },
      contentType: 'shows' as ContentType,
      alt: getImageAlt(title),
      title: t(`routes.${filipersona}`),
      buttons: {
        infoButton: {
          href: `/filipersones/${filipersona}`,
          class: 'button-outline-primary'
        }
      }
    }
  }) || []
})

const currentScenariosRight = computed(() => 
showMoreContent.value ? scenariosRight2 : scenariosRight1
);

const currentScenariosLeft = computed(() => 
  showMoreContent.value ? scenariosLeft2 : scenariosLeft1
);

const measureDataSheetHeight = async () => {
  if (!dataSheetRef.value || isDataSheetHeightMeasured.value) return;

  // Wait for the component to be fully rendered
  await nextTick();
  // Use requestAnimationFrame to ensure DOM is fully painted
  await new Promise(resolve => requestAnimationFrame(resolve));
  
  const height = dataSheetRef.value?.$el?.offsetHeight;
  if (height > 0) {
    initialDataSheetHeight.value = height;
    isDataSheetHeightMeasured.value = true;
  }
};

const setupMutationObserver = () => {
  if (!dataSheetRef.value || mutationObserver) return;

  const targetElement = dataSheetRef.value.$el || dataSheetRef.value;
  if (!targetElement) return;

  mutationObserver = new MutationObserver(() => {
    // Use requestAnimationFrame to ensure DOM changes are complete
    requestAnimationFrame(() => {
      const newHeight = dataSheetRef.value?.$el?.offsetHeight;
      if (newHeight && newHeight > initialDataSheetHeight.value) {
        initialDataSheetHeight.value = newHeight;
      }
    });
  });

  mutationObserver.observe(targetElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
};

const cleanupMutationObserver = () => {
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }
};

const showMore = () => {
  showMoreContent.value = !showMoreContent.value;
};

// Measure height on mount and when content changes
onMounted(async () => {
  // Measure after initial render
  await nextTick();
  await measureDataSheetHeight();
  
  // Set up mutation observer for dynamic content changes
  setupMutationObserver();
});

// Cleanup mutation observer on unmount
onUnmounted(() => {
  cleanupMutationObserver();
});

// Watch for content changes and re-measure if needed
watch(showMoreContent, () => {
  if (isDataSheetHeightMeasured.value) {
    // Re-measure after content change using requestAnimationFrame
    requestAnimationFrame(() => {
      const newHeight = dataSheetRef.value?.$el?.offsetHeight;
      if (newHeight && newHeight > initialDataSheetHeight.value) {
        initialDataSheetHeight.value = newHeight;
      }
    });
  }
});
</script>

<template>
  <div class="h-full">
    <HeroCover
      image-name="filipersones_hero"
      image-route="animacions"
      :alt="t('shows.hero.alt')"
    >
      <template #content>
        <div class="px-5 lg:px-0 font-grotesk uppercase text-white lg:max-w-[543px]">
          <h1 class="text-4xl md:text-5xl lg:text-6xl">
            {{ t('routes.filipersones') }}
          </h1>
          <h2 class="text-5xl md:text-6xl lg:text-7xl">
            {{ t('filipersones.hero.subtitle') }}
          </h2>
        </div>
      </template>
    </HeroCover>
    <MainContent>
      <template #unwrapped>
        <ClaimTitle
          :claim="t('filipersones.claim')"
          :claim-title="t('filipersones.claimTitle')"
        />
        <Synopsis
          :description="origins"
          :image="getImageByRoute('filipersones', 'filigranes_1')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
        />
        <DataSheet
          :techCard="prices"
          :artCard="stories"
          :image="getImageByRoute('filipersones', 'filigranes_2')"
          :alt="t('shows.hero.alt')"
          isReversed
        />
        <Synopsis
          :description="history"
          :image="getImageByRoute('filipersones', 'filigranes_3')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
          isReversed
        />
        <Synopsis
          :description="filiFriends"
          :image="getImageByRoute('filipersones', 'filigranes_4')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
        />
        <DataSheet
          ref="dataSheetRef"
          :techCard="currentScenariosRight"
          :artCard="currentScenariosLeft"
          :image="getImageByRoute('filipersones', 'filigranes_5')"
          :alt="t('shows.hero.alt')"
          extraContent
          :showMore="showMoreContent"
          @viewMore="showMore"
          isReversed
          :style="isDataSheetHeightMeasured ? { minHeight: `${initialDataSheetHeight}px` } : {}"
        />
        <Synopsis
          :description="background"
          :image="getImageByRoute('filipersones', 'filigranes_6')"
          content-type="shows"
          :alt="t('shows.hero.alt')"
          show-full-content
          isFullReversed
        />
        <SynopsisList
          :items="filipersonesItems"
          :claim="t('filipersones.knowMore')"
          :claim-title="t('filipersones.knowMoreTitle')"
        />
      </template>
    </MainContent>
    <HeroFooter
      image-name="filipersones_footer"
      image-route="filipersones"
      :alt="t('shows.hero.alt')"
    />
    <HireFili
      :title="t('home.hire.title')"
      description="home.hire.description"
    />
  </div>
</template>
