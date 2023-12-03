// https://nuxt.com/docs/api/configuration/nuxt-config
import { routePages, localeObjects } from "./locales/index";

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "msapplication-TileColor", content: "#b91d47" },
        { name: "theme-color", content: "#ffffff" },
      ],
      titleTemplate: "Cia.Filigranes",
    },
    pageTransition: { name: "fade", mode: "out-in" },
    rootId: "ciafiligranes",
  },
  css: ["@/assets/scss/main.scss"],
  devtools: { enabled: true },
  modules: ["@nuxtjs/i18n", "@nuxtjs/tailwindcss"],
  i18n: {
    baseUrl: "http://localhost:3000",
    locales: localeObjects,
    customRoutes: 'config',
    pages: routePages,
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "ca",
    // TODO: Check if this can be enabled/disabled by users https://i18n.nuxtjs.org/guide/browser-language-detection
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
  },
});
