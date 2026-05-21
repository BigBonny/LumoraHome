import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

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

export const metadata: Metadata = {
  icons: {
    icon: "/images/faviconn.png",
    shortcut: "/images/faviconn.png",
    apple: "/images/faviconn.png",
  },
  title: "LumoraHome | Transform Your Space Into a Vibe",
  description:
    "Premium ambient lighting for Gen Z & millennials. Galaxy projectors, LED mood lights, sunset lamps & more. Free shipping on orders over $50.",
  keywords: [
    "ambient lighting",
    "galaxy projector",
    "LED mood lights",
    "bedroom decor",
    "aesthetic lighting",
    "sunset lamp",
  ],
  openGraph: {
    title: "LumoraHome | Transform Your Space Into a Vibe",
    description:
      "Premium ambient lighting for your aesthetic bedroom setup. Shop galaxy projectors, LED mood lights & more.",
    type: "website",
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
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
