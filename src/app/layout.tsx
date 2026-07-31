import type { Metadata, Viewport } from "next";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DigitalBackdrop } from "@/components/ui/background";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/content";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050609",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-ink-950 font-sans text-paper antialiased">
        <JsonLd />
        <DigitalBackdrop />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}