import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const BASE_URL = "https://www.stellux.store";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/images/faviconn.png",
    shortcut: "/images/faviconn.png",
    apple: "/images/faviconn.png",
  },
  title: {
    default: "Stellux | Transform Your Space Into a Vibe",
    template: "%s | Stellux",
  },
  description:
    "Premium ambient lighting for Gen Z & millennials. Galaxy projectors, LED mood lights, sunset lamps & more. Free shipping on orders over $50.",
  keywords: [
    "ambient lighting",
    "galaxy projector",
    "LED mood lights",
    "bedroom lighting",
    "aesthetic lighting",
    "sunset lamp",
    "room decor",
    "mood lighting",
    "Stellux",
    "home decor",
  ],
  authors: [{ name: "Stellux" }],
  creator: "Stellux",
  publisher: "Stellux",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Stellux | Transform Your Space Into a Vibe",
    description:
      "Premium ambient lighting for your aesthetic bedroom setup. Shop galaxy projectors, LED mood lights & more.",
    url: BASE_URL,
    siteName: "Stellux",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/Hero.png",
        width: 1200,
        height: 630,
        alt: "Stellux — Premium Ambient Lighting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stellux | Transform Your Space Into a Vibe",
    description:
      "Premium ambient lighting for your aesthetic bedroom setup.",
    images: ["/images/Hero.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#0a0a1a] text-white">
        <OrganizationJsonLd url="https://www.stellux.store" />
        <WebsiteJsonLd url="https://www.stellux.store" />
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
