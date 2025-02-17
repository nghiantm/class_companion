/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Black Han Sans", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "sign_in_art": "url('/src/assets/sign_in_art.jpg')"
      }
    },
  },
  plugins: [],
});