/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#E61C24', // Rocker Pizza Bright Red
        'brand-yellow': '#FFC72C', // Cheese/Dough Yellow
        'brand-dark': '#121212', // Deep Black
        'brand-card': '#1E1E1E', // Dark Gray for cards
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        heading: ['Anton', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
