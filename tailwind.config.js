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
        gotham: {
          50: '#f7f7f7', 100: '#e3e3e3', 200: '#c8c8c8', 300: '#a4a4a4',
          400: '#7a7a7a', 500: '#4f4f4f', 600: '#363636', 700: '#252525',
          800: '#191919', 900: '#0f0f0f', 950: '#0a0a0a'
        },
        accent: { 500: '#FFD400' }
      },
      boxShadow: { smooth: '0 10px 30px rgba(0,0,0,0.25)' }
    },
  },
  plugins: [require('flowbite/plugin')],
}
