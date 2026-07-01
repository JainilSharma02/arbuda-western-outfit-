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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 [perspective:1200px]">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="group overflow-hidden rounded-xl border-none shadow-none bg-transparent transition-all duration-500">
                <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-muted mb-4 cursor-pointer">

                  {product.tag && (
                    <Badge className="absolute top-4 left-4 z-10 bg-white text-black hover:bg-white px-3 py-1 uppercase tracking-widest text-[10px]">
                      {product.tag}
                    </Badge>
                  )}
                  
                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <Button 
                      onClick={(e) => toggleWishlist(e, product)}
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full shadow-sm bg-white hover:bg-gray-100 text-black h-9 w-9"
                    >
                      <Heart className={`h-4 w-4 ${wishlistIds.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button 
                      onClick={(e) => e.preventDefault()}
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full shadow-sm bg-white hover:bg-gray-100 text-black h-9 w-9"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Buy Button Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        const message = `Hi, I want to purchase the ${product.name}.\n\nPrice: ₹${product.price}\n\nPlease confirm if this item is available.`;
                        window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="w-full flex items-center justify-center bg-white/95 backdrop-blur-sm text-slate-900 py-3 rounded-full hover:bg-[#b58b66] hover:text-white font-bold shadow-xl transition-all active:scale-95"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Buy
                    </button>
                  </div>

                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                  
                  {/* Overlay for better button visibility */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                
                <CardContent className="p-0">
                  <div className="flex gap-1 mb-2">
                    {product.colors.map(color => (
                      <span key={color} className="block h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <h3 className="font-medium text-lg leading-tight mb-1">
                    <Link href={`/product/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">₹{product.originalPrice.toFixed(2)}</span>
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
