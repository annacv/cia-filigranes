import { computed } from "vue";
import type { ComputedRef } from "vue";
import type { ContentType } from "~/types";

export function useColor(contentType: ContentType | undefined): {
  bgColorClass: ComputedRef<string>;
  gradientColorClass: ComputedRef<string>;
  gradientOverlayValue: ComputedRef<string>;
} {
  const bgColorClass = computed(() => 
    contentType === 'performances' 
      ? 'bg-tertiary-500' 
      : contentType === 'shows' 
        ? 'bg-primary-500'
        : contentType === 'workshops'
          ? 'bg-secondary-500'
          : contentType === 'contact'
            ? 'bg-quaternary-500'
            : ''
  );

  const gradientColorClass = computed(() => 
    contentType === 'performances' 
      ? 'bg-tertiary-500/40' 
      : contentType === 'shows' 
        ? 'bg-primary-700/40'
        : contentType === 'workshops'
          ? 'bg-secondary-700/40'
          : contentType === 'contact'
            ? 'bg-quaternary-500/40'
            : ''
  );

  const gradientOverlayValue = computed(() => 
    contentType === 'performances' 
      ? 'var(--gradient-overlay-tertiary)' 
      : contentType === 'shows' 
        ? 'var(--gradient-overlay-primary)'
        : contentType === 'workshops'
          ? 'var(--gradient-overlay-secondary)'
          : contentType === 'contact'
            ? 'var(--gradient-overlay-quaternary)'
          : 'var(--gradient-overlay-primary)'
  );

  return {
    bgColorClass,
    gradientColorClass,
    gradientOverlayValue
  };
}
