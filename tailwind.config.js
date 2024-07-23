/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'textoCinza': '#878787',
      'textoVerde': '#9AF952',
      'textoLaranja': '#FA4D00',
      'textoBranco': '#FFFFFF',
      'fundo': '#242424'
    },
  },
  plugins: [],
}

