"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

const clothingData = [
  {
    id: 11,
    name: "Classic Denim Jacket",
    type: "Outerwear",
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop",
    colors: ["#4682B4", "#000"],
  },
  {
    id: 12,
    name: "Chikankari Kurti Set",
    type: "Ethnic Topwear",
    price: "₹1,850",
    image: "https://images.unsplash.com/photo-1515347619252-1c05d9e9abac?q=80&w=2070&auto=format&fit=crop",
    colors: ["#fff", "#8d99ae"],
  },
  {
    id: 13,
    name: "Formal Structured Blazer",
    type: "Workwear",
    price: "₹3,299",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1974&auto=format&fit=crop",
    colors: ["#8B4513", "#111"],
  },
  {
    id: 14,
    name: "Cotton Lounge Co-ord Set",
    type: "Loungewear",
    price: "₹1,499",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop",
    colors: ["#f5f5dc", "#A9A9A9"],
  },
  {
    id: 15,
    name: "Silk Saree with Blouse",
    type: "Traditional",
    price: "₹5,999",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop",
    colors: ["#800020", "#008080"],
  },
  {
    id: 16,
    name: "Pleated Midi Skirt",
    type: "Bottomwear",
    price: "₹1,250",
    image: "https://images.unsplash.com/photo-1583496661160-c588c443c982?q=80&w=2072&auto=format&fit=crop",
    colors: ["#f5f5dc", "#000"],
  },
  {
    id: 17,
    name: "Embroidered Crop Top",
    type: "Topwear",
    price: "₹1,100",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac662?q=80&w=1974&auto=format&fit=crop",
    colors: ["#FFD700", "#FF4500"],
  },
  {
    id: 18,
    name: "Flared Palazzo Pants",
    type: "Bottomwear",
    price: "₹950",
    image: "https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=1964&auto=format&fit=crop",
    colors: ["#000", "#fff"],
  }
];

export default function ClothingPage() {
  const [cartItems, setCartItems] = useState<number[]>([]);
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
    let storedItems = stored ? JSON.parse(stored) : [];
    if (storedItems.some((i: any) => i.id === item.id)) {
      storedItems = storedItems.filter((i: any) => i.id !== item.id);
    } else {
      storedItems.push({
        id: item.id,
        name: item.name,
        price: parseInt(item.price.replace(/[^\d]/g, '')),
        image: item.image,
        colors: item.colors
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(storedItems));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const toggleCart = (id: number) => {
    setCartItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pt-24 min-h-screen">
      <div className="mb-12 border-b border-slate-200 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-[#b58b66]">
          All Clothing
        </h1>
        <p className="text-slate-600 text-lg">
          Discover our full collection of premium Indian fusion and ethnic attire. Find your perfect outfit here.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-8 gap-y-8 sm:gap-y-12">
        {clothingData.map((item) => {
          const inCart = cartItems.includes(item.id);
          const isLiked = wishlistIds.includes(item.id);
          
          return (
            <div key={item.id} className="group flex flex-col">
              <Link href={`/product/${item.id}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4 block cursor-pointer">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className={`absolute bottom-2 sm:bottom-4 left-0 right-0 px-2 sm:px-4 flex gap-1.5 sm:gap-2 transition-all duration-300 ${(inCart || isLiked) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      const message = `Hi, I want to purchase the *${item.name}* (ID: ${item.id}) - Price: ${item.price}`;
                      window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2.5 px-2 sm:px-4 text-[12px] sm:text-base font-medium rounded-full shadow-lg transition-colors duration-200 bg-white/90 backdrop-blur-md text-slate-900 hover:bg-[#b58b66] hover:text-white`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> <span className="hidden min-[400px]:inline">Buy</span>
                  </button>
                  <button 
                    onClick={(e) => toggleWishlist(e, item)}
                    className={`flex items-center justify-center p-1.5 sm:p-2.5 px-2.5 sm:px-4 rounded-full shadow-lg transition-colors duration-200 ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-500 hover:bg-pink-50 hover:text-pink-500'}`}
                  >
                    <Heart className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>
              </Link>

              <div className="flex flex-col flex-grow px-1">
                <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                  <Link href={`/product/${item.id}`} className="text-[14px] sm:text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors line-clamp-1 cursor-pointer">
                    {item.name}
                  </Link>
                </div>
                <div className="text-[12px] sm:text-sm text-slate-500 mb-2 sm:mb-3">{item.type}</div>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-[14px] sm:text-lg font-semibold text-slate-900">{item.price}</span>
                  
                  <div className="flex gap-1.5">
                    {item.colors.map((color, idx) => (
                      <span 
                        key={idx} 
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-sm"
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
