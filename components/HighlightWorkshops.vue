<script setup lang="ts">
import { computed } from 'vue';
import { LOCALE_ROUTES } from "~/constants";
import { useI18n } from "vue-i18n";
import { getItemsByRoute } from "~/utils/items-by-route";
import { reorderItems } from "~/utils/reorder-items";
import type { CardLink, CardImage, ImageRoute } from "~/types";

const { t, locale } = useI18n()

const props = defineProps({
  isCurrentContent: {
    type: Boolean,
    default: false
  },
  reorderIndex: {
    type: Number,
    required: false,
    default: undefined
  }
})

const workshops = getItemsByRoute('tallers');

const workshopItems = computed(() => {
  if (!workshops?.children) return [];
  if (props.reorderIndex !== undefined) return reorderItems(workshops.children, props.reorderIndex);
  return workshops.children;
});

const getLink = (route: string, item?: string): CardLink => {
  const key = item ? `${route}/${item}` : route
  const page = LOCALE_ROUTES[key as keyof typeof LOCALE_ROUTES]

  return {
    target: '_top',
    href: page[locale.value as 'ca' | 'es' | 'en']
  }
}

const getImage = (route: string, item?: string): CardImage => {
  return {
    imageName: `${route}_${item}`,
    imageRoute: route as ImageRoute
  }
}
</script>

<template>
  <HighlightContent
    :title="t('routes.tallers')"
    content-link="/tallers"
    title-classes="-skew-y-3 hover:text-secondary-500"
    css-classes="highlight-content--2"
    :is-current-content="isCurrentContent"
  >
    <template #content>
      <SlidingPanel class="-skew-y-3">
        <ul class="flex w-full gap-1">
          <li v-for="(item, index) in workshopItems" :key="index">
            <SmallCard
              content-type="workshops"
              :title="t(`routes.${item}`)"
              :image="getImage('tallers', item)"
              :link="getLink(workshops!.name,item)"
            />
          </li>
        </ul>
      </SlidingPanel>
    </template>
  </HighlightContent>
</template>
