import { computed } from "vue";
import type { ComputedRef } from "vue";
import { LOCALE_ROUTES } from "~/constants";
import type { CardLink } from "~/types";
import { useI18n } from "vue-i18n";

/**
 * Composable for generating localized links based on route and optional item
 * @param route - The base route (e.g., 'espectacles', 'tallers')
 * @param item - Optional item to append to the route (e.g., 'vint-anys')
 * @returns ComputedRef containing the CardLink object with target and href
 */
export function useLinkByRoute(route: string, item?: string): ComputedRef<CardLink> {
  const { locale } = useI18n();

  return computed(() => {
    const key = item ? `${route}/${item}` : route;
    const page = LOCALE_ROUTES[key as keyof typeof LOCALE_ROUTES];

    if (!page) {
      console.warn(`Route not found: ${key}`);
      return {
        target: '_top',
        href: '#'
      };
    }

    return {
      target: '_top',
      href: page[locale.value as 'ca' | 'es' | 'en']
    };
  });
}
