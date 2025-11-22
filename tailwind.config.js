/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <-- c'est le SEUL pattern src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
