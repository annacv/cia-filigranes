import { BULK_ZIPS } from '~/constants/downloads'
import type {
  BulkCardId,
  DownloadAsset,
  DownloadLocale,
  DownloadPlan,
  MultiselectContentType,
  SelectionMode,
  SpecificActionId,
} from '~/types/downloads'

/**
 * Maps a `MultiselectContentType` to its image-route folder name.
 */
export function contentToImageRoute(contentType: MultiselectContentType): 'espectacles' | 'tallers' {
  return contentType === 'shows' ? 'espectacles' : 'tallers'
}

/**
 * Normalises any locale string to one of the supported `DownloadLocale`s.
 */
export function toDownloadLocale(value: string): DownloadLocale {
  if (value === 'en' || value === 'es') {
    return value
  }
  return 'ca'
}

/**
 * Derives a `SelectionMode` from the raw counts.
 */
export function getSelectionMode(selectedCount: number, availableCount: number): SelectionMode {
  if (selectedCount === 0) return 'none'
  if (availableCount > 0 && selectedCount === availableCount) return 'all'
  if (selectedCount === 1) return 'single'
  return 'partial'
}

/**
 * Builds the direct-download descriptor for a single dossier PDF.
 */
export function buildDossierAsset(routeKey: string, locale: DownloadLocale): DownloadAsset {
  const filename = `CiaFiligranes-${routeKey}-${locale}.pdf`
  return {
    href: `/downloads/dossiers/${filename}`,
    filename,
    label: filename,
  }
}

/**
 * Resolves the prebuilt-ZIP asset for a bulk card.
 * Logo is locale-agnostic; the rest are per locale.
 */
export function resolveBulkAsset(cardId: BulkCardId, locale: DownloadLocale): DownloadAsset {
  if (cardId === 'logo') {
    return BULK_ZIPS.logo
  }
  return BULK_ZIPS[cardId][locale]
}

/**
 * Returns the filename used for ad-hoc ZIPs generated on the client.
 */
export function getGeneratedZipFilename(
  contentType: MultiselectContentType,
  action: SpecificActionId,
  slugs: string[],
): string {
  const route = contentToImageRoute(contentType)
  const suffix = action === 'dossier' ? 'dossiers' : 'images'
  const sorted = [...slugs].sort().join('-')
  return `CiaFiligranes-${route}-${suffix}-${sorted}.zip`
}

/**
 * Wraps a resolved asset list into the right plan shape.
 * - `0` assets → noop
 * - `1` asset → direct download
 * - `>1` assets → client-side ZIP
 */
export function buildAssetsPlan(assets: DownloadAsset[], zipFilename: string): DownloadPlan {
  if (assets.length === 0) return { mode: 'noop' }
  if (assets.length === 1) return { mode: 'direct', assets }
  return { mode: 'generatedZip', assets, zipFilename }
}

/**
 * Resolves a dossier plan for a set of selected slugs (single/partial flows).
 * Always direct PDFs; the executor may ZIP them when more than one is present.
 */
export function resolveDossiersPlan(
  contentType: MultiselectContentType,
  slugs: string[],
  locale: DownloadLocale,
): DownloadPlan {
  const assets = slugs.map((slug) => buildDossierAsset(slug, locale))
  return buildAssetsPlan(assets, getGeneratedZipFilename(contentType, 'dossier', slugs))
}

/**
 * Resolves an image plan for a single show/workshop. The caller provides the
 * pre-resolved URLs (mobile highlight and optional desktop detail image).
 */
export function resolveSingleItemImagePlan(
  contentType: MultiselectContentType,
  slug: string,
  urls: { mobile?: string; desktopDetail?: string },
): DownloadPlan {
  const route = contentToImageRoute(contentType)
  const baseName = `${route}_${slug}`
  const assets: DownloadAsset[] = []

  if (urls.mobile) {
    assets.push({ href: urls.mobile, filename: `${baseName}.webp`, label: baseName })
  }
  if (urls.desktopDetail) {
    assets.push({ href: urls.desktopDetail, filename: `${baseName}-1.webp`, label: `${baseName}-1` })
  }

  return buildAssetsPlan(assets, getGeneratedZipFilename(contentType, 'images', [slug]))
}

/**
 * Resolves an image plan for a partial multi-selection. The caller provides
 * a list of `{ slug, mobile }` entries (no desktop detail in this flow).
 */
export function resolvePartialImagesPlan(
  contentType: MultiselectContentType,
  entries: Array<{ slug: string; mobile?: string }>,
): DownloadPlan {
  const route = contentToImageRoute(contentType)
  const assets: DownloadAsset[] = entries
    .filter((e): e is { slug: string; mobile: string } => !!e.mobile)
    .map(({ slug, mobile }) => ({
      href: mobile,
      filename: `${route}_${slug}.webp`,
      label: `${route}_${slug}`,
    }))

  return buildAssetsPlan(
    assets,
    getGeneratedZipFilename(contentType, 'images', entries.map((e) => e.slug)),
  )
}
