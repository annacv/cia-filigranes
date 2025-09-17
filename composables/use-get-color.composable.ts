import { computed } from "vue";
import type { ComputedRef } from "vue";
import type { ContentType } from "~/types";

export function useGetColor(contentType: ContentType): {
  bgColorClass: ComputedRef<string>;
  gradientColorClass: ComputedRef<string>;
  gradientOverlayValue: ComputedRef<string>;
} {
  const bgColorClass = computed(() => 
    contentType === 'performances' 
      ? 'bg-tertiary-500' 
      : contentType === 'shows' 
        ? 'bg-primary-500'
        : 'bg-secondary-500'
  );

  const gradientColorClass = computed(() => 
    contentType === 'performances' 
      ? 'bg-tertiary-500/40' 
      : contentType === 'shows' 
        ? 'bg-primary-700/40'
        : 'bg-secondary-700/40'
  );

  const gradientOverlayValue = computed(() => 
    contentType === 'performances' 
      ? 'var(--gradient-overlay-tertiary)' 
      : contentType === 'shows' 
        ? 'var(--gradient-overlay-primary)'
        : 'var(--gradient-overlay-secondary)'
  );

  return {
    bgColorClass,
    gradientColorClass,
    gradientOverlayValue
  };
}

