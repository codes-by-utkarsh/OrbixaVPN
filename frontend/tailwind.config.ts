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
        background: "#050608",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#00f2ff",
          hover: "#00d8e4",
          light: "#70faff",
          dark: "#00b4cc",
        },
        secondary: {
          DEFAULT: "#11141b",
          hover: "#1a1f29",
        },
        accent: {
          DEFAULT: "#00f2ff",
          purple: "#9d4edd",
          pink: "#ff007f",
        },
        surface: "#0d1117",
        border: "#1f2937",
        clay: {
          bg: "#151921",
          border: "#252b36",
        }
      },
      backgroundImage: {
        "hero-pattern": "url('/hero-bg.png')",
        "cyber-gradient": "linear-gradient(135deg, #00f2ff 0%, #9d4edd 100%)",
        "clay-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
      },
      boxShadow: {
        'glow': '0 0 25px rgba(0, 242, 255, 0.35)',
        'accent-glow': '0 0 30px rgba(157, 78, 221, 0.4)',
        'clay-out': '8px 8px 16px rgba(0,0,0,0.4), -4px -4px 12px rgba(255,255,255,0.03)',
        'clay-in': 'inset 4px 4px 8px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.02)',
        'cyber-hover': '0 0 40px rgba(0, 242, 255, 0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;

