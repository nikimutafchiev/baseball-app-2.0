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
        "4xs": "8px",
        "5xs": "7px",
        "6xs": "6px"
      },
      colors:
      {
        "primary_1": "#0d47a1",
        "primary_2": "#1976d2",
        "primary_2_hover": "#1565c0",
        "primary_3": "#1e88e5",
        "dark_1": "#454655",
        "dark_2": "#a98467",
        "background": "#F2E8CF",
        "accent_1": "#BC4749",
        "accent_2": "#DB504A",
        "accent_3": "#FF6F59",
        "line": "#111827"
      }
    },
  },
  plugins: []
}
