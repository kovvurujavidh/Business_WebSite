import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "LocalBizz — Digital Solutions for Local Businesses", template: "%s — LocalBizz" },
  description: "I build professional websites and digital solutions for hotels, restaurants, function halls, and local businesses.",
  keywords: ["LocalBizz", "web developer", "website builder", "business websites", "landing pages", "digital solutions", "local business", "Javidh"],
  authors: [{ name: "Javidh" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LocalBizz",
    title: "LocalBizz — Digital Solutions for Local Businesses",
    description: "Professional websites and digital solutions for local businesses.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f1eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
