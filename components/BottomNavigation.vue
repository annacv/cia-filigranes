<script setup lang="ts">
import { ROUTES_INDEX } from '~/constants';

const { getLocale } = useI18nUtils();
const { isRouteActiveExact } = useRouteActive();
</script>

<template>
  <nav
    role="navigation"
    aria-label="Footer navigation"
    class="w-full"
  >
    <div class="grid-layout bg-neutral-900 text-white">
      <div class="layout-cols py-8 xl:py-14">
        <div class="grid grid-cols-3 md:grid-cols-6 gap-5 md:gap-6 xl:gap-8">
          <div class="flex flex-col gap-3">
            <NuxtLinkLocale
              :to="'/'"
              class="w-max text-sm xl:text-base font-semibold transition-opacity duration-200 border-b-2 border-white pb-1"
              :class="{
                'border-opacity-100': isRouteActiveExact('/'),
                'border-opacity-0 hover:border-opacity-50 hover:opacity-80': !isRouteActiveExact('/')
              }"
              :aria-current="isRouteActiveExact('/') ? 'page' : undefined"
            >
              {{ getLocale('home', 'routes') }}
            </NuxtLinkLocale>
          </div>

          <div
            v-for="(routeItem, index) in ROUTES_INDEX"
            :key="index"
            class="flex flex-col gap-1 md:gap-3"
          >
            <NuxtLinkLocale
              :to="routeItem.name"
              class="w-max text-sm xl:text-base font-semibold transition-opacity duration-200 border-b-2 border-white pb-1"
              :class="{
                'border-opacity-100': isRouteActiveExact(`/${routeItem.name}`),
                'border-opacity-0 hover:border-opacity-50 hover:opacity-80': !isRouteActiveExact(`/${routeItem.name}`)
              }"
              :aria-current="isRouteActiveExact(`/${routeItem.name}`) ? 'page' : undefined"
            >
              {{ getLocale(routeItem.name, 'routes') }}
            </NuxtLinkLocale>

            <ul
              v-if="routeItem.children && routeItem.children.length > 0"
              class="flex flex-col gap-2"
            >
              <li
                v-for="(child, childIndex) in routeItem.children"
                :key="childIndex"
              >
                <NuxtLinkLocale
                  :to="`/${routeItem.name}/${child}`"
                  class="w-max text-xs xl:text-sm font-light transition-opacity duration-200 border-b-2 border-white pb-1"
                  :class="{
                    'border-opacity-100': isRouteActiveExact(`/${routeItem.name}/${child}`),
                    'border-opacity-0 hover:border-opacity-50 hover:opacity-80': !isRouteActiveExact(`/${routeItem.name}/${child}`)
                  }"
                  :aria-current="isRouteActiveExact(`/${routeItem.name}/${child}`) ? 'page' : undefined"
                >
                  {{ getLocale(child, 'routes') }}
                </NuxtLinkLocale>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

