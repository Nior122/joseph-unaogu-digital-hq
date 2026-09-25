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
        neon: {
          cyan: "#3df0ff",
          violet: "#a974ff",
          lime: "#b6ff3d",
          blue: "#4d8bff",
          magenta: "#ff4dcb",
          amber: "#ffb13d",
          green: "#46e6a0",
        },
        signal: { green: "#46e6a0", yellow: "#ffd23d", blue: "#4d8bff", gray: "#69728a", red: "#ff5d6c" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: { tighter2: "-0.045em" },
      maxWidth: { container: "1200px" },
      boxShadow: {
        glow: "0 0 0 1px rgba(61,240,255,0.18), 0 18px 60px -18px rgba(61,240,255,0.25)",
        "glow-violet": "0 0 0 1px rgba(169,116,255,0.20), 0 18px 60px -18px rgba(169,116,255,0.30)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 24px 60px -28px rgba(0,0,0,0.9)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(18px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "soft-pulse": { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.4" } },
        "marquee": { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "spin-slow": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        "border-spin": { "0%": { "--angle": "0deg" }, "100%": { "--angle": "360deg" } },
        "drift": { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "scan": { "0%": { transform: "translateY(-120%)" }, "100%": { transform: "translateY(120%)" } },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
        "marquee": "marquee 32s linear infinite",
        "marquee-rev": "marquee 38s linear infinite reverse",
        "spin-slow": "spin-slow 14s linear infinite",
        "drift": "drift 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;