import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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
  ],
  authors: [{ name: "Javidh", url: SITE_URL }],
  creator: "Javidh",
  publisher: "LocalBizz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "LocalBizz — Digital Solutions for Local Businesses",
    description: SITE_DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalBizz — Digital Solutions for Local Businesses",
    description: SITE_DESC,
    creator: "@kovvurujavidh",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "LocalBizz",
              description: SITE_DESC,
              url: SITE_URL,
              author: { "@type": "Person", name: "Javidh" },
              areaServed: { "@type": "Country", name: "India" },
              serviceType: ["Website Development", "Landing Pages", "Digital Solutions"],
              sameAs: ["https://github.com/kovvurujavidh"],
            }),
          }}
        />
      </head>
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
