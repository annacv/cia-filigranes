import type { BulkCardId, DownloadAsset, DownloadLocale } from '~/types/downloads'

type LocalizedAsset = Record<DownloadLocale, DownloadAsset>

function byLocale(route: 'espectacles' | 'tallers' | 'animacions'): LocalizedAsset {
  const filename = `CiaFiligranes-${route}.zip`
  return {
    ca: { href: `/downloads/zip/ca/${filename}`, filename },
    en: { href: `/downloads/zip/en/${filename}`, filename },
    es: { href: `/downloads/zip/es/${filename}`, filename },
  }
}

/**
 * Prebuilt all-in-one ZIPs served from `public/downloads/zip/`.
 *
 * Shape matches the bulk-download UX: a single ZIP per category per locale
 * (espectacles / tallers / animacions) plus a global logo ZIP.
 */
export const BULK_ZIPS = {
  espectacles: byLocale('espectacles'),
  tallers: byLocale('tallers'),
  animacions: byLocale('animacions'),
  logo: {
    href: '/downloads/zip/CiaFiligranes-logo.zip',
    filename: 'CiaFiligranes-logo.zip',
  },
} as const satisfies {
  espectacles: LocalizedAsset
  tallers: LocalizedAsset
  animacions: LocalizedAsset
  logo: DownloadAsset
}

export type BulkZips = typeof BULK_ZIPS

/** Cards order used by the bulk section in the UI. */
export const BULK_CARD_IDS: readonly BulkCardId[] = ['espectacles', 'tallers', 'animacions', 'logo'] as const
