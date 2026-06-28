"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

// Dummy data for premium women's dresses
const dressesData = [
  {
    id: 1,
    name: "Silk Slip Midi Dress",
    type: "Midi",
    price: "$85.00",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
    colors: ["#000000", "#e6c8c1", "#b58b66"],
  },
  {
    id: 2,
    name: "Floral Wrap Maxi Dress",
    type: "Maxi",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1946&auto=format&fit=crop",
    colors: ["#a1c181", "#e07a5f"],
  },
  {
    id: 3,
    name: "Satin Evening Gown",
    type: "Bodycon",
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=2070&auto=format&fit=crop",
    colors: ["#111111", "#9e2a2b"],
  },
  {
    id: 4,
    name: "Cotton A-Line Dress",
    type: "A-Line",
    price: "$65.00",
    image: "https://images.unsplash.com/photo-1515347619252-1c05d9e9abac?q=80&w=2070&auto=format&fit=crop",
    colors: ["#fdfbfb", "#8d99ae"],
  },
  {
    id: 5,
    name: "Linen Shirt Dress",
    type: "Shirt Dress",
    price: "$75.00",
    image: "https://images.unsplash.com/photo-1596455607563-ad6193f76b17?q=80&w=1974&auto=format&fit=crop",
    colors: ["#EADDCD", "#ffffff"],
  },
  {
    id: 6,
    name: "Velvet Shift Dress",
    type: "Shift",
    price: "$95.00",
    image: "https://images.unsplash.com/photo-1622152882255-b50a00df81e9?q=80&w=1964&auto=format&fit=crop",
    colors: ["#1b263b", "#3a5a40"],
  },
  {
    id: 7,
    name: "Bohemian Tiered Maxi",
    type: "Maxi",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=1974&auto=format&fit=crop",
    colors: ["#e9c46a", "#f4a261"],
  },
  {
    id: 8,
    name: "Ribbed Knit Midi Dress",
    type: "Midi",
    price: "$80.00",
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1926&auto=format&fit=crop",
    colors: ["#b58b66", "#111111"],
  }
];

export default function DressesPage() {
  // Simple state arrays to hold clicked functions (Cart and Heart)
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const toggleCart = (id: number) => {
    setCartItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleLike = (id: number) => {
    setLikedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {dressesData.map((dress) => {
          const inCart = cartItems.includes(dress.id);
          const isLiked = likedItems.includes(dress.id);
          
          return (
            <div key={dress.id} className="group flex flex-col">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4">
                <Image 
                  src={dress.image} 
                  alt={dress.name} 
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                {/* Always show overlay if an item is actively liked or added to cart so the user knows! */}
                <div className={`absolute bottom-4 left-0 right-0 px-4 flex gap-2 transition-all duration-300 ${(inCart || isLiked) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  <button 
                    onClick={() => toggleCart(dress.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 font-medium rounded-full shadow-lg transition-colors duration-200 ${inCart ? 'bg-[#111111] text-white' : 'bg-white/90 backdrop-blur-md text-slate-900 hover:bg-[#b58b66] hover:text-white'}`}
                  >
                    <ShoppingBag size={18} /> {inCart ? "Added" : "Add"}
                  </button>
                  <button 
                    onClick={() => toggleLike(dress.id)}
                    className={`flex items-center justify-center p-2.5 px-4 rounded-full shadow-lg transition-colors duration-200 ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-500 hover:bg-pink-50 hover:text-pink-500'}`}
                  >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-grow px-1">
                <div className="flex justify-between items-start mb-1">
                  <Link href={`#`} className="text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors line-clamp-1">
                    {dress.name}
                  </Link>
                </div>
                <div className="text-sm text-slate-500 mb-3">{dress.type}</div>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-semibold text-slate-900">{dress.price}</span>
                  
                  <div className="flex gap-1.5">
                    {dress.colors.map((color, idx) => (
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
