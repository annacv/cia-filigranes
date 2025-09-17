import { computed } from "vue";
import type { ComputedRef } from "vue";
import type { ContentType } from "~/types";

export function useGetImageAlt(contentType: ContentType, title?: string): ComputedRef<string> {
  const { t } = useI18n();
  
  return computed(() => {
    switch (contentType) {
      case 'performances':
        return t('performances.commonAlt');
      case 'shows':
        return t('shows.commonAlt', { title: title || '' });
      case 'workshops':
        return t('workshops.commonAlt', { title: title || '' });
      default:
        return '';
    }
  });
}
