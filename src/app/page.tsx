import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Arbuda Western Outfit | Premium Women's Western & Traditional Wear Store",
  description: "Explore Arbuda Western Outfit for premium ladies wear in Ahmedabad, India. Buy coordinates sets, 2-piece / 3-piece traditional wear, designer kurtis, jeans, and fashion tops with direct WhatsApp checkout and quick shipping.",
  keywords: [
    "Arbuda Western Outfit",
    "Arbuda Western",
    "Arbuda Clothing Ahmedabad",
    "Luxury Women's Clothes",
    "2 Piece Combo Online Shop",
    "Traditional wear anarkali dupatta",
    "Co-ord Sets India WhatsApp order",
    "Ahmdabad fashion boutique"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arbuda Western Outfit | Premium Ladies Fashion Store",
    description: "Discover exclusive premium women's clothing, coordinated suites, 2-piece traditional sets, and chic western wear at Arbuda Western Outfit.",
    url: "https://arbuda-western-outfit.vercel.app",
    siteName: "Arbuda Western Outfit",
    images: [
      {
        url: "/images/hero_ai.png",
        width: 1200,
        height: 630,
        alt: "Arbuda Western Outfit Premium Collection"
      }
    ],
    locale: "en_IN",
    type: "website",
  }
};

export default function Home() {
  const storeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Arbuda Western Outfit",
    "description": "Explore Arbuda Western Outfit for premium ladies wear in Ahmedabad, India. Find high-quality 2-piece combo, co-ords, traditional anarkali suits, designer kurtis, jeans, and winter apparel.",
    "url": "https://arbuda-western-outfit.vercel.app",
    "logo": "https://arbuda-western-outfit.vercel.app/images/hero_ai.png",
    "image": [
      "https://arbuda-western-outfit.vercel.app/images/hero_ai.png",
      "https://arbuda-western-outfit.vercel.app/images/2 pp1.jpeg",
      "https://arbuda-western-outfit.vercel.app/images/d1.jpeg",
      "https://arbuda-western-outfit.vercel.app/images/3 piece.jpeg"
    ],
    "telephone": "+919427673886",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ahmedabad",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380001",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/arbuda_western_outfit_end_dres",
      "https://wa.me/919427673886"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
      />
      <Hero />
      <FeaturedProducts />
    </>
  );
}
