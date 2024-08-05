/* eslint-env node */
/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {},

    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
