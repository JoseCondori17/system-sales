/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          'steam': 'rgba(54, 63, 76, 255)',
          'select': 'rgba(67,79,93,255)',
          'text': 'rgba(41, 209, 168, 255)',
          'limb': 'rgba(12,33,53,255)',
        }
      },
      fontFamily: {
        'jua': ['Jua', 'cursive'],
        'times': ['Times New Roman', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

