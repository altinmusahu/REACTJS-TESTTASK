/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica'],
      },
      colors: {
        customGray: '#202529'
      }
    },
  },
  plugins: [],
};
