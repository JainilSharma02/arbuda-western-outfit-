"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

const westernData = [
  {
    id: 101,
    name: "Premium Slim-Fit Jeans",
    type: "Jeans",
    price: "₹1,899",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format",
    colors: ["#2B3E50", "#000"],
  },
  {
    id: 102,
    name: "Cotton Relaxed Lower",
    type: "Lower",
    price: "₹999",
    image: "https://images.unsplash.com/photo-1594633312681-42037199c15a?q=80&w=600&auto=format",
    colors: ["#666", "#000"],
  },
  {
    id: 103,
    name: "Luxury Silk Night Wear",
    type: "Night Wear",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format",
    colors: ["#f5f5dc", "#800020"],
  },
  {
    id: 104,
    name: "Vintage Style Cortset",
    type: "Cortset",
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format",
    colors: ["#fff", "#000"],
  },
  {
    id: 105,
    name: "Designer Summer Top",
    type: "Top",
    price: "₹799",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=600&auto=format",
    colors: ["#FF69B4", "#fff"],
  }
];

export default function WesternPage() {
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

  const toggleWishlist = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    const stored = localStorage.getItem('wishlist');
    let items = stored ? JSON.parse(stored) : [];
    if (items.some((i: any) => i.id === item.id)) {
      items = items.filter((i: any) => i.id !== item.id);
    } else {
      items.push({
        id: item.id,
        name: item.name,
        price: parseInt(item.price.replace(/[^\d]/g, '')),
        image: item.image
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(items));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleBuy = (item: any) => {
    const message = `Hello Arbuda Western! \n\nI want to buy this Western item:\nProduct : ${item.name}\nPrice : ${item.price}\n\nPlease help me with the order! `;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pt-24 min-h-screen">
      <div className="mb-12 border-b border-slate-200 pb-8 text-center max-w-3xl mx-auto">
        <div className="inline-block bg-[#b58b66]/10 text-[#b58b66] px-4 py-1.5 rounded-full font-bold text-xs tracking-[0.2em] uppercase mb-4">
          Western Vibes
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-[#b58b66]">
          Western Collection
        </h1>
        <p className="text-slate-600 text-lg">
          Explore our trendsetting western wear, from chic tops to premium denim and cozy nightwear.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-8 gap-y-8 sm:gap-y-12">
        {westernData.map((item) => {
          const isLiked = wishlistIds.includes(item.id);
          
          return (
            <div key={item.id} className="group flex flex-col">
              <Link href={`/product/${item.id}`} className="relative aspect-[3/5] overflow-hidden rounded-[2rem] bg-slate-100 mb-4 block cursor-pointer border border-transparent hover:border-[#b58b66]/30 transition-all shadow-sm hover:shadow-xl">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuy(item);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900/90 backdrop-blur-xl text-white rounded-2xl hover:bg-[#b58b66] transition-all shadow-2xl font-bold text-xs uppercase tracking-widest"
                  >
                    <ShoppingBag className="w-4 h-4" /> Buy Now
                  </button>
                </div>

                <div className="absolute top-4 right-4 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button 
                    onClick={(e) => toggleWishlist(e, item)}
                    className={`p-3 rounded-full shadow-lg transition-all ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-500 hover:bg-white'}`}
                  >
                    <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>
              </Link>

              <div className="flex flex-col flex-grow px-2">
                <div className="flex justify-between items-start mb-1">
                  <Link href={`/product/${item.id}`} className="text-base sm:text-lg font-bold text-slate-800 hover:text-[#b58b66] transition-colors line-clamp-1 cursor-pointer">
                    {item.name}
                  </Link>
                </div>
                <div className="text-[11px] sm:text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">{item.type}</div>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-base sm:text-lg font-bold text-[#b58b66]">{item.price}</span>
                  
                  <div className="flex gap-1.5">
                    {item.colors.map((color, idx) => (
                      <span 
                        key={idx} 
                        className="w-3.5 h-3.5 rounded-full border border-black/5 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
