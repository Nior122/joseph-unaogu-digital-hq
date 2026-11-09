import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          850: "rgb(var(--ink-850) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
        },
        paper: { DEFAULT: "rgb(var(--paper-default) / <alpha-value>)", muted: "rgb(var(--paper-muted) / <alpha-value>)", dim: "rgb(var(--paper-dim) / <alpha-value>)" },
        brand: {
          DEFAULT: "#7C4DFF",
          50: "#F1ECFF",
          100: "#E4DAFF",
          200: "#C9B6FF",
          300: "#A78BFA",
          400: "#8F6BFF",
          500: "#7C4DFF",
          600: "#6D33F0",
          700: "#5B21B6",
          800: "#3F1583",
          900: "#26104F",
        },
        neon: {
          cyan: "#7C4DFF",
          violet: "#A78BFA",
          lime: "#7CE7B2",
          blue: "#5B8DEF",
          magenta: "#F472B6",
          amber: "#FBBF24",
          green: "#4ADE80",
        },
        signal: { green: "#4ADE80", yellow: "#FBBF24", blue: "#5B8DEF", gray: "#6C769B", red: "#FB7185" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: { tighter2: "-0.045em", tighter3: "-0.055em" },
      maxWidth: { container: "1240px" },
      borderRadius: { "4xl": "2rem" },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,77,255,0.22), 0 24px 70px -24px rgba(124,77,255,0.55)",
        "glow-violet": "0 0 0 1px rgba(167,139,250,0.22), 0 24px 70px -24px rgba(167,139,250,0.45)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 30px 70px -40px rgba(0,0,0,0.95)",
        "btn": "0 14px 40px -12px rgba(124,77,255,0.65), 0 1px 0 0 rgba(255,255,255,0.18) inset",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(18px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "soft-pulse": { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.4" } },
        "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "spin-slow": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        "border-spin": { "0%": { "--angle": "0deg" }, "100%": { "--angle": "360deg" } },
        "drift": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        "float-slow": { "0%,100%": { transform: "translateY(0) rotate(0deg)" }, "50%": { transform: "translateY(-14px) rotate(1.5deg)" } },
        "scan": { "0%": { transform: "translateY(-120%)" }, "100%": { transform: "translateY(120%)" } },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
        "marquee": "marquee 32s linear infinite",
        "marquee-rev": "marquee 38s linear infinite reverse",
        "spin-slow": "spin-slow 14s linear infinite",
        "drift": "drift 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
