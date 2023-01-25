/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        spacing: {
          '52vh': ' 26rem',
        },
  },
  plugins: [require('tailwind-scrollbar')],
  }
}
