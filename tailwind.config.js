/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0b2a5b', dark: '#071c3f', light: '#1d4a99' },
        accent: { DEFAULT: '#f47920', dark: '#d9640f' },
        sand: '#f5f7fb',
      },
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      maxWidth: { page: '1200px' },
    },
  },
  plugins: [],
};
