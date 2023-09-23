/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Primary: "#ffff00",
        Secondary: "#263238",
        "Default / White": "#ffff",
        "Neutral/Silver": "#F5F7FA",
        Gray900: "#18191F",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
