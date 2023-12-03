<template>
  <nav role="navigation">
    <ul class="navbar__menu-list">
      <li class="navbar__menu-item">
        <NuxtLinkLocale :to="('/')">
          {{ getLocale('home', 'routes') }}
        </NuxtLinkLocale>
      </li>
      <component :is="route.children ? 'ul':'li'"
        v-for="(route, index) in routes"
        :key="index"
        class="navbar__menu-item"
      >
        <NuxtLinkLocale :to="route.name">
          {{ getLocale(route.name, 'routes') }}
        </NuxtLinkLocale>
        
        <template v-if="route.children">
          <li v-for="(child, index) in route.children"
            :key="index"
          >
          <NuxtLinkLocale :to="(`/${route.name}/${child}`)">
          {{ getLocale(child, 'routes') }}
          </NuxtLinkLocale>
          </li>
        </template>
      </component>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { getLocale } from '../composables/use-i18n-utils.composable'
  import { ROUTES_INDEX } from '../constants/constants'

  const routes = ROUTES_INDEX;
</script>
