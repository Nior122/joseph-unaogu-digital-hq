import type { Config } from "tailwindcss";

const accent = "rgb(var(--accent-rgb) / <alpha-value>)";
const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: Object.fromEntries(
          [950, 900, 850, 800, 700, 600].map((value) => [
            value,
            `rgb(var(--ink-${value}) / <alpha-value>)`,
          ]),
        ),
        paper: {
          DEFAULT: "rgb(var(--text-rgb) / <alpha-value>)",
          muted: "rgb(var(--muted-rgb) / <alpha-value>)",
          dim: "rgb(var(--muted-rgb) / <alpha-value>)",
        },
        accent,
        neon: {
          cyan: accent,
          violet: accent,
          lime: accent,
          blue: accent,
          magenta: accent,
          amber: accent,
          green: accent,
        },
        signal: {
          green: accent,
          yellow: accent,
          blue: accent,
          gray: "rgb(var(--muted-rgb) / <alpha-value>)",
          red: "rgb(var(--danger-rgb) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      letterSpacing: { tighter2: "-0.045em" },
      maxWidth: { container: "var(--page-width)" },
      boxShadow: {
        glow: "0 0 0 1px var(--accent)",
        "glow-violet": "0 0 0 1px var(--accent)",
        card: "none",
      },
    },
  },
  plugins: [],
};
export default config;
