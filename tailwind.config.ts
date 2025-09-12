import type { Config } from 'tailwindcss/types/config'

const config: Config = {
  content: [
    './index.html',
    './pages/**/*.vue',
    './components/**/*.vue',
    './layouts/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
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
        mono: ['IBM Plex Mono', 'monospace'],
        grotesk: ['Archivo Black', 'sans-serif']
      },
      colors: {
        'primary-300': '#f6b1bd',
        'primary-500': '#c80d0d',
        'primary-700': '#bc1b36',
        'secondary-500': '#5c2978',
        'secondary-700': '#491a63',
        'tertiary-500': '#e32906',
        'tertiary-700': '#cb2303',
        'quaternary-300': '#fdf48f',
        'quaternary-500': '#fbdd0b',
        'neutral-100': '#f7f7f7',
        'neutral-200': '#eee',
        'neutral-400': '#999',
        'neutral-600': '#777',
        'neutral-800': '#333',
        'neutral-900': '#25272c'
      },
      backgroundImage: {
        'highlight-primary': 'linear-gradient(to right bottom, var(--color-primary-500), var(--color-primary-700))',
        'highlight-secondary': 'linear-gradient(to right bottom, var(--color-secondary-500), var(--color-secondary-700))',
        'highlight-tertiary': 'linear-gradient(to right bottom, var(--color-tertiary-500), var(--color-tertiary-700))',
      }
    },
  },
  plugins: [],
  safelist: [
    'text-primary-500', 'border-primary-500',
    'text-secondary-500', 'border-secondary-500',
    'text-tertiary-500', 'border-tertiary-500',
  ],
}

export default config
