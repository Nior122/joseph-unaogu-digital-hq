import type { Metadata, Viewport } from "next";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/sora/latin-500.css";
import "@fontsource/sora/latin-600.css";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { routeMetadata, siteUrl } from "@/lib/seo";
import { site } from "@/lib/content";
import { themeColor, themeTokenCss } from "@/lib/theme";

export const metadata: Metadata = {
  ...routeMetadata("home"),
  metadataBase: new URL(siteUrl),
  authors: [{ name: site.name }],
  creator: site.name,
  applicationName: site.brand,
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: themeColor("light", "canvas"),
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: themeColor("dark", "canvas"),
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          id="theme-tokens"
          dangerouslySetInnerHTML={{ __html: themeTokenCss }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          themes={["light", "dark"]}
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <JsonLd />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
