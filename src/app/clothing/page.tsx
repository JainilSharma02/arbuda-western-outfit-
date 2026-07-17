import ClothingPageClient from "./ClothingPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Luxury Clothing Collection | Arbuda Western Outfit",
  description: "Explore Arbuda Western's complete catalog. Shop the finest premium women clothing sets: 2-piece / 3-piece traditional wear, peacock patterns, designer short kurtis, and cort sets with pockets.",
  keywords: [
    "Premium Women Clothing",
    "Luxury Traditional Wear Set",
    "Designer Cort Set",
    "Short Kurti Online India",
    "Ladies Fashion Boutique Ahmedabad"
  ],
  alternates: {
    canonical: "/clothing",
  },
  openGraph: {
    title: "Premium Luxury Clothing Collection | Arbuda Western Outfit",
    description: "Explore Arbuda Western's complete ladies wear boutique: 2-piece / 3-piece traditional wear ensembles, designer kurtis, and chic custom coords.",
    url: "https://arbuda-western-outfit.vercel.app/clothing",
    type: "website",
    images: [
      {
        url: "/images/2 pp1.jpeg",
        alt: "Premium Designer Clothes Combo"
      }
    ]
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Arbuda Clothing Boutique Collection",
    "url": "https://arbuda-western-outfit.vercel.app/clothing",
    "description": "Premium ladies coordinates sets, 3-pieces, Kurtis, and traditional wear.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 6",
          "url": "https://arbuda-western-outfit.vercel.app/product/1556",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 pppsssp1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 5",
          "url": "https://arbuda-western-outfit.vercel.app/product/1555",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 pppsss1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 4",
          "url": "https://arbuda-western-outfit.vercel.app/product/1554",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 ppssp1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo",
          "url": "https://arbuda-western-outfit.vercel.app/product/1550",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 pp1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 2",
          "url": "https://arbuda-western-outfit.vercel.app/product/1552",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 pps1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Product",
          "name": "2 Piece Combo 3",
          "url": "https://arbuda-western-outfit.vercel.app/product/1553",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 ppss1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "Product",
          "name": "3 piece Traditional Suit",
          "url": "https://arbuda-western-outfit.vercel.app/product/5",
          "image": "https://arbuda-western-outfit.vercel.app/images/d1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "Product",
          "name": "Peacock Pattern Suit",
          "url": "https://arbuda-western-outfit.vercel.app/product/777",
          "image": "https://arbuda-western-outfit.vercel.app/images/3 piece.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "Product",
          "name": "2 piece Anarkali",
          "url": "https://arbuda-western-outfit.vercel.app/product/555",
          "image": "https://arbuda-western-outfit.vercel.app/images/2 piece .jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 10,
        "item": {
          "@type": "Product",
          "name": "Short Kurti",
          "url": "https://arbuda-western-outfit.vercel.app/product/888",
          "image": "https://arbuda-western-outfit.vercel.app/images/c 1.jpeg"
        }
      },
      {
        "@type": "ListItem",
        "position": 11,
        "item": {
          "@type": "Product",
          "name": "Cort set with pocket",
          "url": "https://arbuda-western-outfit.vercel.app/product/900",
          "image": "https://arbuda-western-outfit.vercel.app/images/cort set 1.jpeg"
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
        "name": "Clothing",
        "item": "https://arbuda-western-outfit.vercel.app/clothing"
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
      <ClothingPageClient />
    </>
  );
}
