/**
 * Shared domain types for the downloads feature (bulk + specific flows).
 */

export type DownloadLocale = 'ca' | 'en' | 'es'

export type MultiselectContentType = 'shows' | 'workshops'

export type BulkCardId = 'espectacles' | 'tallers' | 'animacions' | 'logo'

export type SpecificActionId = 'dossier' | 'images'

export type SelectionMode = 'none' | 'single' | 'partial' | 'all'

export type DownloadAsset = {
  href: string
  filename: string
  label?: string
}

/**
 * A small, serializable description of a download action.
 * Helpers return a plan; an executor turns it into browser downloads or ZIPs.
 */
export type DownloadPlan =
  | { mode: 'prebuiltZip'; asset: DownloadAsset }
  | { mode: 'direct'; assets: DownloadAsset[] }
  | { mode: 'generatedZip'; assets: DownloadAsset[]; zipFilename: string }
  | { mode: 'noop' }
