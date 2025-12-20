// https://nuxt.com/docs/api/configuration/nuxt-config
import { routePages, localeObjects } from "./i18n/index";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    rootId: "cia-filigranes",
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/device",
    "nuxt-svgo",
    "@nuxt/scripts",
    "@nuxt/eslint",
  ],
  svgo: {
    svgoConfig: {},
  },
  css: [
    '~/assets/css/fonts.css'
  ],
  i18n: {
    baseUrl: "http://localhost:3000",
    locales: localeObjects,
    customRoutes: 'config',
    pages: routePages,
    strategy: "prefix_except_default",
    defaultLocale: "ca",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts"
  },
  compatibilityDate: "2025-12-20",
  vite: {
    css: {
      devSourcemap: true,
    },
    build: {
      cssCodeSplit: true,
    },
  },
  nitro: {
    preset: 'static',
    compressPublicAssets: true,
  },
});