import ProductDetailPageClient from "./ProductDetailPageClient";
import type { Metadata } from "next";

interface Product {
  name: string;
  price: string;
  image: string;
  description: string;
  sizes: string[];
}

const getProductDetails = (prodId: string) => {
  const numId = parseInt(prodId);
  
  let item: Product = {
    name: `Premium Collection #${prodId}`,
    price: "₹1,499",
    image: `https://images.unsplash.com/photo-1550614000-4b95dd526563?q=80&w=800&auto=format`,
    description: "A signature piece from Arbuda Western, designed for effortless style and maximum comfort. Crafted from premium fabrics that feel like a second skin.",
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"]
  };

  const knownItems: Record<number, Product> = {
    1550: {
      name: "2 piece combo",
      price: "₹1,550",
      image: "/images/2 pp1.jpeg",
      description: "Get double the grace and elegance with this special value Pack of 2 designer dress items. Meticulously designed from luxury lightweight fabrics that offer an exquisitely premium look and flawless, all-day comfort. A truly unique and stylish combo choice.",
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"]
    },
    1552: {
      name: "2 piece combo 2",
      price: "₹1,550",
      image: "/images/2 pps1.jpeg",
      description: "Step out in absolute style with our second exclusive Pack of 2 designer dresses. This gorgeous combo set pairs two premium, highly appealing outfits crafted from premium lightweight fabric to deliver top-tier fashion, supreme breathability, and an ultra-feminine silhouette. Perfect for making a statement.",
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"]
    },
    5: { 
      name: "3 piece", 
      price: "₹1,200", 
      image: "/images/d1.jpeg", 
      description: "Elegant beige silk anarkali with intricate embroidery and floral details. Perfectly paired with matching palazzo pants for a timeless traditional look.", 
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"] 
    },
    777: { 
      name: "peacock patten", 
      price: "₹1,100", 
      image: "/images/3 piece.jpeg", 
      description: "An exquisite 3-piece traditional set featuring a stunning peacock-inspired pattern. This ensemble includes a beautifully detailed kurta, comfortable trousers, and a matching dupatta.", 
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"] 
    },
    555: { 
      name: "2 piece", 
      price: "₹1,150", 
      image: "/images/2 piece .jpeg", 
      description: "A premium 2-piece traditional ensemble that perfectly balances cultural heritage with contemporary elegance. Crafted from high-grade silk-blend fabric.", 
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"] 
    },
    888: {
      name: "short kurti",
      price: "₹550",
      image: "/images/c 1.jpeg",
      description: "A stylish and comfortable short kurti perfect for casual wear or festive occasions. Crafted from premium breathable fabric with elegant prints.",
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"]
    },
    900: { 
      name: "cort set with pocket", 
      price: "₹1,050", 
      image: "/images/cort set 1.jpeg", 
      description: "Premium Cort Set featuring a stylish side pocket design. Crafted with high-quality fabric for a luxurious feel and elegant silhouette.", 
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"] 
    }
  };

  if (knownItems[numId]) item = { ...item, ...knownItems[numId] };
  return item;
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const product = getProductDetails(id);
  const title = `${product.name.replace(/\b\w/g, l => l.toUpperCase())} | Arbuda Western Outfit`;

  return {
    title,
    description: product.description,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      title,
      description: product.description,
      url: `https://arbuda-western-outfit.vercel.app/product/${id}`,
      type: "article",
      images: [
        {
          url: product.image.startsWith('/') ? `https://arbuda-western-outfit.vercel.app${product.image}` : product.image,
          alt: product.name,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: [product.image.startsWith('/') ? `https://arbuda-western-outfit.vercel.app${product.image}` : product.image],
    }
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const product = getProductDetails(id);
  const numericPrice = parseFloat(product.price.replace(/[^\d]/g, ''));
  const schemaImageUrl = product.image.startsWith('/') ? `https://arbuda-western-outfit.vercel.app${product.image}` : product.image;

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [schemaImageUrl],
    "description": product.description,
    "sku": `ARBUDA-${id}`,
    "mpn": `ARBUDA-${id}`,
    "brand": {
      "@type": "Brand",
      "name": "Arbuda Western Outfit"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://arbuda-western-outfit.vercel.app/product/${id}`,
      "priceCurrency": "INR",
      "price": numericPrice,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Arbuda Western Outfit"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailPageClient params={params} />
    </>
  );
}
