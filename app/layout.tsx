import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BrandIntro } from "@/components/BrandIntro";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/data/site";
import { siteUrl } from "@/data/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "BitCode", template: "%s | BitCode" },
  description: siteConfig.description,
  keywords: [
    "coding classes",
    "coding classes for beginners",
    "coding classes for school students",
    "coding classes in India",
    "HTML CSS JavaScript classes",
    "Python coding classes",
    "logic building for coding",
    "project guidance for students",
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "BitCode",
    title: "BitCode",
    description: siteConfig.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "BitCode — Understand. Practise. Build.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BitCode",
    description: siteConfig.description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "192x192" }],
    apple: [
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06142d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <BrandIntro />
        <Header />
        <main id="main-content" className="page-transition">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
