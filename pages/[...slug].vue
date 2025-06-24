<template>
  <div>
    <h1>Page not found</h1>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <NuxtLink to="/">Go to home page</NuxtLink>
  </div>
</template>

<script setup>
// This is a catch-all route that will match any route not defined in your pages
// It will show a 404 page for any unknown routes

definePageMeta({
  name: 'catch-all',
  path: '/:pathMatch(.*)*',
  meta: {
    layout: 'error'
  }
});
</script>
