/**
 * Plugin to inject critical CSS inline for faster initial render
 * This includes:
 * - CSS variables (critical for theming)
 * - Font-face declarations for preloaded fonts
 * - Critical utility classes for above-the-fold content
 * 
 * Note: Tailwind base reset is handled by the full Tailwind CSS file
 * to avoid duplication and ensure consistency.
 */
import ibmPlexSansRegular from '~/assets/fonts/ibm-plex-sans/ibm-plex-sans-regular.woff2?url';
import archivoBlackRegular from '~/assets/fonts/archivo-black/archivo-black-regular.woff2?url';

export default defineNuxtPlugin(() => {
  const criticalCSS = `
/* Critical CSS - Inlined for faster initial render */

/* CSS Variables - Critical for theming */
:root {
  --color-primary-300: #f6b1bd;
  --color-primary-500: #c80d0d;
  --color-primary-700: #bc1b36;
  --color-secondary-500: #5c2978;
  --color-secondary-700: #491a63;
  --color-tertiary-500: #e32906;
  --color-tertiary-700: #cb2303;
  --color-quaternary-300: #fdf48f;
  --color-quaternary-500: #fbdd0b;
  --color-neutral-100: #f7f7f7;
  --color-neutral-200: #eee;
  --color-neutral-400: #999;
  --color-neutral-600: #666;
  --color-neutral-800: #333;
  --color-neutral-900: #25272c;
  --gradient-overlay-primary: rgb(200 13 13 / 0.72), rgb(20 2 4 / 0.66);
  --gradient-overlay-secondary: rgb(92 41 120 / 0.72), rgb(73 26 99 / 0.66);
  --gradient-overlay-tertiary: rgb(227 41 6 / 0.72), rgb(203 35 3 / 0.66);
  --gradient-overlay-quaternary: rgb(251 221 11 / 0.72), rgb(253 244 143 / 0.66);
  --line-height-sm: 1.4rem;
  --line-height-base: 1.8rem;
  --line-height-lg: 2.6rem;
}

/* Font-face declarations - Critical fonts only */
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('${ibmPlexSansRegular}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Archivo Black';
  src: url('${archivoBlackRegular}') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Font fallback - Prevent layout shift */
body.antialiased {
  font-family: 'IBM Plex Sans', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size-adjust: 0.5;
}

/* Critical utility classes for above-the-fold content */
.grid-layout{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:0;padding-left:1.25rem;padding-right:1.25rem;padding-top:0.75rem;padding-bottom:0.75rem}
@media (min-width:1280px){.grid-layout{grid-template-columns:repeat(12,minmax(0,1fr));gap:1.25rem;padding-top:1.25rem;padding-bottom:1.25rem}}
.layout-cols{grid-column-start:1;grid-column-end:span 6}
@media (min-width:1280px){.layout-cols{grid-column-start:2;grid-column-end:span 10}}

/* Grid column utilities - Critical for header */
.col-start-1{grid-column-start:1}
.col-start-2{grid-column-start:2}
.col-start-6{grid-column-start:6}
.col-span-1{grid-column:span 1/span 1}
.col-span-2{grid-column:span 2/span 2}
.col-span-3{grid-column:span 3/span 3}
.col-span-6{grid-column:span 6/span 6}
@media (min-width:1280px){.xl\\:col-start-2{grid-column-start:2}}
@media (min-width:1280px){.xl\\:col-start-11{grid-column-start:11}}
@media (min-width:1280px){.xl\\:col-span-1{grid-column:span 1/span 1}}
@media (min-width:1280px){.xl\\:col-span-2{grid-column:span 2/span 2}}

/* Critical positioning utilities */
.fixed{position:fixed}
.absolute{position:absolute}
.relative{position:relative}
.sticky{position:sticky}
.inset-0{top:0;right:0;bottom:0;left:0}
.top-0{top:0}
.left-0{left:0}
.w-full{width:100%}
.h-full{height:100%}
.z-10{z-index:10}
.z-100{z-index:100}

/* Critical display utilities */
.flex{display:flex}
.grid{display:grid}
.items-center{align-items:center}
.items-start{align-items:flex-start}
.justify-end{justify-content:flex-end}
.justify-self-end{justify-self:end}

/* Critical overflow and object utilities */
.overflow-hidden{overflow:hidden}
.object-cover{object-fit:cover}

/* Critical transition utilities */
.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
.duration-500{transition-duration:500ms}
.will-change-opacity{will-change:opacity}
.will-change-\\[clip-path\\,height\\]{will-change:clip-path,height}
.will-change-object-position{will-change:object-position}
.will-change-mix-blend-mode{will-change:mix-blend-mode}

/* Critical opacity utilities */
.opacity-0{opacity:0}
.opacity-100{opacity:1}

/* Critical mix-blend-mode utilities */
.mix-blend-soft-light{mix-blend-mode:soft-light}
.mix-blend-hard-light{mix-blend-mode:hard-light}

/* Critical shadow utility */
.shadow{box-shadow:0 1px 3px 0 rgb(0 0 0 / 0.1),0 1px 2px -1px rgb(0 0 0 / 0.1)}
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

