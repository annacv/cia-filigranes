import type { ContentType } from '~/types'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

type HireFormVariant = 'modal' | 'page'

type HireFormButtonFooterClasses = {
  submitButtonClass: string
  cancelButtonClass: string
}

type HireFormFieldClasses = {
  labelClass: string
  labelContainerClass: string
  markerClass: string
  fieldClass: string
  fieldBorderClass: string
}

type UseHireFormDisplayOptions = {
  variant: HireFormVariant
  /** Explicit section palette (synopsis / HireContactSection). */
  contentType: MaybeRefOrGetter<ContentType | undefined>
  /** Page only: when `contentType` is unset, `performances` uses the performances palette. */
  pageType?: MaybeRefOrGetter<'default' | 'performances'>
}

/** Submit / cancel / footer icon classes by synopsis or page section palette. */
const BUTTON_FOOTER_BY_CONTENT: Record<ContentType, HireFormButtonFooterClasses> = {
  workshops: {
    submitButtonClass: 'button-outline-secondary bg-secondary-500 hover:border-secondary-500',
    cancelButtonClass: 'button-solid-secondary',
  },
  performances: {
    submitButtonClass: 'button-outline-tertiary bg-tertiary-500 hover:border-tertiary-500',
    cancelButtonClass: 'button-solid-tertiary',
  },
  contact: {
    submitButtonClass: 'button-outline-tertiary bg-quaternary-500 hover:border-quaternary-500',
    cancelButtonClass: 'button-solid-quaternary',
  },
  shows: {
    submitButtonClass: 'button-outline-primary bg-primary-500 hover:border-primary-500',
    cancelButtonClass: 'button-solid-primary',
  },
  filipersones: {
    submitButtonClass: 'button-outline-primary bg-primary-500 hover:border-primary-500',
    cancelButtonClass: 'button-solid-primary',
  }
}

const DEFAULT_BUTTON_FOOTER = BUTTON_FOOTER_BY_CONTENT.shows

function hireFormAppearanceFromContentType(
  contentType: ContentType | undefined
): HireFormButtonFooterClasses {
  if (!contentType) return DEFAULT_BUTTON_FOOTER
  return BUTTON_FOOTER_BY_CONTENT[contentType] ?? DEFAULT_BUTTON_FOOTER
}

function fieldClassesForVariant(variant: HireFormVariant): HireFormFieldClasses {
  const isModal = variant === 'modal'
  return {
    labelClass: `text-black ${isModal ? 'text-sm' : ''}`,
    labelContainerClass: 'flex flex-col gap-2 text-left',
    markerClass: 'text-base !leading-none text-neutral-900',
    fieldClass: `py-1 w-full rounded-lg bg-white text-base !leading-tight text-neutral-900 font-semibold placeholder:font-normal placeholder:text-neutral-400 placeholder:italic outline-none ${isModal ? 'text-sm' : ''}`,
    fieldBorderClass:
      'h-[2px] w-full rounded-full bg-neutral-400 transition-colors duration-150 group-focus-within:bg-neutral-900'
  }
}

export function useHireFormDisplay(options: UseHireFormDisplayOptions) {
  const appearance = computed(() => {
    const explicit = toValue(options.contentType)
    if (explicit !== undefined) return hireFormAppearanceFromContentType(explicit)
    if (options.variant === 'page' && options.pageType !== undefined) {
      const pt = toValue(options.pageType)
      if (pt === 'performances') return hireFormAppearanceFromContentType('performances')
    }
    return hireFormAppearanceFromContentType(undefined)
  })

  return {
    appearance,
    ...fieldClassesForVariant(options.variant)
  }
}
