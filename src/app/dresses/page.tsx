import DressesPageClient from "./DressesPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Women's Dresses & Traditional Wear | Arbuda Western Outfit",
  description: "Browse Arbuda Western's premium dresses collection: 2-piece / 3-piece traditional wear, peacock patterns, and silk anarkalis with direct WhatsApp ordering in India.",
  keywords: [
    "Dresses Online India",
    "2 Piece Combo Dress",
    "3 Piece Anarkali Suit",
    "Traditional Wear Ahmedabad",
    "Boutique Traditional Dresses"
  ],
  alternates: {
    canonical: "/dresses",
  },
  openGraph: {
    title: "Premium Women's Dresses & Traditional Wear | Arbuda Western Outfit",
    description: "Browse Arbuda Western's premium dresses collection: 2-piece / 3-piece traditional wear, silk anarkalis, and peacock pattern ensembles.",
    url: "https://arbuda-western-outfit.vercel.app/dresses",
    type: "website",
    images: [
      {
        url: "/images/2 pp1.jpeg",
        alt: "Premium 2 piece clothing combo"
      }
    ]
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Arbuda Dresses Collection",
    "url": "https://arbuda-western-outfit.vercel.app/dresses",
    "description": "Explore our highly rated premium dresses, traditional wear, and 2-piece combos.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 5",
          "url": "https://arbuda-western-outfit.vercel.app/product/1555",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 pppsss1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 4",
          "url": "https://arbuda-western-outfit.vercel.app/product/1554",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 ppssp1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo",
          "url": "https://arbuda-western-outfit.vercel.app/product/1550",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 pp1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 2",
          "url": "https://arbuda-western-outfit.vercel.app/product/1552",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 pps1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 3",
          "url": "https://arbuda-western-outfit.vercel.app/product/1553",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 ppss1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Product",
          "name": "3 piece Traditional Suit",
          "url": "https://arbuda-western-outfit.vercel.app/product/5",
          "image": "https://arbuda-western-outfit.vercel.app/images/d1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "Product",
          "name": "Peacock Pattern Suit",
          "url": "https://arbuda-western-outfit.vercel.app/product/777",
          "image": "https://arbuda-western-outfit.vercel.app/images/3 piece.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "Product",
          "name": "2 piece Anarkali",
          "url": "https://arbuda-western-outfit.vercel.app/product/555",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 piece .jpeg"
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://arbuda-western-outfit.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Dresses",
        "item": "https://arbuda-western-outfit.vercel.app/dresses"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DressesPageClient />
    </>
  );
}
