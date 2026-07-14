import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundAnimation from "@/components/common/BackgroundAnimation";
import SocialPopups from "@/components/common/SocialPopups";

import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Arbuda Western Outfit | Luxury Women's Clothing & Traditional Wear",
    template: "%s | Arbuda Western Outfit"
  },
  description: "Premium women's fashion eCommerce boutique. Discover elegant western outfits, 3-piece sets, 2-piece traditional sets, designer Kurtis, and coords with direct WhatsApp support.",
  keywords: [
    "Arbuda Western Outfit",
    "Arbuda Western",
    "Luxury Women's Clothing",
    "Designer Kurtis",
    "3 Piece Suits Online",
    "2 Piece Traditional Set",
    "Co-ord Sets India",
    "Western Wear Ahmedabad",
    "Women Outfits WhatsApp Shopping",
    "Premium Indian Boutique"
  ],
  metadataBase: new URL("https://arbuda-western-outfit.vercel.app"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Arbuda Western Outfit" }],
  creator: "Arbuda Western Outfit",
  publisher: "Arbuda Western Outfit",
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
  openGraph: {
    title: "Arbuda Western Outfit | Luxury Women's Clothing & Traditional Wear",
    description: "Premium women's fashion eCommerce boutique. Discover elegant western outfits, 3-piece sets, 2-piece traditional sets, designer Kurtis, and coords with direct WhatsApp support.",
    url: "https://arbuda-western-outfit.vercel.app",
    siteName: "Arbuda Western Outfit",
    images: [
      {
        url: "/images/hero_ai.png",
        width: 1200,
        height: 630,
        alt: "Arbuda Western Outfit Collection"
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbuda Western Outfit | Luxury Women's Clothing",
    description: "Premium women's fashion eCommerce boutique. Discover elegant western outfits, 3-piece sets, and coords.",
    images: ["/images/hero_ai.png"],
  },
  verification: {
    google: "yQ2lMvq7Qnvy_z6h-r_G91f09gU5W5gI1_A9V2lMv90",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "Arbuda Western Outfit",
    "alternateName": "Arbuda Western",
    "url": "https://arbuda-western-outfit.vercel.app",
    "logo": "https://arbuda-western-outfit.vercel.app/images/hero_ai.png",
    "image": "https://arbuda-western-outfit.vercel.app/images/hero_ai.png",
    "description": "Premium ladies clothing and western outfit boutique. Explore high-quality women's coordinates sets, 3-pieces, Kurtis, jeans, and nightwear with WhatsApp checkout.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-94276-73886",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Gujarati"]
    },
    "sameAs": [
      "https://www.instagram.com/arbuda_western_outfit_end_dres",
      "https://wa.me/919427673886"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-background text-foreground flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BackgroundAnimation />
        <SocialPopups />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

