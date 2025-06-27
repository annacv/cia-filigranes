// https://nuxt.com/docs/api/configuration/nuxt-config
import { routePages, localeObjects } from "./locales/index";

export default defineNuxtConfig({
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    rootId: "cia-filigranes",
  },
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss", "@nuxtjs/device"],
  i18n: {
    baseUrl: "http://localhost:3000",
    locales: localeObjects,
    customRoutes: 'config',
    pages: routePages,
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "ca",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
  },
  compatibilityDate: "2025-06-27",
});
