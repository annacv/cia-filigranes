import type { ContentType } from "~/types";

export function useImageAlt(contentType: ContentType, title?: string): string {
  const { t } = useI18n();
  
  switch (contentType) {
    case 'performances':
      return t('performances.commonAlt');
    case 'shows':
      return t('shows.commonAlt', { title: title || '' });
    case 'workshops':
      return t('workshops.commonAlt', { title: title || '' });
    case 'filipersones':
      return t('filipersones.commonAlt', { title: title || '' });
    case 'contact':
      return t('commonAlt');
    default:
      return t('commonAlt');
  }
}
