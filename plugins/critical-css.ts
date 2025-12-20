/**
 * Plugin to inject critical CSS inline for faster initial render
 * This includes font-face declarations for preloaded fonts
 */
import ibmPlexSansRegular from '~/assets/fonts/ibm-plex-sans/ibm-plex-sans-regular.woff2?url';
import archivoBlackRegular from '~/assets/fonts/archivo-black/archivo-black-regular.woff2?url';

export default defineNuxtPlugin(() => {
  const criticalCSS = `
/* Critical CSS - Inlined for faster initial render */
/* IBM Plex Sans - Regular (preloaded) */
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('${ibmPlexSansRegular}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Archivo Black - Regular (preloaded) */
@font-face {
  font-family: 'Archivo Black';
  src: url('${archivoBlackRegular}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
`;

  // Inject critical CSS inline in the head
  useHead({
    style: [
      {
        innerHTML: criticalCSS,
        key: 'critical-css',
      },
    ],
  });
});

