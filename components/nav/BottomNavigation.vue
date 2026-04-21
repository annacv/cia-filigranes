<script setup lang="ts">
import { ROUTES_INDEX } from '~/constants';

const { getLocale } = useI18nUtils();
const { isRouteActiveExact } = useRouteActive();

const bottomNavRoutes = computed(() =>
  ROUTES_INDEX.filter((routeItem) => routeItem.name !== 'descarregues')
);
</script>

<template>
  <nav
    role="navigation"
    aria-label="Footer navigation"
    class="w-full"
  >
    <div class="grid-layout bg-neutral-900 text-white">
      <div class="layout-cols py-8 xl:py-14">
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5 gap-y-8 sm:gap-6 xl:gap-8">
          <div
            v-for="(routeItem, index) in bottomNavRoutes"
            :key="index"
            class="flex flex-col gap-1"
          >
            <NuxtLinkLocale
              :to="routeItem.name"
              class="w-max text-xs sm:text-sm xl:text-base font-semibold transition-opacity duration-200 border-b-2 border-white pb-1"
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

