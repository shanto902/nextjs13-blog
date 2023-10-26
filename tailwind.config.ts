import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  plugins: [require("@tailwindcss/container-queries"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=corporate]"],
          accent: "black",
          secondary: "white",
          neutral: "black",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=business]"],
          accent: "white",
          secondary: "black",
          neutral: "white",
        },
      },
    ],
    darkTheme: "dark",
  },
};

export default config;
