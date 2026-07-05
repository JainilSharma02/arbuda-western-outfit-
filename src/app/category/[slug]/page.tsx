"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";


// Mock data generator for specific subcategories!
const generateCategoryItems = (slug: string) => {
  const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Generating generic dynamic items based on the category name
  return Array.from({ length: 8 }).map((_, i) => ({
    id: 300 + i,
    name: `Premium ${formattedTitle} - Style ${i + 1}`,
    type: formattedTitle,
    price: `₹${(Math.floor(Math.random() * 5) + 1) * 999}`,
    // Using a reliable generic collection from unsplash based on fashion
    image: `https://images.unsplash.com/photo-1550614000-4b95dd526563?q=80&w=600&auto=format&fit=crop&sig=${slug}${i}`,
    colors: ["#000", "#fff", "#8d99ae"].slice(0, Math.floor(Math.random() * 2) + 1)
  }));
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
   const [cartItems, setCartItems] = useState<number[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const items = generateCategoryItems(slug);


  useEffect(() => {
    const loadWishlist = () => {
      const stored = localStorage.getItem('wishlist');
      if (stored) {
        const parsed = JSON.parse(stored);
        setWishlistIds(parsed.map((i: any) => i.id));
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

  const handleBuy = (item: any) => {
    const message = `Hello Arbuda Western! \n\nI want to buy this:\nProduct : ${item.name}\nPrice : ${item.price}\n\nPlease help me with the order! `;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl pt-32 min-h-screen">
      <div className="mb-8">
        <Link href="/clothing" className="inline-flex items-center text-sm text-slate-500 hover:text-[#b58b66] transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all clothing
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 capitalize">
          {formattedTitle}
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl">
          Explore our exclusive collection of {formattedTitle.toLowerCase()}. Designed for elegance and comfort, these pieces perfectly match your unique style.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3 sm:gap-x-8 gap-y-8 sm:gap-y-12">
        {items.map((item) => {
          const isLiked = wishlistIds.includes(item.id);
          
          return (
            <div key={item.id} className="group flex flex-col">
              <Link href={`/product/${item.id}`} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 mb-4 block cursor-pointer border border-slate-100 shadow-sm no-tap-highlight group">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 will-change-transform ease-out group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
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

              <div className="flex flex-col flex-grow px-1">
                <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                  <Link href={`/product/${item.id}`} className="text-[14px] sm:text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors line-clamp-1 cursor-pointer">
                    {item.name}
                  </Link>
                </div>
                <div className="text-[12px] sm:text-sm text-slate-500 mb-2 sm:mb-3">{item.type}</div>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-[14px] sm:text-lg font-bold text-slate-900">{item.price}</span>
                  
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
