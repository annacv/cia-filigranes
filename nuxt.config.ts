// https://nuxt.com/docs/api/configuration/nuxt-config

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
  modules: ["@nuxtjs/i18n"],
  i18n: {
    baseUrl: "http://localhost:3000",
    locales: [
      { code: "ca", iso: "ca-CA", name: "Català", dir: "ltr", file: 'ca/ca-CA.json' },
      { code: "es", iso: "es-ES", name: "Castellano", dir: "ltr", file: 'es/es-ES.json' },
      { code: "en", iso: "en-GB", name: "English", dir: "ltr", file: 'en/en-GB.json' },
    ],
    lazy: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    defaultLocale: "ca",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
  },
});
