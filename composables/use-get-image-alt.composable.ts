import type { ContentType } from "~/types";

export function useGetImageAlt(contentType: ContentType): {
  getImageAlt: (title?: string) => string;
} {
  const { t } = useI18n();
  
  const getImageAlt = (title?: string) => {
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
  };

  return {
    getImageAlt
  };
}
