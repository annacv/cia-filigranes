<script setup lang="ts">
const { showModal, cookieConsent, cookiePreferences, acceptAll, rejectAll, savePreferences, closeModal, resetConsent } = useCookies()

const preferences = ref({
  essential: true,
  youtube: false,
  maps: false,
})

// Initialize preferences from cookie
watchEffect(() => {
  if (cookiePreferences.value) {
    preferences.value = { ...cookiePreferences.value }
  }
})

// Handle save with error handling
const handleSave = () => {
  try {
    savePreferences(preferences.value)
  } catch (error) {
    console.error('Error saving cookie preferences:', error)
  }
}
</script>

<template>
  <BaseModal
    :ariaLabel="$t('cookies.modal.title')"
    :is-open="showModal"
    :title="$t('cookies.modal.title')"
    @close="closeModal"
  >
    <template #content>
      <div class="flex flex-col gap-6">
        <p class="text-neutral-600">
          {{ $t('cookies.modal.description') }}
        </p>

        <div class="flex flex-col gap-6">
          <div class="border border-neutral-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-neutral-800">
                {{ $t('cookies.modal.essential.title') }}
              </h3>
              <span class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                {{ $t('cookies.modal.essential.required') }}
              </span>
            </div>
            <p class="text-sm text-neutral-600 mb-3">
              {{ $t('cookies.modal.essential.description') }}
            </p>
            <div class="flex items-center">
              <input
                id="essential-checkbox"
                type="checkbox"
                :checked="preferences.essential"
                :aria-label="$t('cookies.modal.essential.required')"
                :aria-checked="preferences.essential"
                disabled
                class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              >
              <span class="ml-2 text-sm text-neutral-500">
                {{ $t('cookies.modal.essential.required') }}
              </span>
            </div>
          </div>

          <div class="border border-neutral-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-neutral-800">
                {{ $t('cookies.modal.youtube.title') }}
              </h3>
              <span class="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
                {{ $t('cookies.modal.youtube.optional') }}
              </span>
            </div>
            <p class="text-sm text-neutral-600 mb-3">
              {{ $t('cookies.modal.youtube.description') }}
            </p>
            <div class="flex items-center">
              <input
                id="youtube-checkbox"
                v-model="preferences.youtube"
                type="checkbox"
                :aria-label="$t('cookies.modal.youtube.optional')"
                :aria-checked="preferences.youtube"
                class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              >
              <span class="ml-2 text-sm text-neutral-600">
                {{ $t('cookies.modal.youtube.optional') }}
              </span>
            </div>
          </div>

          <div class="border border-neutral-200 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-neutral-800">
                {{ $t('cookies.modal.maps.title') }}
              </h3>
              <span class="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
                {{ $t('cookies.modal.maps.optional') }}
              </span>
            </div>
            <p class="text-sm text-neutral-600 mb-3">
              {{ $t('cookies.modal.maps.description') }}
            </p>
            <div class="flex items-center">
              <input
                id="maps-checkbox"
                v-model="preferences.maps"
                type="checkbox"
                :aria-label="$t('cookies.modal.maps.optional')"
                :aria-checked="preferences.maps"
                class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
              >
              <span class="ml-2 text-sm text-neutral-600">
                {{ $t('cookies.modal.maps.optional') }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template #footer>
      <div class="py-6 flex flex-col text-sm xs:flex-row gap-3 justify-between xs:items-center">
        <button
          v-if="cookieConsent !== null"
          type="button"
          class="text-sm text-neutral-700 underline underline-offset-2 hover:text-neutral-900 text-left"
          @click="resetConsent"
        >
          {{ $t('cookies.modal.withdraw') }}
        </button>
        <div class="flex flex-col text-sm xs:flex-row gap-3 justify-end">
          <FiliButton
            :text="$t('cookies.modal.rejectAll')"
            button-class="px-3 py-2 button-outline-neutral bg-neutral-100 text-neutral-900 border-neutral-900 hover:bg-neutral-900 hover:border-neutral-900"
            :on-click="rejectAll"
          />
          <FiliButton
            :text="$t('cookies.modal.acceptAll')"
            button-class="px-3 py-2 button-outline-neutral bg-neutral-100 text-neutral-900 border-neutral-900 hover:bg-neutral-900 hover:border-neutral-900"
            :on-click="acceptAll"
          />
          <FiliButton
            :text="$t('cookies.modal.save')"
            button-class="px-3 py-2 button-outline-neutral bg-neutral-100 text-neutral-900 border-neutral-900 hover:bg-neutral-900 hover:border-neutral-900"
            :on-click="handleSave"
          />
        </div>
      </div>
    </template>
  </BaseModal>
</template>
