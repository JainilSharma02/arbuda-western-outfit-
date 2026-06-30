"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Heart, ShoppingBag, Truck, ArrowRight, ShieldCheck } from "lucide-react";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");

  // Dynamic Lookup for all known items to ensure clicked item = displayed item
  const getProductDetails = (prodId: string) => {
    const numId = parseInt(prodId);
    let item = {
      name: `Premium Collection Item ${prodId}`,
      price: `₹${(Math.floor((numId % 5) + 1) * 999)}`,
      image: `https://images.unsplash.com/photo-1550614000-4b95dd526563?q=80&w=800&auto=format&fit=crop&sig=${numId}`,
      description: "Expertly crafted for the modern Indian woman, balancing tradition with contemporary western aesthetics. Premium fabric with breathable texture.",
      sizes: ["XS", "S", "M", "L", "XL"]
    };

    const knownItems: Record<number, any> = {
      1: { name: "Indo-Western Silk Gown", price: "₹3,499", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983" },
      2: { name: "Embroidered Crop Top & Palazzo", price: "₹2,899", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac662?q=80&w=1974" },
      3: { name: "Floral Block Print Maxi", price: "₹1,999", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1946" },
      4: { name: "Chikankari Fusion Set", price: "₹2,450", image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972" },
      5: { name: "Premium Beige Anarkali Kurta set", price: "₹2,999", image: "https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=1964", description: "Elegant beige silk anarkali with intricate embroidery and floral details. Perfectly paired with matching palazzo pants for a timeless traditional look." },
      6: { name: "Cotton A-Line Western Tunic", price: "₹1,250", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976" },
      7: { name: "Designer Georgette Saree Gown", price: "₹4,999", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974" },
      8: { name: "Denim Jacket & Kurti Combo", price: "₹2,199", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935" },
      11: { name: "Classic Denim Jacket", price: "₹2,199", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1935" },
      12: { name: "Chikankari Kurti Set", price: "₹1,850", image: "https://images.unsplash.com/photo-1515347619252-1c05d9e9abac?q=80&w=2070" },
      13: { name: "Formal Structured Blazer", price: "₹3,299", image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1974" },
      14: { name: "Cotton Lounge Co-ord Set", price: "₹1,499", image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972" },
      15: { name: "Silk Saree with Blouse", price: "₹5,999", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1974" },
      16: { name: "Pleated Midi Skirt", price: "₹1,250", image: "https://images.unsplash.com/photo-1583496661160-c588c443c982?q=80&w=2072" },
      17: { name: "Embroidered Crop Top", price: "₹1,100", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac662?q=80&w=1974" },
      18: { name: "Flared Palazzo Pants", price: "₹950", image: "https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=1964" }
    };

    if (knownItems[numId]) item = { ...item, ...knownItems[numId] };
    return item;
  };

  const itemDetails = getProductDetails(id);
  const numId = parseInt(id);

  useEffect(() => {
    const checkWishlistStatus = () => {
      const stored = localStorage.getItem('wishlist');
      if (stored) {
        const wishlist = JSON.parse(stored);
        setIsLiked(wishlist.some((item: any) => item.id === numId));
      } else {
        setIsLiked(false);
      }
    };
    
    // Initial check
    checkWishlistStatus();
    
    // Listen for changes (like deleting from the Navbar drawer)
    window.addEventListener('wishlistUpdated', checkWishlistStatus);
    
    // Cleanup
    return () => window.removeEventListener('wishlistUpdated', checkWishlistStatus);
  }, [numId]);

  const toggleWishlist = () => {
    const stored = localStorage.getItem('wishlist');
    let wishlist = stored ? JSON.parse(stored) : [];
    
    if (isLiked) {
      wishlist = wishlist.filter((item: any) => item.id !== numId);
    } else {
      wishlist.push({
        id: numId,
        name: itemDetails.name,
        price: itemDetails.price.replace(/[^\d.,]/g, ''),
        image: itemDetails.image
      });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new Event('wishlistUpdated'));
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-slate-50 md:pt-24 md:pb-16 pb-[100px]">
      {/* Mobile-Native floating back button (Safe Position) */}
      <Link href="/clothing" className="md:hidden absolute top-24 left-5 z-[40] bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg text-slate-800 border border-slate-100 active:scale-90 transition-transform">
        <ChevronLeft className="w-6 h-6" />
      </Link>

      <div className="container mx-auto p-0 md:px-4 max-w-6xl">
        <Link href="/clothing" className="hidden md:inline-flex items-center text-slate-500 hover:text-[#b58b66] transition-colors mb-8 font-medium">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Collection
        </Link>

        {/* Outer Container feels like a sleek app card on Desktop, edge-to-edge on Mobile */}
        <div className="bg-white md:rounded-[2.5rem] shadow-none md:shadow-2xl overflow-hidden flex flex-col md:flex-row border-0 md:border border-slate-100">
          
          {/* Image Section - Edge to edge on mobile */}
          <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto md:min-h-[700px] bg-slate-100">
            <Image 
              src={itemDetails.image}
              alt={itemDetails.name} 
              fill
              className="object-cover"
              unoptimized
            />
            {/* Soft gradient overlay at the bottom for aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col relative -mt-6 rounded-t-3xl md:-mt-0 md:rounded-t-none bg-white z-10">
            <div className="flex justify-between items-start mb-2">
              <div className="uppercase tracking-widest text-xs font-bold text-[#b58b66] bg-orange-50 px-3 py-1 rounded-full">
                Arbuda Exclusive
              </div>
              <button 
                onClick={toggleWishlist}
                className={`md:hidden flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${isLiked ? 'border-pink-500 bg-pink-50 text-pink-500 shadow-pink-100 shadow-lg' : 'border-slate-200 text-slate-400 bg-slate-50'}`}
              >
                <Heart fill={isLiked ? "currentColor" : "none"} size={18} />
              </button>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-3 leading-tight pr-4">
              {itemDetails.name}
            </h1>
            
            <p className="text-2xl text-[#b58b66] font-bold mb-6 flex items-center">
              {itemDetails.price} 
              <span className="text-sm text-slate-400 font-light line-through ml-3">₹{(parseInt(itemDetails.price.replace(/\D/g, '')) * 1.4).toFixed(0)}</span>
              <span className="ml-3 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">SALE</span>
            </p>

            <p className="text-slate-600 text-[15px] md:text-lg mb-8 leading-relaxed">
              {itemDetails.description}
            </p>

            {/* Sizes */}
            <div className="mb-8 border-t border-slate-100 pt-6">
              <div className="flex justify-between items-end mb-4">
                <span className="font-semibold text-slate-900">Select Size</span>
                <span className="text-[#b58b66] text-xs font-bold uppercase tracking-wider underline">Size Guide</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                {itemDetails.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-shrink-0 w-14 h-14 rounded-2xl border-2 font-bold text-lg flex items-center justify-center transition-all ${selectedSize === size ? 'border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'border-slate-200 text-slate-500 hover:border-slate-900 hover:text-slate-900'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Actions (Hidden on Mobile) */}
            <div className="hidden md:flex gap-4 mt-auto">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const message = `Hello, mujhe ye chahiye: *${itemDetails.name}* (ID: ${id}, Size: ${selectedSize}) - Price: ${itemDetails.price}`;
                  window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_8px_30px_rgb(181,139,102,0.3)] bg-[#b58b66] text-white hover:bg-[#a07a55] hover:scale-[1.02]`}
              >
                <ShoppingBag /> Buy Now
              </button>
              
              <button 
                onClick={toggleWishlist}
                className={`flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300 ${isLiked ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-slate-200 text-slate-400 hover:border-pink-500 hover:text-pink-500'}`}
              >
                <Heart fill={isLiked ? "currentColor" : "none"} size={26} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
              <div className="flex items-center text-slate-600 bg-slate-50 p-4 rounded-2xl">
                <ShieldCheck className="w-6 h-6 mr-4 text-[#b58b66]" />
                <span className="text-sm font-medium">100% Original Authentic Products <br/><span className="text-xs text-slate-400 font-normal">Hassle-free guarantee built-in</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE APPLICATION STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 pb-6 flex gap-3 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-50">
        <button 
          onClick={(e) => {
            e.preventDefault();
            const message = `Hello, mujhe ye chahiye: *${itemDetails.name}* (ID: ${id}, Size: ${selectedSize}) - Price: ${itemDetails.price}`;
            window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, '_blank');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-lg transition-transform active:scale-95 shadow-[0_8px_20px_rgb(181,139,102,0.3)] bg-gradient-to-r from-[#b58b66] to-[#99724f] text-white`}
        >
          <ShoppingBag size={20} /> Buy ({itemDetails.price})
        </button>
      </div>
    </div>
  );
}
