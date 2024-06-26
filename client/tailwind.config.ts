import type { Config } from "tailwindcss";
import { colors, nextui } from "@nextui-org/react"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      'dark': {
        colors: {
          focus: '#e11d48',
          secondary: '#9333ea',
        }

      },
      'light': {
        colors: {
          primary: '#e11d48',
          secondary: '#000',
          focus: '#e11d48',
          danger: '#e11d48',
        }
      }
    }
  })],
};
export default config;
