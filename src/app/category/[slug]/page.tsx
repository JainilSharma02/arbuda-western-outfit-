"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";

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
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const items = generateCategoryItems(slug);

  const toggleCart = (id: number) => setCartItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleLike = (id: number) => setLikedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {items.map((item) => {
          const inCart = cartItems.includes(item.id);
          const isLiked = likedItems.includes(item.id);
          
          return (
            <div key={item.id} className="group flex flex-col">
              <Link href={`/product/${item.id}`} className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 mb-4 block cursor-pointer border border-slate-100 shadow-sm">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className={`absolute bottom-4 left-0 right-0 px-4 flex gap-2 transition-all duration-300 ${(inCart || isLiked) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      const message = `Hi, I want to purchase the *${item.name}* (ID: ${item.id}) - Price: ${item.price}`;
                      window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 font-medium rounded-xl shadow-lg transition-colors duration-200 bg-white/95 backdrop-blur-md text-slate-900 hover:bg-[#b58b66] hover:text-white`}
                  >
                    <ShoppingBag size={18} /> Buy
                  </button>
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleLike(item.id); }}
                    className={`flex items-center justify-center p-2.5 px-4 rounded-xl shadow-lg transition-colors duration-200 ${isLiked ? 'bg-pink-500 text-white' : 'bg-white/95 backdrop-blur-md text-slate-500 hover:bg-pink-50 hover:text-pink-500'}`}
                  >
                    <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                  </button>
                </div>
              </Link>

              <div className="flex flex-col flex-grow px-1">
                <div className="flex justify-between items-start mb-1">
                  <Link href={`/product/${item.id}`} className="text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors line-clamp-1 cursor-pointer">
                    {item.name}
                  </Link>
                </div>
                <div className="text-sm text-slate-500 mb-3">{item.type}</div>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">{item.price}</span>
                  
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
