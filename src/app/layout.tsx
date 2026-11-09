import type { Metadata, Viewport } from "next";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { DigitalBackdrop } from "@/components/ui/background";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/content";

const url = "https://josephunaogu.com";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: "Joseph Unaogu — AI & Digital Solutions Partner",
    template: "%s · Joseph Unaogu",
  },
  description:
    "Joseph Unaogu helps businesses, creators, and organisations use AI, automation, and modern web technology to work smarter, save time, and grow faster.",
  keywords: [
    "Joseph Unaogu",
    "AI developer Nigeria",
    "AI automation",
    "workflow automation",
    "website development",
    "Next.js developer",
    "eBook writer",
    "copywriter",
    "digital solutions partner",
  ],
  authors: [{ name: "Joseph Unaogu" }],
  creator: "Joseph Unaogu",
  openGraph: {
    type: "website",
    url,
    title: "Joseph Unaogu — AI & Digital Solutions Partner",
    description:
      "AI, automation, and modern web experiences that help businesses work smarter and grow faster.",
    siteName: "Joseph Unaogu",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Unaogu — AI & Digital Solutions Partner",
    description:
      "AI, automation, and modern web experiences that help businesses work smarter and grow faster.",
  },
  robots: { index: true, follow: true },
};

import { ThemeProvider } from "@/components/theme-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040614",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <body className="min-h-screen bg-ink-950 font-sans text-paper antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
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
