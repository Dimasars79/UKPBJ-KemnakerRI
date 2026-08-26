import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#0f172a",
          blue: "#1e3a8a",
          DEFAULT: "#1e3a8a",
        },
        secondary: {
          soft: "#bfdbfe",
          gray: "#f1f5f9",
          offwhite: "#f8fafc",
          DEFAULT: "#f1f5f9",
        },
        accent: {
          red: "#dc2626",
          gold: "#d4af37",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
