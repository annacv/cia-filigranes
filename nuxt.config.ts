// https://nuxt.com/docs/api/configuration/nuxt-config
import { routePages, localeObjects } from "./locales/index";

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
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "ca",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts"
  },
  compatibilityDate: "2025-06-27",
  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/assets/images/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000',
        },
      },
      '/assets/fonts/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000',
        },
      },
      '/assets/icons/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000',
        },
      },
      '/_nuxt/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      },
      '/downloads/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000',
        },
      },
      '/favicon.ico': {
        headers: {
          'Cache-Control': 'public, max-age=31536000',
        },
      },
    },
  },
});