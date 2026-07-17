"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const dressesData = [
  {
    id: 1555,
    name: "2 piece combo 5",
    price: "₹1,550",
    image: "/images/2 pppsss1.jpeg",
    colors: ["#cdaa7d", "#1e3020"],
    type: "Premium Traditional"
  },
  {
    id: 1554,
    name: "2 piece combo 4",
    price: "₹1,550",
    image: "/images/2 ppssp1.jpeg",
    colors: ["#cdaa7d", "#1e3020"],
    type: "Premium Traditional"
  },
  {
    id: 1550,
    name: "2 piece combo",
    price: "₹1,550",
    image: "/images/2 pp1.jpeg",
    colors: ["#cdaa7d", "#1e3020"],
    type: "Premium Traditional"
  },
  {
    id: 1552,
    name: "2 piece combo 2",
    price: "₹1,550",
    image: "/images/2 pps1.jpeg",
    colors: ["#cdaa7d", "#1e3020"],
    type: "Premium Traditional"
  },
  {
    id: 1553,
    name: "2 piece combo 3",
    price: "₹1,550",
    image: "/images/2 ppss1.jpeg",
    colors: ["#cdaa7d", "#1e3020"],
    type: "Premium Traditional"
  },
  {
    id: 5,
    name: "3 piece",
    price: "₹1,200",
    image: "/images/d1.jpeg",
    colors: ["#ecd8c3", "#800808"],
    type: "Premium Traditional"
  },
  {
    id: 777,
    name: "peacock patten",
    price: "₹1,100",
    image: "/images/3 piece.jpeg",
    colors: ["#ede2d5", "#cfb696"],
    type: "Premium Traditional"
  },
  {
    id: 555,
    name: "2 piece",
    price: "₹1,150",
    image: "/images/2 piece .jpeg",
    colors: ["#6b9432", "#dedcdb"],
    type: "Premium Traditional"
  }
];

export default function DressesPageClient() {
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const loadWishlist = () => {
      const stored = localStorage.getItem('wishlist');
      if (stored) {
        const items = JSON.parse(stored);
        setWishlistIds(items.map((i: any) => i.id));
      }
    };
    loadWishlist();
    setMounted(true);
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  const toggleWishlist = (e: React.MouseEvent, dress: any) => {
    e.preventDefault();
    const stored = localStorage.getItem('wishlist');
    let items = stored ? JSON.parse(stored) : [];
    if (items.some((i: any) => i.id === dress.id)) {
      items = items.filter((i: any) => i.id !== dress.id);
    } else {
      items.push({
        id: dress.id,
        name: dress.name,
        price: parseInt(dress.price.replace(/[^\d]/g, '')),
        image: dress.image,
        colors: dress.colors
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(items));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleBuy = (dress: any) => {
    const message = `Hello Arbuda Western! ✨\n\nI want to buy this:\n\nProduct : ${dress.name}\nPrice : ${dress.price}\nSize : M\n\nPlease help me with the order!`;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pt-24 min-h-screen">
      <div className="mb-12 border-b border-slate-200 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-[#b58b66]">
          Women's Dresses
        </h1>
        <p className="text-slate-600 text-lg">
          Discover our curated collection of timeless styles, from elegant evening gowns to effortless everyday women's dresses.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-8 gap-y-8 sm:gap-y-12">
        {dressesData.map((dress) => {
          const isLiked = wishlistIds.includes(dress.id);

          return (
            <div key={dress.id} className="group flex flex-col">
              <Link href={`/product/${dress.id}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4 block cursor-pointer no-tap-highlight">
                <Image
                  src={dress.image}
                  alt={dress.name}
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-500 will-change-transform ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {(dress.id === 1550 || dress.id === 1552 || dress.id === 1553 || dress.id === 1554 || dress.id === 1555) && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg border border-white/20 select-none">
                    2 Items @ ₹1550 Deal 🔥
                  </div>
                )}

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className={`absolute bottom-2 sm:bottom-4 left-0 right-0 px-2 sm:px-4 flex gap-1.5 sm:gap-2 transition-all duration-300 translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0`}>
                  <motion.button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuy(dress);
                    }}
                    initial={{ scale: 1 }}
                    animate={typeof window !== 'undefined' && window.innerWidth > 768 ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-1 relative group/btn flex items-center justify-center gap-2 py-2.5 px-4 rounded-full overflow-hidden transition-all active:scale-95 shadow-lg border border-white/60 bg-white/90 md:bg-white/40 md:backdrop-blur-md"
                  >
                    {/* Premium Shimmer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative flex items-center justify-center text-slate-900 font-black tracking-widest uppercase text-[10px] sm:text-xs">
                      <div className="bg-slate-900 p-1 rounded-full shadow-sm">
                        <ShoppingBag className="w-3 h-3 text-white" />
                      </div>
                      <span className="italic font-serif ml-1">Buy Now</span>
                    </div>
                  </motion.button>

                  <button
                    onClick={(e) => toggleWishlist(e, dress)}
                    className={`flex items-center justify-center p-2 sm:p-2.5 px-2.5 sm:px-4 rounded-full shadow-lg transition-all active:scale-90 ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/95 text-slate-500 hover:bg-pink-50 hover:text-pink-500'}`}
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>
              </Link>

              <div className="flex flex-col flex-grow px-1">
                <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                  <Link href={`/product/${dress.id}`} className="text-[14px] sm:text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors line-clamp-1 cursor-pointer">
                    {dress.name}
                  </Link>
                </div>
                <div className="text-[12px] sm:text-sm text-slate-500 mb-2 sm:mb-3">{dress.type}</div>

                <div className="mt-auto flex justify-between items-center">
                  <span className="text-[14px] sm:text-lg font-semibold text-slate-900">{dress.price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
