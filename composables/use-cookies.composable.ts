const showModal = ref(false)

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

  const cookiePreferences = import.meta.client ? useCookie('cookie-preferences', {
    default: () => ({
      essential: true,
      functional: false
    }),
    maxAge: 60 * 60 * 24 * 365, // 1 year
    ...cookieSecurityConfig
  }) : ref({ essential: true, functional: false })

  const showBanner = computed(() => import.meta.client ? cookieConsent.value === null : false)

  const canUseFunctionalCookies = computed(() => {
    if (!import.meta.client) return false
    return cookieConsent.value === 'accepted' || 
           (cookieConsent.value === 'customized' && cookiePreferences.value?.functional === true)
  })

  const canLoadYouTubeWithCookies = computed(() => {
    return canUseFunctionalCookies.value
  })

  const canLoadGoogleMaps = computed(() => {
    return canUseFunctionalCookies.value
  })

  const acceptAll = () => {
    cookieConsent.value = 'accepted'
    cookiePreferences.value = {
      essential: true,
      functional: true
    }
    showModal.value = false
  }

  const rejectAll = () => {
    cookieConsent.value = 'rejected'
    cookiePreferences.value = {
      essential: true,
      functional: false
    }
    showModal.value = false
  }

  const savePreferences = (preferences: { essential: boolean; functional: boolean }) => {
    try {
      cookieConsent.value = 'customized'
      cookiePreferences.value = preferences
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
    cookiePreferences.value = {
      essential: true,
      functional: false
    }
    showModal.value = false
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
    rejectAll,
    savePreferences,
    openModal,
    closeModal,
    resetConsent
  }
}
