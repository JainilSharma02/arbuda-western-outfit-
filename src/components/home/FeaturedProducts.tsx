"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";


const products = [
  {
    id: 888,
    name: "Designer Short Kurti",
    price: 550.00,
    image: "/images/c 1.jpeg",
    colors: ["#6366f1", "#f43f5e"],
    tag: "Bestseller",
  },
  {
    id: 777,
    name: "Peacock Pattern 3-Piece Set",
    price: 1100.00,
    image: "/images/3 piece.jpeg",
    colors: ["#1e3a8a", "#0d9488"],
    tag: "Luxury",
  },
  {
    id: 555,
    name: "2 piece Traditional Set",
    price: 1100.00,
    image: "/images/2 piece .jpeg",
    colors: ["#b58b66", "#ffffff"],
    tag: "Trending",
  },
  {
    id: 1,
    name: "Indo-Western Silk Gown",
    price: 3499.00,
    originalPrice: 5200.00,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
    colors: ["#800020", "#000"],
    tag: "Sale",
  },
  {
    id: 2,
    name: "Embroidered Crop Top & Palazzo",
    price: 2899.00,
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac662?q=80&w=1974&auto=format&fit=crop",
    colors: ["#FFD700", "#FF4500"],
    tag: "New",
  },
  {
    id: 3,
    name: "Floral Block Print Maxi",
    price: 1999.00,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1946&auto=format&fit=crop",
    colors: ["#a1c181", "#ffffff"],
  },
  {
    id: 4,
    name: "Chikankari Fusion Co-ord Set",
    price: 2450.00,
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop",
    colors: ["#fff", "#f5f5dc"],
  }
];

export default function FeaturedProducts() {
   const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  useEffect(() => {
    const loadWishlist = () => {
      const stored = localStorage.getItem('wishlist');
      if (stored) {
        const items = JSON.parse(stored);
        setWishlistIds(items.map((i: any) => i.id));
      }
    };
    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    const stored = localStorage.getItem('wishlist');
    let items = stored ? JSON.parse(stored) : [];
    
    if (items.some((i: any) => i.id === product.id)) {
      items = items.filter((i: any) => i.id !== product.id);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        image: product.image
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(items));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleBuy = (product: any) => {
    const message = `Hello Arbuda Western! \n\nI want to buy this:\nProduct : ${product.name}\nPrice : ₹${product.price}\n\nPlease help me with the order! `;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Trending Now</h2>
            <p className="text-muted-foreground max-w-xl">
              Elevate your wardrobe with our most loved pieces this season.
            </p>
          </div>
          <Link href="/shop" className="hidden border-b border-foreground md:inline-flex pb-1 font-medium hover:text-muted-foreground hover:border-muted-foreground transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 gpu">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              className="gpu"
            >
              <Card className="group overflow-hidden rounded-2xl border-none shadow-none bg-white transition-all duration-500 hover:shadow-xl will-change-transform">
                <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-muted cursor-pointer">
                  {/* Actions overlay */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      onClick={(e) => toggleWishlist(e, product)}
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white text-black h-8 w-8 md:h-10 md:w-10"
                    >
                      <Heart className={`h-4 w-4 md:h-5 md:w-5 ${wishlistIds.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                  </div>

                  {/* Buy Button Overlay - Responsive */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
                     <button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleBuy(product);
                      }}
                      className="w-full flex items-center justify-center bg-white/95 backdrop-blur-xl text-slate-900 py-2.5 md:py-3.5 rounded-xl hover:bg-[#b58b66] hover:text-white text-xs md:text-sm font-bold shadow-xl transition-all active:scale-95"
                    >
                      <ShoppingBag className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                      Buy Now
                    </button>
                  </div>

                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    {product.image.startsWith('/') ? (
                      <Image 
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        unoptimized
                      />
                    ) : (
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${product.image})` }}
                      />
                    )}
                  </div>
                  
                  {/* Subtle Gradient Shadow for text readability on mobile */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Link>
                
                <CardContent className="p-3 md:p-5">
                  <div className="flex gap-1.5 mb-2">
                    {product.colors.map(color => (
                      <span key={color} className="block h-2.5 w-2.5 md:h-3 md:w-3 rounded-full border border-black/5" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <h3 className="font-bold text-sm md:text-lg leading-tight mb-1 line-clamp-1">
                    <Link href={`/product/${product.id}`} className="hover:text-[#b58b66] transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#b58b66] text-sm md:text-base">₹{product.price.toFixed(2)}</span>
                    {product.tag && (
                      <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {product.tag}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Button variant="outline" className="rounded-full w-full max-w-sm">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
