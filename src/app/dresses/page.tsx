"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";


// Dummy data for premium women's dresses
const dressesData = [
  {
    id: 1,
    name: "Indo-Western Silk Gown",
    type: "Gown",
    price: "₹3,499",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
    colors: ["#800020", "#000000", "#b58b66"],
  },
  {
    id: 2,
    name: "Embroidered Crop Top & Palazzo",
    type: "Co-ord Set",
    price: "₹2,899",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac662?q=80&w=1974&auto=format&fit=crop",
    colors: ["#FFD700", "#FF4500"],
  },
  {
    id: 3,
    name: "Floral Block Print Maxi",
    type: "Maxi Dress",
    price: "₹1,999",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1946&auto=format&fit=crop",
    colors: ["#a1c181", "#ffffff"],
  },
  {
    id: 4,
    name: "Chikankari Kurti with Jeans",
    type: "Fusion",
    price: "₹1,450",
    image: "https://images.unsplash.com/photo-1515347619252-1c05d9e9abac?q=80&w=2070&auto=format&fit=crop",
    colors: ["#fdfbfb", "#8d99ae"],
  },
  {
    id: 5,
    name: "Rayon Anarkali Suit",
    type: "Traditional",
    price: "₹2,999",
    image: "https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=1964&auto=format&fit=crop",
    colors: ["#FF69B4", "#4B0082"],
  },
  {
    id: 6,
    name: "Cotton A-Line Western Tunic",
    type: "Tunic",
    price: "₹1,250",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop",
    colors: ["#1b263b", "#A9A9A9"],
  },
  {
    id: 7,
    name: "Designer Georgette Saree Gown",
    type: "Party Wear",
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974&auto=format&fit=crop",
    colors: ["#E6E6FA", "#008080"],
  },
  {
    id: 8,
    name: "Denim Jacket & Kurti Combo",
    type: "Winter Fusion",
    price: "₹2,199",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935&auto=format&fit=crop",
    colors: ["#4682B4", "#ffffff"],
  }
];

export default function DressesPage() {
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
    const message = `🌟 *ARBUDA WESTERN OUTFIT* 🌟\n--------------------------\n🛍️ *NEW ORDER ENQUIRY*\n\n📌 *Product:* ${dress.name}\n💰 *Price:* ${dress.price}\n\nHello Arbuda! I'm interested in this dress. Please help me with the order! ✨\n--------------------------`;
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
              <Link href={`/product/${dress.id}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4 block cursor-pointer">
                <Image 
                  src={dress.image} 
                  alt={dress.name} 
                  fill
                  unoptimized={true}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className={`absolute bottom-2 sm:bottom-4 left-0 right-0 px-2 sm:px-4 flex gap-1.5 sm:gap-2 transition-all duration-300 translate-y-0 md:translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0`}>
                   <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleBuy(dress);
                    }}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2.5 px-2 sm:px-4 text-[12px] sm:text-base font-medium rounded-full shadow-lg transition-colors duration-200 bg-white/90 backdrop-blur-md text-slate-900 hover:bg-[#b58b66] hover:text-white`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" /> <span className="hidden min-[400px]:inline">Buy Now</span>
                  </button>

                  <button 
                    onClick={(e) => toggleWishlist(e, dress)}
                    className={`flex items-center justify-center p-1.5 sm:p-2.5 px-2.5 sm:px-4 rounded-full shadow-lg transition-colors duration-200 ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/90 backdrop-blur-md text-slate-500 hover:bg-pink-50 hover:text-pink-500'}`}
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
