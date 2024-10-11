/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        'cardinal': '#bc1b36',
        'cerulean': '#01aedd',
        'milano-red': '#c80d0d',
        'nile-blue': '#193950'
      },
      backgroundImage: {
        'highlightPrimary': `linear-gradient(to right bottom,
      rgba(#c80d0d, 1), rgba('#bc1b36', 1)})`,
        'highlightSecondary': `linear-gradient(to right bottom,
      rgba(#01aedd, 1),
      rgba(#2998ff, 1))`,
        'highlightTertiary': `linear-gradient(to right bottom,
      rgba(#5643fa, 1),
      rgba(#193950, 1))`
      }
    },
  },
  plugins: [],
}
