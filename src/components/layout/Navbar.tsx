"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, Heart, ChevronDown, Trash2, ShoppingBag, X, ArrowRight, SearchX } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

const categoriesInfo = [
  { 
    name: "Traditional Wear", 
    sections: [
      {
        name: "Dresses",
        items: [
          { name: "3 piece", image: "/images/d1.jpeg" },
          { name: "peacock patten", image: "/images/3 piece.jpeg" },
          { name: "2 piece", image: "/images/2 piece .jpeg" }
        ]
      },
      {
        name: "Short Kurti",
        items: [
          { name: "short kurti", image: "/images/c 1.jpeg" }
        ]
      },
      {
        name: "Cortset",
        items: [
          { name: "cort set with pocket", image: "/images/cort set 1.jpeg" }
        ]
      }
    ] 

  },
  {
    name: "Western Collection",
    sections: [
      {
        name: "Cort set",
        items: [
          { name: "cort set with pocket", image: "/images/cort set 1.jpeg" },
          { name: "printed cortset", image: "/images/cort set 2.jpeg" },
          { name: "designer cortset", image: "/images/cort set 3.jpeg" }
        ]
      },
      {
        name: "Premium Western",
        items: [
          { name: "2 piece set", image: "/images/2 1.jpeg" },
          { name: "3 piece set", image: "/images/3 1.jpeg" }
        ]
      }
    ]
  }
];
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSearchCategory, setActiveSearchCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Comprehensive mapping for all categories to ensure proper product opening
  const productMap: Record<string, string> = {
    // Traditional
    "3 piece": "5",
    "peacock patten": "777",
    "short kurti": "888",
    "2 piece": "555",
    "cort set with pocket": "900",
    // Western Collection Sync
    "jeans": "western",
    "lower": "western",
    "night wear": "western",
    "cortset": "western",
    "top": "888" 
  };

  const updatedCategories = categoriesInfo;

  const allProducts = updatedCategories.flatMap(cat => 
    cat.sections.flatMap(sec => 
      sec.items.map(item => ({ ...item, sectionName: sec.name, parentName: cat.name }))
    )
  );

  const filteredResults = searchQuery
    ? allProducts.filter(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : updatedCategories.flatMap(cat => cat.sections).find(c => c.name === activeSearchCategory)?.items || [];

  useEffect(() => {
    const loadWishlist = () => {
      const stored = localStorage.getItem('wishlist');
      if (stored) setWishlistItems(JSON.parse(stored));
    };
    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  // Prevent body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const removeFromWishlist = (id: number) => {
    const updated = wishlistItems.filter((i) => i.id !== id);
    setWishlistItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleBuy = (item: any) => {
    const message = `Hello Arbuda Western! \n\nI want to buy this from my wishlist:\nProduct : ${item.name}\nPrice : ₹${item.price}\n\nPlease help me with the order! `;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-xl py-2" : "bg-transparent py-4 md:py-6"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#b58b66] origin-left z-50"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4 flex items-center justify-between h-14 md:h-20">
        {/* Mobile Menu Trigger */}
        <div className="md:hidden flex items-center justify-start">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger render={
              <button className="p-2 text-slate-900 group active:scale-95 transition-transform bg-white/50 rounded-xl perfect-blur border border-white">
                <Menu className="h-6 w-6" />
              </button>
            } />
            <SheetContent side="left" className="w-[85%] p-0 border-none bg-white shadow-2xl">
              <div className="flex flex-col h-full gpu">
                <div className="p-8 border-b border-[#b58b66]/10 bg-white/40">
                  <h2 className="text-3xl font-serif font-bold tracking-tighter text-slate-900">Arbuda</h2>
                  <p className="text-[10px] text-[#b58b66] font-bold tracking-widest uppercase mt-1">Western Outfit</p>
                </div>
                
                <nav className="flex-1 overflow-y-auto px-5 py-8 space-y-4 hide-scrollbar">
                  {[
                    { name: "Summary", href: "/", icon: "✨" },
                    { name: "Exclusive Edit", href: "/clothing", icon: "👑" },
                    { name: "Dresses", href: "/dresses", icon: "👗" },
                    { name: "Western", href: "/western", icon: "💃" }
                  ].map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      className={`flex justify-between items-center px-6 py-4 rounded-2xl bg-white/60 hover:bg-white text-[17px] font-bold text-slate-800 border border-white shadow-sm transition-all active:scale-[0.98] ${link.name === "Exclusive Edit" ? "bg-[#b58b66]/5 border-[#b58b66]/10" : ""}`}
                    >
                      <span>{link.name}</span>
                      <span className="text-xl">{link.icon}</span>
                    </Link>
                  ))}
                </nav>
                
                <div className="p-6 pb-12 mt-auto border-t border-[#b58b66]/10 bg-white/30 backdrop-blur-sm">
                  <p className="text-xs text-slate-500 font-medium text-center italic">
                    "Style is a way to say who you are without having to speak."
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand/Logo */}
        <Link href="/" className="flex-1 flex justify-center md:flex-none md:justify-start overflow-visible relative">
          <h1 className="text-[12px] min-[380px]:text-[14px] sm:text-xl md:text-2xl lg:text-3xl font-serif font-black tracking-tighter md:tracking-widest uppercase text-black whitespace-nowrap text-center transition-all duration-300">
            ARBUDA <span className="text-[#b58b66]">WESTERN</span> OUTFIT
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 mx-10">
          {[
            { name: "Summary", href: "/" },
            { name: "Luxury Edit", href: "/clothing" },
            { name: "Dresses", href: "/dresses" },
            { name: "Western", href: "/western" }
          ].map((link) => (
            <Link key={link.name} href={link.href} className="group relative text-[14px] font-black text-black hover:text-[#b58b66] transition-colors tracking-widest uppercase">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#b58b66] transition-all duration-400 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-4 min-w-[90px] md:w-auto justify-end">
          
          
          <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <SheetTrigger render={
              <button className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-black relative active:scale-90">
                <Heart className="h-5 w-5 md:h-6 md:w-6" style={{ strokeWidth: 2.5 }} />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-[#b58b66] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            } />
            <SheetContent className="w-[90%] sm:w-[450px] p-0 border-none bg-white shadow-2xl">
              <div className="flex flex-col h-full">
                <div className="p-8 border-b border-[#b58b66]/10">
                  <h2 className="text-2xl font-serif font-bold text-slate-900">Your Wishlist</h2>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
                  {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Heart className="h-8 w-8 text-slate-300" />
                      </div>
                      <p className="text-slate-500 font-medium">Your wishlist is empty</p>
                      <button onClick={() => setIsWishlistOpen(false)} className="mt-4 text-[#b58b66] font-bold">Start Shopping &rarr;</button>
                    </div>
                  ) : (
                    wishlistItems.map((item) => (
                      <div key={item.id} className="flex gap-4 group">
                        <div className="relative h-24 w-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                          <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h3 className="font-bold text-sm text-slate-900 truncate mb-1">{item.name}</h3>
                          <p className="font-bold text-[#b58b66] text-sm">₹{item.price}</p>
                          <div className="flex items-center gap-3 mt-3">
                            <button 
                              onClick={() => handleBuy(item)}
                              className="text-[11px] font-bold uppercase tracking-widest text-[#b58b66] hover:bg-[#b58b66] hover:text-white px-3 py-1.5 rounded-full border border-[#b58b66]/30 transition-all"
                            >
                              Buy Now
                            </button>
                            <button 
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>

    </>
  );
}
