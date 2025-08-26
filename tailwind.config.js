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
          black: '#0f0f0f',
          dark: '#1a1a1a',
          grey: '#2d2d2d',
          lightgrey: '#9e9e9e',
          pink: '#ff2e88',
          red: '#ff1744',
        },
      },
      boxShadow: {
        smooth: '0 10px 30px rgba(0,0,0,0.4)',
        neon: '0 0 15px rgba(255, 46, 136, 0.6)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
