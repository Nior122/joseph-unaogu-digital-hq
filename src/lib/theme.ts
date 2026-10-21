// Color values live here once: CSS variables, browser chrome and social images reuse them.
const shared = { overlay: "8 18 12" };
export const colorTokens = {
  light: {
    ...shared, canvas: "247 249 245", surface: "255 255 255", soft: "237 242 233",
    text: "25 35 29", muted: "75 88 79", border: "123 138 126",
    accent: "37 88 55", "on-accent": "255 255 255", "accent-soft": "225 237 219", danger: "169 31 31",
  },
  dark: {
    ...shared, canvas: "12 18 15", surface: "20 29 23", soft: "28 39 31",
    text: "240 245 236", muted: "190 204 190", border: "113 133 116",
    accent: "184 218 159", "on-accent": "18 34 20", "accent-soft": "36 55 35", danger: "255 166 156",
  },
} as const;
export function themeColor(theme: keyof typeof colorTokens, token: keyof typeof colorTokens.light) {
  return `rgb(${colorTokens[theme][token].split(" ").join(", ")})`;
}
function rules(theme: keyof typeof colorTokens) {
  return `${Object.entries(colorTokens[theme]).map(([key, value]) => `--${key}-rgb:${value}`).join(";")};color-scheme:${theme};`;
}
export const themeTokenCss = `:root{${rules("light")}}@media(prefers-color-scheme:dark){:root:not([data-theme]){${rules("dark")}}}[data-theme="dark"]{${rules("dark")}}`;
