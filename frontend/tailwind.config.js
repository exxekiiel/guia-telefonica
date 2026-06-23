/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        manzana: '#7CB342',
        'manzana-light': '#9CCC65',
        'manzana-dark': '#558B2F',
        turquesa: '#00BCD4',
        'turquesa-light': '#4DD0E1',
        'turquesa-dark': '#0097A7',
      },
    },
  },
  plugins: [],
}
