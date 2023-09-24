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
      screens: {
        sm: "355px",
        // => @media (min-width: 640px) { ... }

        md: "650px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        Primary: "#ffff00",
        button: "#f1c40f",
        Secondary: "#263238",
        "Default / White": "#ffff",
        "Neutral/Silver": "#F5F7FA",
        Gray900: "#18191F",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
