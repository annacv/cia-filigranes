const showModal = ref(false)

type CookiePreferences = {
  essential: boolean
  youtube: boolean
  maps: boolean
}
type OptionalCookiePurpose = Exclude<keyof CookiePreferences, 'essential'>

type LegacyCookiePreferences = CookiePreferences & {
  functional?: boolean
}

const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  youtube: false,
  maps: false,
}

const normalizeCookiePreferences = (preferences: Partial<LegacyCookiePreferences> | null | undefined): CookiePreferences => {
  if (!preferences) return { ...DEFAULT_COOKIE_PREFERENCES }

  const legacyFunctional = preferences.functional === true

  return {
    essential: true,
    youtube: preferences.youtube ?? legacyFunctional,
    maps: preferences.maps ?? legacyFunctional,
  }
}

export const useCookies = () => {
  // Only create cookies on client side
  const isProduction = import.meta.client ? window.location.protocol === 'https:' : false
  
  const cookieSecurityConfig = {
    secure: isProduction, // HTTPS only in production, allows HTTP in development
    sameSite: 'lax' as const, // CSRF protection while allowing normal navigation
    httpOnly: false // Required: JS must read/write for consent management (non-sensitive preference cookies)
  }
  
  const cookieConsent = import.meta.client ? useCookie<'accepted' | 'rejected' | 'customized' | null>('cookie-consent', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    ...cookieSecurityConfig
  }) : ref(null)

  const cookiePreferences = import.meta.client ? useCookie<CookiePreferences>('cookie-preferences', {
    default: () => ({ ...DEFAULT_COOKIE_PREFERENCES }),
    maxAge: 60 * 60 * 24 * 365, // 1 year
    ...cookieSecurityConfig
  }) : ref({ ...DEFAULT_COOKIE_PREFERENCES })
  const cookieConsentUpdatedAt = import.meta.client ? useCookie<string | null>('cookie-consent-updated-at', {
    default: () => null,
    maxAge: 60 * 60 * 24 * 365, // 1 year
    ...cookieSecurityConfig
  }) : ref<string | null>(null)

  const showBanner = computed(() => import.meta.client ? cookieConsent.value === null : false)

  const canUseFunctionalCookies = computed(() => {
    if (!import.meta.client) return false
    return cookieConsent.value === 'accepted' || 
           (cookieConsent.value === 'customized' && (cookiePreferences.value?.youtube === true || cookiePreferences.value?.maps === true))
  })

  const canLoadYouTubeWithCookies = computed(() => {
    if (!import.meta.client) return false
    return cookieConsent.value === 'accepted' || 
           (cookieConsent.value === 'customized' && cookiePreferences.value?.youtube === true)
  })

  const canLoadGoogleMaps = computed(() => {
    if (!import.meta.client) return false
    return cookieConsent.value === 'accepted' || 
           (cookieConsent.value === 'customized' && cookiePreferences.value?.maps === true)
  })

  const acceptAll = () => {
    cookieConsent.value = 'accepted'
    cookiePreferences.value = {
      essential: true,
      youtube: true,
      maps: true,
    }
    cookieConsentUpdatedAt.value = new Date().toISOString()
    showModal.value = false
  }

  const acceptByPurpose = (purpose: OptionalCookiePurpose) => {
    const normalizedPreferences = normalizeCookiePreferences(cookiePreferences.value as LegacyCookiePreferences)
    cookieConsent.value = 'customized'
    cookiePreferences.value = {
      ...normalizedPreferences,
      [purpose]: true,
      essential: true,
    }
    cookieConsentUpdatedAt.value = new Date().toISOString()
    showModal.value = false
  }

  const rejectAll = () => {
    cookieConsent.value = 'rejected'
    cookiePreferences.value = { ...DEFAULT_COOKIE_PREFERENCES }
    cookieConsentUpdatedAt.value = new Date().toISOString()
    showModal.value = false
  }

  const savePreferences = (preferences: CookiePreferences) => {
    try {
      cookieConsent.value = 'customized'
      cookiePreferences.value = normalizeCookiePreferences(preferences)
      cookieConsentUpdatedAt.value = new Date().toISOString()
      showModal.value = false
    } catch (error) {
      console.error('Error saving cookie preferences:', error)
    }
  }

  const openModal = () => {
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  const resetConsent = () => {
    cookieConsent.value = null
    cookiePreferences.value = { ...DEFAULT_COOKIE_PREFERENCES }
    cookieConsentUpdatedAt.value = null
    showModal.value = false
  }

  // Keep old consent objects compatible after model updates.
  if (import.meta.client) {
    cookiePreferences.value = normalizeCookiePreferences(cookiePreferences.value as LegacyCookiePreferences)
  }

  return {
    cookieConsent: readonly(cookieConsent),
    cookiePreferences: readonly(cookiePreferences),
    showBanner,
    showModal,
    canUseFunctionalCookies,
    canLoadYouTubeWithCookies,
    canLoadGoogleMaps,
    acceptAll,
    acceptByPurpose,
    rejectAll,
    savePreferences,
    openModal,
    closeModal,
    resetConsent
  }
}
