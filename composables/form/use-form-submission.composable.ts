import { EVENT_TYPE_ITEMS } from '~/constants'

export type HireFormSubmissionPayload = {
  fullName: string
  email: string
  contractType: 'shows' | 'workshops' | 'performances'
  selectedKey: string
  comments: string
  locale: string
  honeypot: string
}

export type HireFormSubmissionResponse = {
  success: boolean
  message?: string
}

export type FormSubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * POSTs hire form payload to StaticForms endpoint.
 */
export const useFormSubmission = () => {
  const { t } = useI18n()
  const config = useRuntimeConfig()

  const status = ref<FormSubmissionStatus>('idle')
  const clientErrorKey = ref<string | null>(null)
  const serverMessage = ref<string | null>(null)

  const errorText = computed(() => {
    if (serverMessage.value) return serverMessage.value
    if (clientErrorKey.value) return t(clientErrorKey.value)
    return ''
  })

  const resetStatus = () => {
    status.value = 'idle'
    clientErrorKey.value = null
    serverMessage.value = null
  }

  const submit = async (payload: HireFormSubmissionPayload): Promise<boolean> => {
    const apiUrl = (config.public.staticFormsApiUrl as string | undefined)?.trim() || ''
    const accessKey = (config.public.staticFormsAccessKey as string | undefined)?.trim() || ''

    if (!apiUrl || !accessKey) {
      if (import.meta.dev) {
        console.warn(
          '[hire form] StaticForms env missing: set NUXT_PUBLIC_STATIC_FORMS_API_URL and NUXT_PUBLIC_STATIC_FORMS_ACCESS_KEY, then restart the dev server. No request was sent.'
        )
      }
      status.value = 'error'
      clientErrorKey.value = 'hire.submission.errorConfig'
      serverMessage.value = null
      return false
    }

    status.value = 'submitting'
    clientErrorKey.value = null
    serverMessage.value = null

    const contractTypeLabel = t(
      EVENT_TYPE_ITEMS.find((item) => item.value === payload.contractType)?.labelKey
        ?? 'routes.espectacles',
    )

    const messageLines = [
      `Tipus de contracte: ${contractTypeLabel}`,
      `Element seleccionat: ${payload.selectedKey}`,
      ...(payload.comments?.trim() ? [`Comentaris: ${payload.comments?.trim()}`] : []),
    ]

    const staticFormsPayload = {
      accessKey,
      name: payload.fullName,
      email: payload.email,
      subject: 'Contactar per ' + contractTypeLabel,
      replyTo: '@',
      message: messageLines.join('\n'),
      honeypot: payload.honeypot,
    }

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(staticFormsPayload),
        redirect: 'follow',
      })

      let data: HireFormSubmissionResponse
      try {
        data = await res.json() as HireFormSubmissionResponse
      } catch {
        status.value = 'error'
        clientErrorKey.value = 'hire.submission.errorParse'
        return false
      }

      if (!res.ok || !data.success) {
        status.value = 'error'
        serverMessage.value = data.message?.trim() || null
        clientErrorKey.value = serverMessage.value ? null : 'hire.submission.error'
        return false
      }

      status.value = 'success'
      return true
    } catch {
      status.value = 'error'
      clientErrorKey.value = 'hire.submission.errorNetwork'
      serverMessage.value = null
      return false
    }
  }

  return {
    status,
    clientErrorKey,
    serverMessage,
    errorText,
    submit,
    resetStatus,
  }
}
