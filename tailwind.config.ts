import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkgray: "#2C2C2C",
        lightgray: "#F5F5F5",
        offwhite: "#F4F4F4",
        "custom-orange": "#F2994A",
        "custom-blue": "#56CCF2",
        "custom-green": "#6FCF97",
        "custom-red": "#6FCF97",
        "custom-yellow": "#F2C94C",
        "custom-black": "#0A0908",
        "custom-white": "#fff",
      },
    },
  },
  plugins: [],
};
export default config;
