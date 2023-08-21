/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#070707" ,//primary background color

        "secondary": "#2E59BF", //secondary background color , eg for buttons
        "primaryFont": "#FFFFFF" ,//primary font color
      }
    },
    
  }, 
  plugins: [
    require('tailwindcss-dotted-background'),
  ],
}