/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#fffef5',
          100: '#fffce8',
          200: '#fff8d6',
          300: '#fff5bf',
          400: '#ffed8a',
          500: '#fde047',
          600: '#f4d535',
          700: '#dab800',
          800: '#b89a00',
          900: '#9b7f04',
        },
        bee: '#f59e0b',
      },
      fontFamily: {
        sans: [
          '"Noto Sans KR"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
