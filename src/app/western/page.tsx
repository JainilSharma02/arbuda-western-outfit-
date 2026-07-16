import WesternPageClient from "./WesternPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Western Outfits & Co-ord Sets | Arbuda Western Outfit",
  description: "Browse our elegant selection of stylish western wear for women, featuring premium high-waist jeans, designers tops, co-ords, and satin loungewear at Arbuda Western Outfit.",
  keywords: [
    "Western Wear Ahmedabad",
    "Ladies High Waist Jeans",
    "Stylish Crop Tops India",
    "Women's Night Wear Loungewear",
    "Boutique Western Outfits"
  ],
  alternates: {
    canonical: "/western",
  },
  openGraph: {
    title: "Western Outfits & Co-ord Sets | Arbuda Western Outfit",
    description: "Browse our elegant selection of stylish western wear for women, featuring premium high-waist jeans, designers tops, co-ords, and satin loungewear.",
    url: "https://arbuda-western-outfit.vercel.app/western",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=600&auto=format",
        alt: "Western Outfits Collection"
      }
    ]
  }
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Arbuda Western Collection",
    "url": "https://arbuda-western-outfit.vercel.app/western",
    "description": "Premium ladies western clothing including jeans, tops, t-shirts, night wears and lowers.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Jeans Collection",
          "url": "https://arbuda-western-outfit.vercel.app/category/jeans",
          "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Lowers Collection",
          "url": "https://arbuda-western-outfit.vercel.app/category/lower",
          "image": "https://images.unsplash.com/photo-1506629082955-520b69af7b0d?q=80&w=600&auto=format"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Product",
          "name": "Night Wear Collection",
          "url": "https://arbuda-western-outfit.vercel.app/category/night-wear",
          "image": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Product",
          "name": "T-Shirts Collection",
          "url": "https://arbuda-western-outfit.vercel.app/category/t-shirt",
          "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Product",
          "name": "Tops Colection",
          "url": "https://arbuda-western-outfit.vercel.app/category/top",
          "image": "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=600&auto=format"
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
        "name": "Western Wear",
        "item": "https://arbuda-western-outfit.vercel.app/western"
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
      <WesternPageClient />
    </>
  );
}
