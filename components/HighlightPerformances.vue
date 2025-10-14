<script setup lang="ts">
import { computed } from 'vue';
import { PERFORMANCES_IMG } from "~/constants";
import { useI18n } from "vue-i18n";
import { reorderItems } from "~/utils/reorder-items";
import { useLinkByRoute } from "~/composables/use-link-by-route.composable";

const props = defineProps({
  reorderIndex: {
    type: Number,
    required: false,
    default: undefined
  }
})

const { t } = useI18n()

const performancesItems = computed(() => {
  if (props.reorderIndex !== undefined) return reorderItems(PERFORMANCES_IMG, props.reorderIndex);
  return PERFORMANCES_IMG;
});
</script>

<template>
  <HighlightContent
    :title="t('routes.animacions')"
    content-link="/animacions"
    title-classes="-skew-y-3 hover:text-tertiary-700"
    css-classes="highlight-content--3"
  >
    <template #content>
      <div class="relative">
        <div class="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end gap-4 z-10 pointer-events-none">
          <h3 class="text-2xl xl:text-3xl text-left font-grotesk font-bold uppercase text-white wrap-break-word hyphens-auto leading-7 max-w-[75%] 2xl:max-w-[73%]">
            {{ t('performances.title') }}
          </h3>
        </div>
        <SlidingPanel class="-skew-y-3">
          <MidCard
            content-type="performances"
            :title="t('performances.title')"
            :images="performancesItems"
            :link="useLinkByRoute('animacions').value"
          />
        </SlidingPanel>
      </div>
    </template>
  </HighlightContent>
</template>
