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
        background: "#08090d",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#3b82f6",
          hover: "#2563eb",
          light: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#1e293b",
          hover: "#334155",
        },
        accent: {
          DEFAULT: "#00f2fe",
          purple: "#7c3aed",
        },
        surface: "#111827",
        border: "#1f2937",
      },
      backgroundImage: {
        "hero-pattern": "url('/hero-bg.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.4)',
        'accent-glow': '0 0 20px rgba(0, 242, 254, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
export default config;

