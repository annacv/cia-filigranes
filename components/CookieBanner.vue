<script setup lang="ts">
const { showBanner, acceptAll, rejectAll, openModal } = useCookies()
</script>

<template>
  <ClientOnly>
    <Transition
      v-if="showBanner"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-full opacity-0"
    >
      <div
        class="fixed bottom-0 left-0 right-0 z-20 bg-black/85 backdrop-blur-sm shadow-lg"
      >
        <div class="container mx-auto px-4 py-5">
          <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div class="flex-1">
              <p class="text-sm text-white mb-4 lg:mb-0">
                {{ $t('cookies.banner.description') }}
                <NuxtLinkLocale
                  to="/politica-cookies"
                  class="ml-1 text-neutral-100 hover:text-neutral-300 underline"
                >
                  {{ $t('cookies.banner.moreInfo') }}
                </NuxtLinkLocale>
              </p>
            </div>
            <div class="flex flex-col text-sm sm:flex-row gap-2 w-full lg:w-auto">
              <FiliButton
                :text="$t('cookies.banner.accept')"
                button-class="px-3 py-2 button-outline-neutral"
                :on-click="acceptAll"
              />
              <FiliButton
                :text="$t('cookies.banner.customize')"
                button-class="px-3 py-2 button-outline-neutral bg-neutral-100 text-neutral-600"
                :on-click="openModal"
              />
              <FiliButton
                :text="$t('cookies.banner.reject')"
                button-class="px-3 py-2 button-outline-neutral bg-neutral-100 text-neutral-400"
                :on-click="rejectAll"
              />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>
