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
        background: "#0a0a1a",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#7c3aed",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#64748b",
          foreground: "#94a3b8",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-sora)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(124, 58, 237, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
