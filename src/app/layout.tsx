import type { Metadata, Viewport } from "next";
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "@fontsource/sora/500.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/jetbrains-mono/100.css";
import "@fontsource/jetbrains-mono/200.css";
import "@fontsource/jetbrains-mono/300.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DigitalBackdrop } from "@/components/ui/background";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/content";

// Self-hosted font CSS variables. Previously we used next/font/google which made
// Vercel builds fragile (every deploy needed to reach fonts.googleapis.com).
// Now the fonts ship with the repo via @fontsource packages, so builds never
// depend on a third-party CDN at build time.
// (No JS-side variable needed — @fontsource ships pure CSS via the imports above.)

const url = "https://josephunaogu.com";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "Joseph Unaogu — Digital Builder in Motion", template: "%s · Joseph Unaogu" },
  description: "Joseph Unaogu is a digital builder exploring software, AI, automation, writing, and creative technology. He learns by building real things and turns ideas into useful digital experiences.",
  keywords: ["Joseph Unaogu", "Joseph Unaogu software developer", "Joseph Unaogu AI", "Joseph Unaogu automation", "Joseph Unaogu eBook writer", "Joseph Unaogu copywriter", "AI automation", "eBook writing", "website development", "digital products"],
  authors: [{ name: "Joseph Unaogu" }], creator: "Joseph Unaogu",
  openGraph: { type: "website", url, title: "Joseph Unaogu — Digital Builder in Motion", description: "A personal digital HQ: software, AI, automation, writing, and creative technology. Always learning. Always building.", siteName: "Joseph Unaogu" },
  twitter: { card: "summary_large_image", title: "Joseph Unaogu — Digital Builder in Motion", description: "Software, AI, automation, writing, and creative technology. Always learning. Always building." },
  robots: { index: true, follow: true },
};

import { ThemeProvider } from "@/components/theme-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050609",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-ink-950 font-sans text-paper antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <JsonLd />
          <DigitalBackdrop />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}