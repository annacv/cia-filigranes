// https://nuxt.com/docs/api/configuration/nuxt-config
import { routePages, localeObjects } from "./i18n/index";

const DEFAULT_LOCALE = "ca";
const localizedHomeRoutes = localeObjects
  .filter((locale): locale is typeof locale & { code: string } => {
    return typeof locale.code === "string" && locale.code !== DEFAULT_LOCALE;
  })
  .map(locale => `/${locale.code}`);

export default defineNuxtConfig({
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    googleCalendarApiKey: '',
    googleCalendarId: '',
    public: {
      googleCalendarApiKey: '',
      googleCalendarId: '',
      staticFormsApiUrl: '',
      staticFormsAccessKey: '',
    },
  },
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
  compatibilityDate: "2026-01-02",
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
    // Nitro's terser minify step hangs in worker threads with @rollup/plugin-terser >= 1.0.0
    // (serialize-javascript@7 regression). For the `static` preset the shipped client JS is
    // already minified by Vite (esbuild), so this only skips minifying the unused server bundle.
    minify: false,
    prerender: {
      routes: [
        '/',
        ...localizedHomeRoutes,
      ],
    },
  },
});