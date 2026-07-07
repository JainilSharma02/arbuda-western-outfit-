"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

const westernData = [
  {
    id: 900,
    name: "Sleek Black Cortset",
    type: "Cortset",
    price: "₹1,250",
    image: "/images/cort set 5.jpeg",
    colors: ["#000", "#333"],
  },
  {
    id: 901,
    name: "Classic Beige Cortset",
    type: "Cortset",
    price: "₹1,250",
    image: "/images/cort set 4.jpeg",
    colors: ["#d2b48c", "#fff"],
  },
  {
    id: 902,
    name: "Floral Print Cortset",
    type: "Cortset",
    price: "₹1,350",
    image: "/images/cort set 3.jpeg",
    colors: ["#f43f5e", "#fff"],
  },
  {
    id: 903,
    name: "Designer Western 2-Piece",
    type: "Western Set",
    price: "₹1,450",
    image: "/images/2 1.jpeg",
    colors: ["#b58b66", "#000"],
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
              <Link href={`/product/${item.id}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4 block cursor-pointer no-tap-highlight group">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-500 will-change-transform ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className={`absolute bottom-2 sm:bottom-4 left-0 right-0 px-2 sm:px-4 flex gap-1.5 sm:gap-2 transition-all duration-300 translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0`}>
                   <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuy(item);
                    }}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-2 sm:px-4 text-[12px] sm:text-base font-bold rounded-full shadow-lg transition-all active:scale-95 bg-white/95 text-slate-900 border border-slate-100 hover:bg-[#b58b66] hover:text-white`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> <span className="inline min-[380px]:inline">Buy Now</span>
                  </button>

                  <button 
                    onClick={(e) => toggleWishlist(e, item)}
                    className={`flex items-center justify-center p-2 sm:p-2.5 px-2.5 sm:px-4 rounded-full shadow-lg transition-all active:scale-90 ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/95 text-slate-500 hover:bg-pink-50 hover:text-pink-500'}`}
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" fill={isLiked ? "currentColor" : "none"} />
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
