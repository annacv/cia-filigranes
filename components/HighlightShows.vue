<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { getItemsByRoute } from "~/utils/items-by-route";
import { reorderItems } from "~/utils/reorder-items";
import { getImageByRoute } from "~/utils/image-by-route";
import { useLinkByRoute } from "~/composables/use-link-by-route.composable";

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

const { t } = useI18n()

const shows = getItemsByRoute('espectacles');

const showItems = computed(() => {
  if (!shows?.children) return [];
  if (props.reorderIndex !== undefined) return reorderItems(shows.children, props.reorderIndex);
  return shows.children;
});
</script>

<template>
  <HighlightContent
    :title="t('routes.espectacles')"
    content-link="/espectacles"
    title-classes="-skew-y-3 hover:text-primary-700"
    css-classes="highlight-content--1"
    :is-current-content="isCurrentContent"
  >
    <template #content>
      <SlidingPanel class="-skew-y-3">
        <ul class="flex w-full gap-1">
          <li v-for="(item, index) in showItems" :key="index">
            <SmallCard
              content-type="shows"
              :title="t(`routes.${item}`)"
              :image="getImageByRoute('espectacles', item)"
              :link="useLinkByRoute(shows!.name, item).value"
            />
          </li>
        </ul>
      </SlidingPanel>
    </template>
  </HighlightContent>
</template>
