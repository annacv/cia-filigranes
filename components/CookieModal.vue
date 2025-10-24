<script setup lang="ts">
const { showModal, cookiePreferences, acceptAll, rejectAll, savePreferences, closeModal } = useCookies()

const preferences = ref({
  essential: true,
  functional: false
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
    :is-open="showModal"
    @close="closeModal"
  >
    <div class="p-6">
      <div class="mb-6">
        <h2 class="text-lg font-grotesk uppercase text-neutral-800">
          {{ $t('cookies.modal.title') }}
        </h2>
      </div>
      <p class="text-neutral-600 mb-6">
        {{ $t('cookies.modal.description') }}
      </p>

      <div class="space-y-6 mb-8">
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
              type="checkbox"
              :checked="preferences.essential"
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
              {{ $t('cookies.modal.functional.title') }}
            </h3>
            <span class="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">
              {{ $t('cookies.modal.functional.optional') }}
            </span>
          </div>
          <p class="text-sm text-neutral-600 mb-3">
            {{ $t('cookies.modal.functional.description') }}
          </p>
          <div class="flex items-center">
            <input
              v-model="preferences.functional"
              type="checkbox"
              class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            >
            <span class="ml-2 text-sm text-neutral-600">
              {{ $t('cookies.modal.functional.optional') }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col text-sm xs:flex-row gap-3 justify-end">
        <FiliButton
          :text="$t('cookies.modal.rejectAll')"
          button-class="px-3 py-2 leading-normal bg-neutral-100 text-neutral-400 hover:bg-neutral-200"
          :on-click="rejectAll"
        />
        <FiliButton
          :text="$t('cookies.modal.acceptAll')"
          button-class="px-3 py-2 button-outline-neutral"
          :on-click="acceptAll"
        />
        <FiliButton
          :text="$t('cookies.modal.save')"
          button-class="px-3 py-2 leading-normal bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          :on-click="handleSave"
        />
      </div>
    </div>
  </BaseModal>
</template>
