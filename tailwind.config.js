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
          900: '#12182A', // Lighter purple-navy background
          800: '#1A2236', // Lighter Navy for cards
          700: '#2C3850', // Borders / Accents
        },
        magenta: {
          DEFAULT: '#E91E63',
          glow: '#FF2A85',
        },
        orange: {
          DEFAULT: '#FF9800',
          glow: '#FF6B00',
        },
        gold: {
          DEFAULT: '#F4C430',
          deep: '#C49A12',
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
