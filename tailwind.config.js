/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
  colors: {
    bat: {
      black: '#0b0b0d',
      dark:  '#111113',
      grey:  '#1c1d20',
      lightgrey: '#a7a7ac',
      red:   '#ff2e50',
      pink:  '#ff2e88',
      // new:
      burgundy: '#6e1822',
      burgundy2: '#8b2431',
    },
  },
}
,
  },
  plugins: [require('flowbite/plugin')],
}
