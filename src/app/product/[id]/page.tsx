"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Heart, ShoppingBag, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";


export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");

  interface Product {
    name: string;
    price: string;
    image: string;
    description: string;
    sizes: string[];
    gallery?: string[];
  }

    const getProductDetails = (prodId: string) => {
      const numId = parseInt(prodId);
      
      let item: Product = {
        name: `Premium Collection #${prodId}`,
        price: "₹1,499",
        image: `https://images.unsplash.com/photo-1550614000-4b95dd526563?q=80&w=800&auto=format`,
        description: "A signature piece from Arbuda Western, designed for effortless style and maximum comfort. Crafted from premium fabrics that feel like a second skin.",
        sizes: ["S", "M", "L", "XL"]
      };

      const knownItems: Record<number, Product> = {
        888: { 
          name: "Designer Short Kurti", 
          price: "₹550", 
          image: "/images/c 1.jpeg", 
          gallery: ["/images/c 1.jpeg", "/images/c 2.jpeg", "/images/c 3.jpeg", "/images/c 4.jpeg"], 
          description: "A stylish and comfortable short kurti perfect for casual wear or festive occasions. Crafted from premium breathable fabric with elegant prints.", 
          sizes: ["S", "M", "L", "XL"] 
        },
        777: { 
          name: "Peacock Pattern 3-Piece Set", 
          price: "₹1,100", 
          image: "/images/3 piece.jpeg", 
          gallery: ["/images/3 1.jpeg", "/images/3 2.jpeg", "/images/3 3.jpeg", "/images/3 4.jpeg", "/images/3 5 .jpeg", "/images/3 6.jpeg", "/images/3 7.jpeg", "/images/3 8 .jpeg", "/images/3 9 .jpeg", "/images/3 piece.jpeg"], 
          description: "An exquisite 3-piece traditional set featuring a stunning peacock-inspired pattern. This ensemble includes a beautifully detailed kurta, comfortable trousers, and a matching dupatta.", 
          sizes: ["S", "M", "L", "XL"] 
        },
        555: { name: "2 piece Traditional Set", price: "₹1,150", image: "/images/2 piece .jpeg", gallery: ["/images/2 1.jpeg", "/images/2 2.jpeg", "/images/2 3.jpeg", "/images/2 piece .jpeg"], description: "A premium 2-piece traditional ensemble that perfectly balances cultural heritage with contemporary elegance. Crafted from high-grade silk-blend fabric.", sizes: ["S", "M", "L", "XL"] },
        556: { name: "2 piece", price: "₹1,150", image: "/images/2 piece 1.jpeg", gallery: ["/images/2 piece 1.jpeg", "/images/2 p 3.jpeg", "/images/2 p 4.jpeg"], description: "A stunning 2-piece set featuring intricate ethnic patterns and a modern fit. Perfect for festive gatherings and special occasions.", sizes: ["S", "M", "L", "XL"] },
        5: { name: "Premium Beige Anarkali Kurta set", price: "₹1,200", image: "/images/d1.jpeg", gallery: ["/images/d1.jpeg", "/images/d2.jpeg"], description: "Elegant beige silk anarkali with intricate embroidery and floral details. Perfectly paired with matching palazzo pants for a timeless traditional look.", sizes: ["S", "M", "L", "XL"] },
        6: { name: "Premium Designer Kurti set", price: "₹1,500", image: "/images/d2.jpeg", gallery: ["/images/d2.jpeg", "/images/d1.jpeg"], description: "A beautifully crafted designer kurti featuring contemporary patterns and premium fabric. Versatile enough for both casual and festive occasions.", sizes: ["S", "M", "L", "XL"] },
        901: { name: "Designer Short Kurti Pink", price: "₹650", image: "/images/c 2.jpeg", gallery: ["/images/c 2.jpeg", "/images/c 1.jpeg"], description: "Vibrant pink designer short kurti with modern accents. Lightweight and stylish for everyday elegance.", sizes: ["S", "M", "L", "XL"] },
        902: { name: "Designer Short Kurti Blue", price: "₹650", image: "/images/c 3.jpeg", gallery: ["/images/c 3.jpeg", "/images/c 4.jpeg"], description: "Classic blue designer short kurti featuring premium craftsmanship and a comfortable fit.", sizes: ["S", "M", "L", "XL"] },
        900: { 
          name: "Cort set with pocket", 
          price: "₹1,050", 
          image: "/images/cort set 1.jpeg", 
          gallery: ["/images/cort set 1.jpeg", "/images/cort set 2.jpeg", "/images/cort set 3.jpeg", "/images/cort set 4.jpeg", "/images/cort set 5.jpeg"], 
          description: "Premium Cort Set featuring a stylish side pocket design. Crafted with high-quality fabric for a luxurious feel and elegant silhouette.", 
          sizes: ["S", "M", "L", "XL"] 
        },
        903: { 
            name: "Designer Cortset Set", 
            price: "₹1,250", 
            image: "/images/cort set 1.jpeg", 
            gallery: ["/images/cort set 2.jpeg", "/images/cort set 3.jpeg"], 
            description: "High-end designer cortset set featuring premium western fusion styles and unmatched comfort.", 
            sizes: ["S", "M", "L", "XL"] 
        },
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
    checkWishlistStatus();
    window.addEventListener('wishlistUpdated', checkWishlistStatus);
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
    <div className="min-h-screen bg-slate-50 md:pt-24 md:pb-16 pb-[100px] smooth-scroll">
      <button 
        onClick={() => {
          if (typeof window !== 'undefined' && window.history.length > 2) {
            router.back();
          } else {
            router.push('/');
          }
        }} 
        className="md:hidden fixed top-24 left-4 z-[40] bg-white/95 border border-slate-200 p-2.5 rounded-full shadow-xl text-slate-900 active:scale-90 transition-all no-tap-highlight"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="container mx-auto p-0 md:px-4 max-w-6xl">
        <button 
          onClick={() => {
            if (typeof window !== 'undefined' && window.history.length > 2) {
              router.back();
            } else {
              router.push('/');
            }
          }} 
          className="hidden md:inline-flex items-center text-slate-500 hover:text-[#b58b66] transition-colors mb-8 font-medium no-tap-highlight"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>

        <div className="bg-white md:rounded-[2.5rem] shadow-none md:shadow-2xl overflow-hidden flex flex-col md:flex-row border-0 md:border border-slate-100">
          
          <div className="w-full md:w-1/2 relative group/gallery bg-slate-50 gpu overflow-hidden">
            <div 
              id="product-gallery-scroll"
              className="flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-0 w-full h-full gpu"
            >
              {(itemDetails.gallery || [itemDetails.image]).map((img: string, idx: number) => (
                <div key={idx} className="relative flex-shrink-0 w-full aspect-[4/5] md:aspect-auto md:h-full bg-slate-100 snap-center gpu">
                  <Image 
                    src={img}
                    alt={`${itemDetails.name} ${idx + 1}`} 
                    fill
                    className="object-cover will-change-transform"
                    unoptimized
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            {itemDetails.gallery && itemDetails.gallery.length > 1 && (
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-20 pointer-events-none">
                {itemDetails.gallery.map((_: any, idx: number) => (
                  <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/40 border border-white/20" />
                ))}
              </div>
            )}
            
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent md:hidden pointer-events-none" />
          </div>

          <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-16 flex flex-col relative -mt-8 md:mt-0 rounded-t-[2.5rem] md:rounded-t-none bg-white z-10 gpu shadow-[-10px_0_30px_rgba(0,0,0,0.05)] md:shadow-none">
            <div className="flex justify-between items-start mb-4">
              <div className="uppercase tracking-[0.2em] text-[10px] font-black text-[#b58b66] bg-[#b58b66]/5 px-4 py-1.5 rounded-full border border-[#b58b66]/10">
                Arbuda Exclusive
              </div>
              <button 
                onClick={toggleWishlist}
                className={`md:hidden flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 no-tap-highlight active:scale-90 ${isLiked ? 'border-pink-500 bg-pink-50 text-pink-500 shadow-lg shadow-pink-100' : 'border-slate-100 text-slate-400 bg-slate-50'}`}
              >
                <Heart fill={isLiked ? "currentColor" : "none"} size={20} />
              </button>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-black text-slate-900 mb-4 leading-tight">
              {itemDetails.name}
            </h1>
            
            <p className="text-2xl md:text-3xl text-[#b58b66] font-black mb-6">
              {itemDetails.price} 
            </p>

            <div className="h-[1px] w-full bg-slate-100 mb-8" />

            <p className="text-slate-600 text-[15px] md:text-lg mb-10 leading-relaxed font-medium">
              {itemDetails.description}
            </p>

            {/* Sizes Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-5">
                <span className="font-black text-slate-900 text-sm uppercase tracking-widest">Select Size</span>
                <Link href="/size-guide" className="text-[#b58b66] text-[11px] font-black uppercase tracking-widest border-b border-[#b58b66] no-tap-highlight">
                  Size Guide
                </Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {itemDetails.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 font-black text-lg flex items-center justify-center transition-all no-tap-highlight active:scale-90 ${selectedSize === size ? 'border-slate-900 bg-slate-900 text-white shadow-2xl' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-900 hover:text-slate-900'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Final Action Button - Fixed Position below sizes */}
            <div className="flex gap-4 md:gap-6 pt-4 mb-10">
              <button 
                onClick={handleBuy}
                className="flex-[4] bg-slate-900 text-white py-4 md:py-5 rounded-[2xl] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#b58b66] transition-all active:scale-95 shadow-2xl shadow-slate-900/10"
              >
                <ShoppingBag size={20} /> Buy Now
              </button>

              <button 
                onClick={toggleWishlist}
                className={`flex-1 flex items-center justify-center aspect-square md:w-16 md:h-16 rounded-full border-2 transition-all duration-300 ${isLiked ? 'border-pink-500 bg-pink-50 text-pink-500 shadow-lg shadow-pink-100' : 'border-slate-200 text-slate-400 hover:border-pink-500 hover:text-pink-500'}`}
              >
                <Heart fill={isLiked ? "currentColor" : "none"} size={22} className="md:size-[26px]" />
              </button>
            </div>

            <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-4">
              <div className="flex items-center text-slate-500 bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
                <ShieldCheck className="w-7 h-7 mr-5 text-[#b58b66]" />
                <p className="text-[13px] font-bold leading-snug">
                  100% Original Authentic Products <br/>
                  <span className="text-[11px] text-slate-400 font-medium">Verified Arbuda Quality Check Pass</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
