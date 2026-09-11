import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { FloatingBackground } from "@/components/three/FloatingBackground";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://localbizz.dpdns.org";
const SITE_NAME = "LocalBizz";
const SITE_DESC = "LocalBizz builds professional websites and digital solutions for hotels, restaurants, function halls, and local businesses. Founded by Javidh — clean design, fast performance, real results.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LocalBizz — Digital Solutions for Local Businesses",
    template: "%s — LocalBizz",
  },
  description: SITE_DESC,
  keywords: [
    "LocalBizz", "local business website", "business website developer",
    "website for hotels", "website for restaurants", "function hall website",
    "landing pages", "digital solutions", "web developer India",
    "Javidh", "freelance web developer", "small business website",
    "business website cost", "professional website builder",
  ],
  authors: [{ name: "Javidh", url: SITE_URL }],
  creator: "Javidh",
  publisher: "LocalBizz",
  formatDetection: { telephone: true, email: true, address: true },
  verification: {
    google: "l5IkZcZcaMM6_u-uIK41dWlOTRkz9pQVwUZ6om3Qdfw",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "LocalBizz — Digital Solutions for Local Businesses",
    description: SITE_DESC,
    images: [
      {
        url: `${SITE_URL}/og.svg`,
        width: 1200,
        height: 630,
        alt: "LocalBizz — Digital Solutions for Local Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalBizz — Digital Solutions for Local Businesses",
    description: SITE_DESC,
    images: [`${SITE_URL}/og.svg`],
    creator: "@kovvurujavidh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0b09" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "LocalBizz",
    description: SITE_DESC,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    author: {
      "@type": "Person",
      name: "Javidh",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: ["Website Development", "Landing Pages", "Digital Solutions", "Web Applications"],
    sameAs: [
      "https://github.com/kovvurujavidh",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "English",
    },
  };

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <ThemeProvider>
          <FloatingBackground />
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}