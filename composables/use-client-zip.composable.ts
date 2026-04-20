import { computed, ref } from 'vue'
import type { DownloadAsset, DownloadPlan } from '~/types/downloads'

type ClientZipItem = {
  url: string
  filename: string
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  downloadFromUrl(url, filename)
  // Defer revocation so the browser can register the download first.
  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 0)
}

function downloadFromUrl(url: string, filename: string) {
  if (!import.meta.client) {
    return
  }

  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener noreferrer'
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
}

export function useClientZip() {
  const activeDownloads = ref(0)
  const isDownloading = computed(() => activeDownloads.value > 0)
  const lastError = ref<Error | null>(null)

  function downloadAsset(asset: DownloadAsset) {
    downloadFromUrl(asset.href, asset.filename)
  }

  async function createZipFromUrls(items: ClientZipItem[], zipFilename: string) {
    if (!import.meta.client || items.length === 0) {
      return
    }

    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()

    await Promise.all(
      items.map(async ({ url, filename }) => {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to fetch "${url}" (${response.status})`)
        }

        zip.file(filename, await response.arrayBuffer())
      }),
    )

    const blob = await zip.generateAsync({ type: 'blob' })
    downloadBlob(blob, zipFilename)
  }

  /**
   * Executes a `DownloadPlan` produced by the pure resolvers.
   * - `prebuiltZip` / `direct` → single or multiple anchor clicks.
   * - `generatedZip` → builds a ZIP on the client from the listed URLs.
   * - `noop` → nothing happens.
   *
   * Tracks concurrent executions so `isDownloading` stays true until every
   * active plan finishes, and falls back to direct downloads if ZIP
   * generation fails, surfacing the error via `lastError` for callers.
   */
  async function executeDownloadPlan(plan: DownloadPlan): Promise<void> {
    if (plan.mode === 'noop') return

    lastError.value = null
    activeDownloads.value += 1

    try {
      if (plan.mode === 'prebuiltZip') {
        downloadAsset(plan.asset)
        return
      }

      if (plan.mode === 'direct') {
        for (const asset of plan.assets) {
          downloadAsset(asset)
        }
        return
      }

      try {
        await createZipFromUrls(
          plan.assets.map((asset) => ({ url: asset.href, filename: asset.filename })),
          plan.zipFilename,
        )
      } catch (err) {
        lastError.value = err instanceof Error ? err : new Error(String(err))
        for (const asset of plan.assets) {
          downloadAsset(asset)
        }
      }
    } finally {
      activeDownloads.value = Math.max(0, activeDownloads.value - 1)
    }
  }

  return {
    createZipFromUrls,
    downloadAsset,
    executeDownloadPlan,
    isDownloading,
    lastError,
  }
}
