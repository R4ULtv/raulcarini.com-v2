/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            "code::before": false,
            "code::after": false,
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
