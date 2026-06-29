"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Heart, ShoppingBag, Truck, ArrowRight, ShieldCheck } from "lucide-react";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [isLiked, setIsLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");

  // A list of amazing details to show it's "unique & fixed well"
  const itemDetails = {
    name: "Luxury Fusion Collection",
    price: "₹1,999 - ₹4,999",
    description: "Expertly crafted for the modern Indian woman, balancing tradition with contemporary western aesthetics. Premium fabric with breathable texture and intricate detailing.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    features: [
      "Premium quality fabric",
      "Hand-stitched detailing",
      "Comfortable all-day wear",
      "Dry clean recommended"
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/clothing" className="inline-flex items-center text-slate-500 hover:text-[#b58b66] transition-colors mb-8 font-medium">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Collection
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
          
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-auto md:min-h-[600px] bg-slate-100">
            {/* Dynamic image based on ID (to create an illusion of different products without a full database) */}
            <Image 
              src={`https://images.unsplash.com/photo-${parseInt(id) % 2 === 0 ? '1595777457583-95e059d581b8' : '1583391733958-d25e07fac662'}?q=80&w=1983&auto=format&fit=crop`}
              alt="Premium Outfit" 
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col">
            <div className="mb-2 uppercase tracking-widest text-xs font-bold text-[#b58b66]">
              Arbuda Exclusive
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4 leading-tight">
              {itemDetails.name} <span className="text-xl text-slate-400 font-light">#{id}</span>
            </h1>
            
            <p className="text-2xl text-slate-800 font-medium mb-6 bg-slate-100 inline-block px-4 py-1.5 rounded-full w-max">
              {itemDetails.price}
            </p>

            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              {itemDetails.description}
            </p>

            {/* Sizes */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <span className="font-semibold text-slate-900">Select Size</span>
                <Link href="/size-guide" className="text-[#b58b66] text-sm hover:underline">Size Guide</Link>
              </div>
              <div className="flex flex-wrap gap-3">
                {itemDetails.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border-2 font-medium flex items-center justify-center transition-all ${selectedSize === size ? 'border-slate-900 bg-slate-900 text-white shadow-md' : 'border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-auto">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const message = `Hi, I want to purchase the *${itemDetails.name}* (ID: ${id}, Size: ${selectedSize}) - Price: ${itemDetails.price}`;
                  window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-lg transition-all duration-300 shadow-xl bg-[#b58b66] text-white hover:bg-[#a07a55]`}
              >
                <ShoppingBag /> Buy
              </button>
              
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300 ${isLiked ? 'border-pink-500 bg-pink-50 text-pink-500' : 'border-slate-200 text-slate-400 hover:border-pink-500 hover:text-pink-500'}`}
              >
                <Heart fill={isLiked ? "currentColor" : "none"} size={24} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col gap-4">
              <div className="flex items-center text-slate-600">
                <ShieldCheck className="w-5 h-5 mr-3 text-[#b58b66]" />
                100% Original Authentic Products
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
