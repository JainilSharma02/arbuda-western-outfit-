"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingBag, ArrowRight } from "lucide-react";
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
    id: 556,
    name: "2 piece",
    price: 1150.00,
    image: "/images/2 piece 1.jpeg",
    colors: ["#b58b66", "#fde8e9"],
    tag: "New Edit",
  },
  {
    id: 557,
    name: "2 piece",
    price: 1150.00,
    image: "/images/2 p 2.jpeg",
    colors: ["#1a1a1a", "#ffffff"],
    tag: "Exclusive",
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="relative">
            <span className="absolute -top-8 left-0 text-[6rem] font-serif font-black text-slate-900/[0.03] select-none pointer-events-none hidden md:block">
              Arbuda
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
              Trending <span className="italic text-[#b58b66]">Now</span>
            </h2>
            <div className="h-1 w-20 bg-[#b58b66] rounded-full mb-4"></div>
            <p className="text-slate-500 max-w-xl text-lg leading-relaxed">
              Elevate your wardrobe with our most loved pieces this season, curated for the modern woman.
            </p>
          </div>
          <Link href="/clothing" className="group flex items-center gap-3 bg-white border border-slate-200 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-500 shadow-sm">
            View All Collection
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              <Card className="group overflow-hidden rounded-[2rem] border border-transparent bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(181,139,102,0.15)] hover:border-[#b58b66]/30 will-change-transform">
                <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-slate-50 cursor-pointer">
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

                  {/* Buy Button Overlay - Responsive Premium Design */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                     <button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleBuy(product);
                      }}
                      className="w-full flex items-center justify-center bg-slate-900/90 backdrop-blur-xl text-white py-3 md:py-4 rounded-2xl hover:bg-[#b58b66] transition-all active:scale-95 shadow-2xl border border-white/10"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span className="text-[11px] md:text-sm font-bold uppercase tracking-widest">Buy Now</span>
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
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/clothing" className="inline-flex items-center justify-center w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-sm shadow-xl shadow-slate-900/20 active:scale-95 transition-all">
            Explore All Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
