import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#f2f2f2",
        primary: "#00E5FF", // Electric Blue
        card: "#12121a",
        accent: "rgba(0, 229, 255, 0.1)"
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 229, 255, 0.5)',
      }
    },
  },
  plugins: [],
};
export default config;
