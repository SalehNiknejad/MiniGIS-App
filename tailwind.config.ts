import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        farsi: ["Rubik", "sans-serif"],
        sans: ["Manrope Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config
