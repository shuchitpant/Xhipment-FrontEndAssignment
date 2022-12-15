/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary:{
          'white': '#ffffff',
          'orange':'#FF5E14',
          'grey': '#25262B', 
          'lessBlack': '#131316',
          'darkGrey':'#2F313A',
          'purple' : '#B733CC',
          'crimson': '#FF5A5A'
        },
      },
      fontFamily:{
        thickboi: ["Thickboi", "sans"],
      }
    },
  },
  plugins: [],
}
