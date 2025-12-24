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
    "@nuxt/eslint"
  ],
  svgo: {
    svgoConfig: {},
  },
  css: [
    '~/assets/css/fonts.css'
  ],
  i18n: {
    baseUrl: "https://www.ciafiligranes.net",
    locales: localeObjects,
    customRoutes: 'config',
    pages: routePages,
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "ca",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts"
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    viewer: false,
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
    minify: true,
  },
});