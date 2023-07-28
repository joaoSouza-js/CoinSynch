/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)'],
      },
      colors: {
        red: {
          500: '#EC3237',
          400: '#FA7D80',
          600: '#D42D31',
          700: '#A12226'
        },
        yellow: {
          100: '#FFF6E8',
          200: '#FFE1B5',
          500: '#FBAB34',
          400: '#FFB94F',
          600: '#e09422'
        },
        gray: {
          300: '#E0DEEA',
          500: '#8C8A97',
          400: '#ACABB7',
          600: '#716F7A',
          700: '#5F5C6B',
          800: '#4E4B59'
        }
        ,
        green: {
          500: '#1BD171',
          400: '#8DE8B8',
          600: '#18B863',
          700: '#149E55'
        }
      }
    },
  },
  plugins: [],
}
