import type { Config } from 'tailwindcss/types/config'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        'primary-light': '#c80d0d',
        'primary-dark': '#bc1b36',
        'secondary-light': '#01aedd',
        'secondary-dark': '#2998ff',
        'tertiary-light': '#5643fa',
        'tertiary-dark': '#193950',
        'grey-light-1': '#f7f7f7',
        'grey-light-2': '#eee',
        'grey-dark-1': '#999',
        'grey-dark-2': '#777',
        'grey-dark-3': '#333'
      },
      backgroundImage: {
        'highlight-primary': 'linear-gradient(to right bottom, var(--color-primary-light), var(--color-primary-dark))',
        'highlight-secondary': 'linear-gradient(to right bottom, var(--color-secondary-light), var(--color-secondary-dark))',
        'highlight-tertiary': 'linear-gradient(to right bottom, var(--color-tertiary-light), var(--color-tertiary-dark))',
      },
      skew: {
        '7': '7deg',
      }
    },
  },
  plugins: [],
}

export default config
