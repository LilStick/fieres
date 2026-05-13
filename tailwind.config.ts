import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#F4620A",
          50: "#FFF1E6",
          100: "#FFE0C4",
          200: "#FFC089",
          300: "#FFA04D",
          400: "#FF8019",
          500: "#F4620A",
          600: "#C44E08",
          700: "#943B06",
          800: "#642704",
          900: "#341402",
        },
        ink: "#0A0A0A",
        bone: "#F7F2EA",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-cta": "pulse-cta 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        "pulse-cta": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(255,255,255,0.5)" },
          "50%": { transform: "scale(1.04)", boxShadow: "0 0 0 14px rgba(255,255,255,0)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
