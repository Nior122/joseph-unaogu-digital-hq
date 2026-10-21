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

export const metadata: Metadata = {
  title: { default: "Chenar | Websites, AI Automation & Writing", template: "%s | Chenar" },
  description: "Joseph Unaogu builds websites and automation tools and writes eBooks and copy for businesses. See projects and get in touch.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f9f5" }, { media: "(prefers-color-scheme: dark)", color: "#0c120f" }],
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem themes={["light", "dark"]} disableTransitionOnChange>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
