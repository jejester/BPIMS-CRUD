/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        workSans: ['Work-Sans', 'sans-serif'],
        dmSerif: ['DM-Serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

