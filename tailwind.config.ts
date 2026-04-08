import type { Config } from 'tailwindcss/types/config'

const config: Config = {
  content: [
    './pages/**/*.vue',
    './components/**/*.vue',
    './constants/**/*.{js,ts}',
    './layouts/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    screens: {
      'xs': '425px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      gridTemplateColumns: {
        14: 'repeat(14, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
      },
      gridColumnStart: {
        13: '13',
        14: '14',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
      rotate: {
        'y-180': '180deg',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        grotesk: ['Archivo Black', 'sans-serif'],
        alternative: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      colors: {
        'primary-300': '#f6b1bd',
        'primary-400': '#ec3636',
        'primary-500': '#c80d0d',
        'primary-700': '#bc1b36',
        'secondary-300': '#a88db7',
        'secondary-400': '#795090',
        'secondary-500': '#5c2978',
        'secondary-700': '#491a63',
        'tertiary-300': '#f29b8d',
        'tertiary-400': '#E9573D',
        'tertiary-500': '#e32906',
        'tertiary-700': '#cb2303',
        'quaternary-300': '#fdf48f',
        'quaternary-500': '#fbdd0b',
        'neutral-100': '#f7f7f7',
        'neutral-200': '#eee',
        'neutral-400': '#999',
        'neutral-600': '#666',
        'neutral-800': '#333',
        'neutral-900': '#25272c'
      },
      backgroundImage: {
        'highlight-primary': 'linear-gradient(to right bottom, var(--color-primary-500), var(--color-primary-700))',
        'highlight-secondary': 'linear-gradient(to right bottom, var(--color-secondary-500), var(--color-secondary-700))',
        'highlight-tertiary': 'linear-gradient(to right bottom, var(--color-tertiary-500), var(--color-tertiary-700))',
        'highlight-quaternary': 'linear-gradient(to right bottom, var(--color-quaternary-500), var(--color-quaternary-300))',
      },
      willChange: {
        'auto': 'auto',
        'scroll': 'scroll-position',
        'contents': 'contents',
        'transform': 'transform',
        'opacity': 'opacity',
        'clip-path': 'clip-path',
        'height': 'height',
        'object-position': 'object-position',
        'mix-blend-mode': 'mix-blend-mode',
        'bg-color': 'background-color',
        'color': 'color',
      }
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /^(text|border)-(primary|secondary|tertiary|quaternary)-(300|500|700)$/,
    },
    {
      pattern: /^(w|h|!w|!h)-7$/,
    },
    {
      pattern: /^button-(outline|solid)-(primary|secondary|tertiary|neutral)$/,
    },
    {
      pattern: /^button-solid-light-neutral$/,
    },
  ],
}

export default config
