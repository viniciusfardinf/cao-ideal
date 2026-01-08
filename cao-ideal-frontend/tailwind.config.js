/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'cao-dark': '#3a353a',
        'cao-medium': '#c2b6c2',
        'cao-bg': '#f5f2f5',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'glass': 'inset 0 0 0 1px rgba(255, 255, 255, 0.3)',
      }
    },
  },
  plugins: [],
}