"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Truck, ArrowRight, ShieldCheck } from "lucide-react";


export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);


  interface Product {
    name: string;
    price: string;
    image: string;
    description: string;
    sizes: string[];
    gallery?: string[];
  }

    // Dynamic Generation for 100% Connectivity - Every ID works perfectly!
    const getProductDetails = (prodId: string) => {
      const numId = parseInt(prodId);
      
      // Default Base Item
      let item: Product = {
        name: `Premium Collection #${prodId}`,
        price: "₹1,499",
        image: `https://images.unsplash.com/photo-1550614000-4b95dd526563?q=80&w=800&auto=format`,
        description: "A signature piece from Arbuda Western, designed for effortless style and maximum comfort. Crafted from premium fabrics that feel like a second skin.",
        sizes: ["S", "M", "L", "XL"]
      };

      // Intelligent Category-based Generation
      if (numId >= 101 && numId < 200) {
        const tops = ["Cotton Crew T-Shirt", "Sleeveless Tank Top", "Elegant Silk Blouse", "Oxford Button-Down", "Cashmere Sweater", "Knitted Cardigan"];
        const topImages = [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", 
          "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
          "https://images.unsplash.com/photo-1551163943-3f6a855d1153",
          "https://images.unsplash.com/photo-1598554747436-c000d43a010d",
          "https://images.unsplash.com/photo-1614301552345-06443c7bda1c",
          "https://images.unsplash.com/photo-1434389677669-e08b4cac3105"
        ];
        const index = numId - 101;
        item.name = tops[index % tops.length];
        item.image = topImages[index % topImages.length] + "?q=80&w=800&auto=format";
        item.price = "₹999";
      } else if (numId >= 201 && numId < 300) {
        const bottoms = ["Slim Fit Jeans", "Formal Trousers", "Yoga Leggings", "Pleated Midi Skirt", "Denim Shorts"];
        const bottomImages = [
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
          "https://images.unsplash.com/photo-1594633312681-42037199c15a",
          "https://images.unsplash.com/photo-1506629082955-520b69af7b0d",
          "https://images.unsplash.com/photo-1583496661160-c588c443c982",
          "https://images.unsplash.com/photo-1591369822096-ffd140ec948f"
        ];
        const index = numId - 201;
        item.name = bottoms[index % bottoms.length];
        item.image = bottomImages[index % bottomImages.length] + "?q=80&w=800&auto=format";
        item.price = "₹1,899";
      } else if (numId >= 301 && numId < 400) {
        const ones = ["Evening Floral Dress", "Chic Party Jumpsuit", "Summer Romper"];
        const oneImages = [
          "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
          "https://images.unsplash.com/photo-1485230405346-71acb9518d9c",
          "https://images.unsplash.com/photo-1515347619252-1c05d9e9abac"
        ];
        const index = numId - 301;
        item.name = ones[index % ones.length];
        item.image = oneImages[index % oneImages.length] + "?q=80&w=800&auto=format";
        item.price = "₹3,499";
      } else if (numId >= 401 && numId < 500) {
        const outers = ["Tailored Blazer", "Leather Moto Jacket", "Classic Overcoat", "Graphic Hoodie", "Lightweight Shrug"];
        const outerImages = [
          "https://images.unsplash.com/photo-1591369822096-ffd140ec948f",
          "https://images.unsplash.com/photo-1551028719-00167b16eac5",
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956",
          "https://images.unsplash.com/photo-1556821840-0a37f66ce869",
          "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77"
        ];
        const index = numId - 401;
        item.name = outers[index % outers.length];
        item.image = outerImages[index % outerImages.length] + "?q=80&w=800&auto=format";
        item.price = "₹2,799";
      } else if (numId >= 501 && numId < 600) {
        const trads = ["Premium Kurta set", "Silk Designer Saree", "Embroidery Salwar Suit", "Bridal Lehenga Choli"];
        const tradImages = [
          "https://images.unsplash.com/photo-1617251137884-f135eccf6942",
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
          "https://images.unsplash.com/photo-1583391733958-d25e07fac662",
          "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1"
        ];
        const index = numId - 501;
        item.name = trads[index % trads.length];
        item.image = tradImages[index % tradImages.length] + "?q=80&w=800&auto=format";
        item.price = "₹4,999";
      }

      const knownItems: Record<number, Product> = {
        5: { name: "Premium Beige Anarkali Kurta set", price: "₹1,200", image: "/images/d1.jpeg", gallery: ["/images/d1.jpeg", "/images/d2.jpeg"], description: "Elegant beige silk anarkali with intricate embroidery and floral details. Perfectly paired with matching palazzo pants for a timeless traditional look.", sizes: ["S", "M", "L", "XL"] },
        6: { name: "Premium Designer Kurti set", price: "₹1,500", image: "/images/d2.jpeg", gallery: ["/images/d2.jpeg", "/images/d1.jpeg"], description: "A beautifully crafted designer kurti featuring contemporary patterns and premium fabric. Versatile enough for both casual and festive occasions.", sizes: ["S", "M", "L", "XL"] },
        1: { name: "Indo-Western Silk Gown", price: "₹3,499", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983", sizes: ["S", "M", "L", "XL"], description: "A stunning silk gown that blends traditional Indian craftsmanship with modern Western silhouettes." }
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

  const handleBuy = () => {
    const message = `Hello Arbuda Western! \n\nI want to buy this:\nProduct : ${itemDetails.name}\nPrice : ${itemDetails.price}\nSelected Size : ${selectedSize || 'Not selected'}\n\nPlease help me with the order! `;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 md:pt-24 md:pb-16 pb-[100px]">
      {/* Mobile-Native floating back button (Sleeker & Smaller) */}
      <Link href="/clothing" className="md:hidden absolute top-24 left-4 z-[40] bg-white/95 backdrop-blur-md p-2.5 rounded-full shadow-xl text-slate-900 border border-slate-200 active:scale-95 transition-all">
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className="container mx-auto p-0 md:px-4 max-w-6xl">
        <Link href="/clothing" className="hidden md:inline-flex items-center text-slate-500 hover:text-[#b58b66] transition-colors mb-8 font-medium">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Collection
        </Link>

        {/* Outer Container feels like a sleek app card on Desktop, edge-to-edge on Mobile */}
        <div className="bg-white md:rounded-[2.5rem] shadow-none md:shadow-2xl overflow-hidden flex flex-col md:flex-row border-0 md:border border-slate-100">
          
          {/* Image Section - Consistent horizontal slider for both Desktop & Mobile */}
          <div className="w-full md:w-1/2 relative group/gallery bg-slate-50">
            <div 
              id="product-gallery-scroll"
              className="flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-0 w-full h-full"
            >
              {(itemDetails.gallery || [itemDetails.image]).map((img: string, idx: number) => (
                <div key={idx} className="relative flex-shrink-0 w-full aspect-[4/5] md:aspect-auto md:h-full bg-slate-100 snap-center">
                  <Image 
                    src={img}
                    alt={`${itemDetails.name} ${idx + 1}`} 
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* Manual Swipe Buttons - Always visible on desktop hover, sleek on mobile */}
            {itemDetails.gallery && itemDetails.gallery.length > 1 && (
              <>
                <button 
                  onClick={() => {
                    const el = document.getElementById('product-gallery-scroll');
                    if (el) el.scrollBy({ left: -el.offsetWidth, behavior: 'smooth' });
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-slate-900 border border-white/20 shadow-xl active:scale-90 transition-all opacity-0 group-hover/gallery:opacity-100 hidden md:flex z-30"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById('product-gallery-scroll');
                    if (el) el.scrollBy({ left: el.offsetWidth, behavior: 'smooth' });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center text-slate-900 border border-white/20 shadow-xl active:scale-90 transition-all opacity-0 group-hover/gallery:opacity-100 hidden md:flex z-30"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
            
            {/* Gallery Indicator (Mobile Only) */}
            {itemDetails.gallery && itemDetails.gallery.length > 1 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-20">
                {itemDetails.gallery.map((_: any, idx: number) => (
                  <div key={idx} className="w-2 h-2 rounded-full bg-white/50 backdrop-blur-md shadow-sm" />
                ))}
              </div>
            )}
            
            {/* Soft gradient overlay at the bottom for aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden pointer-events-none" />
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
                onClick={handleBuy}
                className="flex-1 bg-[#b58b66] text-white py-4 md:py-6 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#a07a55] transition-all active:scale-95 shadow-xl shadow-[#b58b66]/20"
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
          onClick={handleBuy}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-lg transition-transform active:scale-95 shadow-[0_8px_20px_rgb(181,139,102,0.3)] bg-[#b58b66] text-white`}
        >
          <ShoppingBag size={20} /> Buy Now
        </button>
      </div>
    </div>

  );
}
