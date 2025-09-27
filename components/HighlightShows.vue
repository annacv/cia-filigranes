<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from "vue-i18n";
import { getItemsByRoute } from "~/utils/items-by-route";
import { useLinkByRoute } from "~/composables/use-link-by-route.composable";

const props = defineProps({
	reorderIndex: {
		type: Number,
		required: false
	}
})

const { t } = useI18n()

const shows = getItemsByRoute('espectacles');

const showItems = computed(() => {
  if (!shows?.children) return [];
	if (props.reorderIndex) return reorderItems(shows.children, props.reorderIndex);
  return shows.children;
});
</script>

<template>
  <HighlightContent
    :title="t('routes.espectacles')"
    contentLink="/espectacles"
    titleClasses="-skew-y-3 hover:text-primary-700"
    css-classes="highlight-content--1"
    isCurrentContent
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
