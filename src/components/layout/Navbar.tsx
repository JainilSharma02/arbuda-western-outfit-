"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, Heart, ChevronDown, Trash2, ShoppingBag, X } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

const categoriesInfo = [
  { 
    name: "Traditional Wear", 
    subcategories: [
      { name: "3 piece", image: "/images/d1.jpeg" },
      { name: "peacock patten", image: "/images/3 piece.jpeg" },
      { name: "short kurti", image: "/images/c 1.jpeg" },
      { name: "2 piece", image: "/images/2 piece .jpeg" }
    ] 
  },
  {
    name: "Western",
    subcategories: [
      { name: "Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format" },
      { name: "Lower", image: "https://images.unsplash.com/photo-1594633312681-42037199c15a?q=80&w=600&auto=format" },
      { name: "Night Wear", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format" },
      { name: "Cortset", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format" },
      { name: "Top", image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=600&auto=format" }
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

  const [activeSearchCategory, setActiveSearchCategory] = useState<string>("Traditional Wear");
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
    // Western Collection Sync
    "jeans": "western",
    "lower": "western",
    "night wear": "western",
    "cortset": "western",
    "top": "888" 
  };

  const updatedCategories = categoriesInfo;

  const filteredResults = searchQuery
    ? updatedCategories.flatMap(cat => 
        cat.subcategories.filter(sub => 
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(sub => ({ ...sub, category: cat.name }))
      )
    : updatedCategories.find(c => c.name === activeSearchCategory)?.subcategories || [];

  useEffect(() => {
    const loadWishlist = () => {
      const stored = localStorage.getItem('wishlist');
      if (stored) setWishlistItems(JSON.parse(stored));
    };
    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

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
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 perfect-blur ${
        isScrolled ? "bg-white/90 shadow-lg py-2" : "bg-transparent py-4 md:py-6"
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
            <SheetContent side="left" className="w-[85%] p-0 border-none perfect-blur bg-white/95">
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
          <h1 className="text-[14px] min-[400px]:text-[16px] sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold tracking-tight md:tracking-widest uppercase text-slate-900 whitespace-nowrap text-center">
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
            <Link key={link.name} href={link.href} className="group relative text-[13px] font-bold text-slate-800 hover:text-[#b58b66] transition-colors tracking-widest uppercase">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#b58b66] transition-all duration-400 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4 w-[65px] md:w-auto justify-end">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 rounded-full hover:bg-slate-100/80 transition-colors text-slate-900 active:scale-90"
          >
            <Search className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          
          <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <SheetTrigger render={
              <button className="p-2.5 rounded-full hover:bg-slate-100/80 transition-colors text-slate-900 relative active:scale-90">
                <Heart className="h-5 w-5 md:h-6 md:w-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-[#b58b66] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            } />
            <SheetContent className="w-[90%] sm:w-[450px] p-0 border-none perfect-blur bg-white/95">
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

      {/* Premium Full-Screen Search - Hatke Design */}
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-xl flex flex-col items-center pt-32 px-6 overflow-y-auto hide-scrollbar"
        >
          <div className="w-full max-w-4xl">
            <div className="flex items-center justify-between mb-20">
              <span className="text-3xl font-serif font-black tracking-tighter text-slate-900">SEARCH</span>
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                className="group flex items-center gap-2 p-2 hover:bg-slate-100 rounded-full transition-all active:scale-90"
              >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 group-hover:text-slate-900 transition-colors">Close</span>
                <X className="h-8 w-8 text-slate-900" />
              </button>
            </div>

            <div className="relative mb-24">
              <input 
                autoFocus
                placeholder="What are you looking for?" 
                className="w-full bg-transparent border-none focus:ring-0 text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 placeholder:text-slate-100 p-0 mb-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="h-1.5 w-full bg-slate-900/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: searchQuery ? "100%" : "0%" }}
                  className="h-full bg-[#b58b66]"
                />
              </div>
            </div>

            {!searchQuery && (
              <div className="space-y-12">
                <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-slate-400">Popular Categories</p>
                <div className="flex flex-wrap gap-x-12 gap-y-8">
                  {categoriesInfo.map((cat) => (
                    <button 
                      key={cat.name}
                      onClick={() => setActiveSearchCategory(cat.name)}
                      className={`text-2xl md:text-4xl font-serif font-bold transition-all hover:text-[#b58b66] ${
                        activeSearchCategory === cat.name ? "text-[#b58b66] italic underline decoration-[#b58b66]/30 underline-offset-8" : "text-slate-300"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-12 mt-16 pb-20">
              {filteredResults.length > 0 ? (
                filteredResults.map((sub: any) => (
                  <Link 
                    key={sub.name} 
                    href={`/product/${productMap[sub.name.toLowerCase()] || "clothing"}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="group space-y-4"
                  >
                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-[#b58b66]/20">
                      <Image src={sub.image} alt={sub.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#b58b66] mb-1.5">{sub.category || activeSearchCategory}</p>
                      <h4 className="text-slate-900 font-bold text-base truncate transition-colors group-hover:text-[#b58b66]">{sub.name}</h4>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-2xl font-serif italic text-slate-300">No results found for your inspiration.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
