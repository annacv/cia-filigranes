<template>
  <nav>
    <ul>
      <li>
        <NuxtLinkLocale :to="('/')">{{ $t('nav.home') }}</NuxtLinkLocale>
      </li>
      <li>
        <NuxtLink :to="localePath('/espectacles')">{{ $t('nav.shows') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/tallers')">{{ $t('nav.workshops') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/animacions')">{{ $t('nav.performances') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/filipersones')">{{ $t('nav.about') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="localePath('/contacte')">{{ $t('nav.contact') }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>
