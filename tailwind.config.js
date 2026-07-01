/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B0F19', // Deep Navy / Black background
          800: '#111827', // Lighter Navy for cards
          700: '#1F2937', // Borders / Accents
        },
        magenta: {
          DEFAULT: '#E91E63',
          glow: '#FF2A85',
        },
        orange: {
          DEFAULT: '#FF9800',
          glow: '#FF6B00',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
