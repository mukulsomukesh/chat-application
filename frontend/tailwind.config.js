/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E6F6FF',
          200: '#B3E5FC',
          300: '#81D4FA',
          400: '#4FC3F7',
          500: '#29B6F6',
          600: '#03A9F4',
          700: '#039BE5',
          800: '#0288D1',
          900: '#0277BD',
        },
      },
    },
  },
  plugins: [],
};
