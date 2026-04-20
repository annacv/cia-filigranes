import { computed, type ComputedRef, type Ref } from 'vue'
import { getImageUrlsForPreload } from '~/composables/use-image-url.composable'
import { useClientZip } from '~/composables/use-client-zip.composable'
import {
  contentToImageRoute,
  getAllSelectionZipFilename,
  getSelectionMode,
  resolveDossiersPlan,
  resolvePartialImagesPlan,
  resolveSingleItemImagePlan,
  toDownloadLocale,
} from '~/utils/downloads-resolver'
import type {
  DownloadAsset,
  DownloadPlan,
  MultiselectContentType,
  SpecificActionId,
} from '~/types/downloads'

type OptionMap = Record<MultiselectContentType, Array<{ value: string; labelKey: string }>>

type SpecificDownloadsParams = {
  locale: Ref<string>
  selection: { shows: string[]; workshops: string[] }
  options: ComputedRef<OptionMap>
}

function withZipFilename(plan: DownloadPlan, zipFilename: string): DownloadPlan {
  if (plan.mode !== 'generatedZip') return plan
  return { ...plan, zipFilename }
}

/**
 * Specific item downloads: per-card clicks and dropdown-driven group flows.
 *
 * - `downloadItem` handles a single show/workshop (per-card button).
 * - `downloadGroup` branches on the current selection mode (none / single /
 *   partial / all) and resolves plans according to the requested action.
 */
export function useSpecificDownloads({
  locale,
  selection,
  options,
}: SpecificDownloadsParams) {
  const { executeDownloadPlan, isDownloading, lastError } = useClientZip()

  function getSlugs(contentType: MultiselectContentType): string[] {
    return selection[contentType]
  }

  function getMode(contentType: MultiselectContentType) {
    return getSelectionMode(getSlugs(contentType).length, options.value[contentType].length)
  }

  async function resolveItemImagesPlan(
    contentType: MultiselectContentType,
    slug: string,
  ): Promise<DownloadPlan> {
    const route = contentToImageRoute(contentType)
    const baseName = `${route}_${slug}`

    const [highlight, detail] = await Promise.all([
      getImageUrlsForPreload(baseName, route),
      getImageUrlsForPreload(`${baseName}-1`, route),
    ])

    return resolveSingleItemImagePlan(contentType, slug, {
      mobile: highlight.mobile,
      desktopDetail: detail.desktop,
    })
  }

  async function resolvePartialImagesPlanFromSlugs(
    contentType: MultiselectContentType,
    slugs: string[],
  ): Promise<DownloadPlan> {
    const route = contentToImageRoute(contentType)
    const entries = await Promise.all(
      slugs.map(async (slug) => {
        const { mobile } = await getImageUrlsForPreload(`${route}_${slug}`, route)
        return { slug, mobile }
      }),
    )
    return resolvePartialImagesPlan(contentType, entries)
  }

  async function resolveItemDossierPlan(
    contentType: MultiselectContentType,
    slug: string,
  ): Promise<DownloadPlan> {
    return resolveDossiersPlan(contentType, [slug], toDownloadLocale(locale.value))
  }

  /**
   * Per-card click: dossier is a direct PDF, images are highlight + optional
   * `-1.webp` detail image (ZIPed if both are present).
   */
  async function downloadItem(
    contentType: MultiselectContentType,
    slug: string,
    action: SpecificActionId,
  ) {
    const plan =
      action === 'dossier'
        ? await resolveItemDossierPlan(contentType, slug)
        : await resolveItemImagesPlan(contentType, slug)
    await executeDownloadPlan(plan)
  }

  /**
   * Dropdown action: branches on selection mode.
   * - `all` → action-aware plan with fixed ZIP naming.
   * - `single` → same flow as `downloadItem`.
   * - `partial` → per-item direct dossiers / highlight images (ZIPed if >1).
   * - `none` → noop.
   */
  async function downloadGroup(
    contentType: MultiselectContentType,
    action: SpecificActionId,
  ) {
    const slugs = getSlugs(contentType)
    const mode = getMode(contentType)

    if (mode === 'none') {
      await executeDownloadPlan({ mode: 'noop' })
      return
    }

    if (mode === 'all') {
      const plan = action === 'dossier'
        ? resolveDossiersPlan(contentType, slugs, toDownloadLocale(locale.value))
        : await resolvePartialImagesPlanFromSlugs(contentType, slugs)
      await executeDownloadPlan(withZipFilename(plan, getAllSelectionZipFilename(contentType, action)))
      return
    }

    if (mode === 'single') {
      await downloadItem(contentType, slugs[0]!, action)
      return
    }

    // partial
    if (action === 'dossier') {
      await executeDownloadPlan(resolveDossiersPlan(contentType, slugs, toDownloadLocale(locale.value)))
      return
    }
    await executeDownloadPlan(await resolvePartialImagesPlanFromSlugs(contentType, slugs))
  }

  function isGroupActionEnabled(contentType: MultiselectContentType) {
    return getMode(contentType) !== 'none'
  }

  const disabledShowsGroup = computed(() => !isGroupActionEnabled('shows'))
  const disabledWorkshopsGroup = computed(() => !isGroupActionEnabled('workshops'))

  return {
    downloadItem,
    downloadGroup,
    isDownloading,
    lastError,
    disabledShowsGroup,
    disabledWorkshopsGroup,
  }
}

export type { DownloadAsset, SpecificActionId, MultiselectContentType }
