/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "2xs": "10px",
        "3xs": "9px",
        "4xs": "8px"
      },
      colors:
      {
        "primary_1": "#386641",
        "primary_2": "#6A994E",
        "primary_3": "#A7C957",
        "dark_1": "#6c584c",
        "dark_2": "#a98467",
        "background": "#F2E8CF",
        "accent_1": "#BC4749",
        "accent_2": "#DB504A",
        "accent_3": "#FF6F59"
      }
    },
  },
  plugins: []
}
