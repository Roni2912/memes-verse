/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        press: ['"Press Start 2P"', 'cursive'], 
      },
    },
    variants: {
      extend: {
        // zIndex: {
        //   '30': '30',
        //   // '40': '40',
        //   '45': '45',
        //   '50': '50',
        // },
        scale: ['group-hover'],
        opacity: ['group-hover'],
      },
    },
    
  },
  plugins: [],
}

