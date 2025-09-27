import type { ContentType } from "~/types";

export function useImageAlt(contentType: ContentType): {
  imageAlt: (title?: string) => string;
} {
  const { t } = useI18n();
  
  const imageAlt = (title?: string) => {
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
    imageAlt
  };
}
