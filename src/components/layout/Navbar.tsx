"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, Heart, ChevronDown, Trash2, ShoppingBag } from "lucide-react";
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

  // Comprehensive mapping for all categories to ensure proper product opening
  const productMap: Record<string, string> = {
    // Traditional
    "3 piece": "5",
    "peacock patten": "777",
    "short kurti": "888",
    "2 piece": "555",
    // Western Collection
    "T-shirts": "101",
    "Tops": "103",
    "Jeans": "201",
    "Lowers": "202",
    "Cortset": "301",
    "Night Wear": "605"
  };

  const updatedCategories = categoriesInfo;

  // Search Logic
  const allSubcategories = updatedCategories.flatMap(cat => 
    cat.subcategories.map(sub => ({ ...sub, parentCategory: cat.name }))
  );

  const filteredResults = searchQuery.trim() === "" 
    ? [] 
    : allSubcategories.filter(sub => 
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        sub.parentCategory.toLowerCase().includes(searchQuery.toLowerCase())
      );

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
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center justify-start w-[65px]">
          <Sheet open={!!isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-slate-100 h-10 w-10 text-slate-900 border border-slate-200 shadow-sm">
              <Menu className="h-[18px] w-[18px]" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] sm:w-[400px] p-0 border-r-0 glass">
              <div className="flex flex-col h-full bg-white/20 backdrop-blur-xl gpu">
                <div className="p-8 border-b border-[#b58b66]/10 bg-white/40">
                  <h2 className="text-2xl font-serif font-bold tracking-tighter text-slate-900">Arbuda</h2>
                  <p className="text-[10px] text-[#b58b66] font-bold tracking-widest uppercase mt-1">Western Outfit</p>
                </div>

                <nav className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-5 py-4 rounded-2xl bg-white/60 backdrop-blur hover:bg-white text-[17px] font-bold text-slate-800 hover:text-[#b58b66] border border-white shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all">
                    Home
                  </Link>
                  
                  <div className="h-px w-full bg-[#b58b66]/10 my-2"></div>
                  
                  <Link href="/new" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-between items-center px-5 py-4 rounded-2xl bg-gradient-to-r from-[#b58b66]/10 to-transparent hover:from-[#b58b66]/20 text-[17px] font-bold text-[#b58b66] border border-[#b58b66]/20 shadow-sm transition-all">
                    <span>New Arrivals</span>
                    <span className="text-xl">✨</span>
                  </Link>
                  <Link href="/clothing" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-between items-center px-5 py-4 rounded-2xl bg-[#b58b66]/5 hover:bg-[#b58b66]/10 text-[17px] font-bold text-slate-800 border border-[#b58b66]/10 shadow-sm transition-all">
                    <span>Exclusive Edit</span>
                    <span className="text-xl">👑</span>
                  </Link>
                  <Link href="/dresses" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-between items-center px-5 py-4 rounded-2xl bg-white/60 hover:bg-white text-[17px] font-bold text-slate-800 border border-white shadow-sm transition-all">
                    <span>Dresses</span>
                    <span className="text-xl">👗</span>
                  </Link>
                  <Link href="/clothing" onClick={() => setIsMobileMenuOpen(false)} className="flex justify-between items-center px-5 py-4 rounded-2xl bg-white/60 hover:bg-white text-[17px] font-bold text-slate-800 border border-white shadow-sm transition-all">
                    <span>Western</span>
                    <span className="text-xl">💃</span>
                  </Link>
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

        {/* Logo */}
        <Link href="/" className="flex-1 flex justify-center md:flex-none md:justify-start px-0 overflow-visible relative">
          <h1 className="text-[12px] min-[360px]:text-[14px] min-[400px]:text-[16px] sm:text-xl md:text-2xl font-serif font-bold tracking-tighter sm:tracking-normal md:tracking-widest uppercase text-slate-900 whitespace-nowrap text-center">
            ARBUDA <span className="text-[#b58b66]">WESTERN</span> OUTFIT
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 mx-6">
          <Link href="/" className="group relative text-sm font-bold text-slate-800 hover:text-[#b58b66] transition-colors">
            Summary
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b58b66] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/clothing" className="group relative text-sm font-bold text-slate-800 hover:text-[#b58b66] transition-colors">
            Luxury Edit
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b58b66] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/dresses" className="group relative text-sm font-bold text-slate-800 hover:text-[#b58b66] transition-colors">
            Dresses
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b58b66] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link href="/clothing" className="group relative text-sm font-bold text-slate-800 hover:text-[#b58b66] transition-colors">
            Western
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b58b66] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end md:gap-4 md:flex-none w-[65px]">
          <Sheet open={!!isSearchOpen} onOpenChange={(open) => {
            setIsSearchOpen(open);
            if (!open) setSearchQuery(""); 
          }}>
            <SheetTrigger className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-md text-slate-800 hover:text-[#b58b66] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
              <Search className="h-[18px] w-[18px] md:h-5 md:w-5" />
              <span className="sr-only">Search</span>
            </SheetTrigger>
            <SheetContent side="top" className="w-full pt-20 pb-12 px-4 shadow-2xl bg-white border-b border-slate-100 h-screen overflow-y-auto">
              <div className="container mx-auto max-w-5xl">
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 mb-10 transition-colors focus-within:border-[#b58b66] focus-within:ring-2 focus-within:ring-[#b58b66]/20">
                  <Search className="w-6 h-6 text-slate-400 mr-4" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for Tops, Kurtas, Dresses..." 
                    className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400 text-lg sm:text-xl font-medium"
                    autoFocus
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200/50 px-2 py-1 rounded-md">Clear</button>
                  )}
                </div>

                {searchQuery.trim() !== "" ? (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-sm uppercase tracking-wider font-bold text-[#b58b66] mb-6 flex items-center">
                      <span className="w-8 h-px bg-[#b58b66]/30 mr-3"></span>
                      Search Results ({filteredResults.length})
                    </h3>
                    {filteredResults.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredResults.map(sub => {
                          const targetId = productMap[sub.name] || "1";
                          return (
                            <Link 
                              href={`/product/${targetId}`}
                              key={`${sub.parentCategory}-${sub.name}`} 
                              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                              className="group relative rounded-2xl border border-slate-100 bg-white hover:border-[#b58b66] hover:shadow-[0_8px_30px_rgb(181,139,102,0.18)] transition-all overflow-hidden flex flex-col items-start"
                            >
                              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                                <Image src={sub.image} alt={sub.name} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/10 backdrop-blur-sm rounded-md text-[8px] uppercase font-bold text-black/60">{sub.parentCategory}</div>
                              </div>
                              <div className="w-full flex justify-between items-center p-3">
                                <span className="text-slate-700 text-xs font-bold group-hover:text-[#b58b66] transition-colors truncate">{sub.name}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-20 text-center text-slate-400">No items found for "{searchQuery}"</div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 pr-4 border-b md:border-b-0 md:border-r border-slate-100 hide-scrollbar">
                      {updatedCategories.map(cat => (
                        <button 
                          key={cat.name}
                          onClick={() => setActiveSearchCategory(cat.name)}
                          className={`text-left whitespace-nowrap px-6 py-3.5 rounded-xl font-medium transition-all ${activeSearchCategory === cat.name ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                          {cat.name}
                          <ChevronDown className={`w-4 h-4 ml-4 md:rotate-[-90deg] transition-transform ${activeSearchCategory === cat.name ? 'rotate-180 md:rotate-0 text-[#b58b66]' : 'opacity-0 md:opacity-100'}`} />
                        </button>
                      ))}
                    </div>
                    <div className="md:w-2/3 pt-2 md:pt-4 md:pl-6 min-h-[250px]">
                      <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-6 flex items-center">
                        <span className="w-8 h-px bg-slate-200 mr-3"></span>
                        Showing {activeSearchCategory}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        {updatedCategories.find(c => c.name === activeSearchCategory)?.subcategories.map(sub => {
                          const targetId = productMap[sub.name] || "1";
                          return (
                            <Link 
                              href={`/product/${targetId}`}
                              key={sub.name} 
                              onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                              className="group relative rounded-2xl border border-slate-100 bg-white hover:border-[#b58b66] hover:shadow-[0_8px_30px_rgb(181,139,102,0.18)] transition-all overflow-hidden flex flex-col items-start"
                            >
                              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                                <Image src={sub.image} alt={sub.name} fill unoptimized className="object-cover transition-transform duration-700 group-hover:scale-110" />
                              </div>
                              <div className="w-full flex justify-between items-center p-4">
                                <span className="text-slate-700 font-semibold group-hover:text-[#b58b66] transition-colors line-clamp-1">{sub.name}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          <Sheet open={!!isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <SheetTrigger className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-md text-foreground hover:text-[#b58b66] hover:bg-accent transition-colors relative">
              <Heart className="h-[18px] w-[18px] md:h-5 md:w-5" />
              {wishlistItems.length > 0 && <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-background" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[450px] p-6 sm:p-8 overflow-y-auto bg-gradient-to-br from-[#fefcfb] via-[#fcf6f0] to-[#f4e2d3] border-l border-white/50 shadow-2xl">
              <div className="relative z-10 flex items-center justify-between mb-8 pb-5 border-b border-[#b58b66]/10">
                <h2 className="text-3xl font-serif font-bold text-slate-800 tracking-tight">Wishlist<span className="text-[#b58b66]">.</span></h2>
                <span className="px-3 py-1 bg-[#b58b66]/10 text-[#b58b66] text-[10px] font-bold rounded-full uppercase tracking-widest border border-[#b58b66]/20">{wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}</span>
              </div>
              {wishlistItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center text-slate-400">
                  <Heart className="w-10 h-10 mb-4 opacity-50" />
                  <p className="font-serif italic font-medium">No favorites yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="group relative flex gap-4 items-center bg-white/70 p-3 rounded-[24px] shadow-sm border border-white hover:shadow-lg transition-all">
                      <Link href={`/product/${item.id}`} className="absolute inset-0 z-0" onClick={() => setIsWishlistOpen(false)}></Link>
                      <div className="w-20 h-24 rounded-[16px] overflow-hidden flex-shrink-0 bg-slate-50 border border-white">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div className="flex-1 min-w-0 pr-1">
                        <h3 className="font-serif font-bold text-sm leading-tight line-clamp-1 text-slate-800 mb-2">{item.name}</h3>
                        <p className="text-xs font-bold text-[#b58b66] bg-[#b58b66]/10 px-2.5 py-1 rounded-md w-fit">₹{item.price}</p>
                      </div>
                      <div className="flex flex-col gap-2 relative z-10">
                        <Button variant="ghost" size="icon" className="w-9 h-9 text-white bg-[#b58b66] rounded-full" onClick={() => handleBuy(item)}><ShoppingBag size={16} /></Button>
                        <Button variant="ghost" size="icon" className="w-9 h-9 text-slate-400 hover:text-red-500" onClick={() => removeFromWishlist(item.id)}><Trash2 size={16} /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {/* Scroll Progress Bar - Premium Touch */}
      <motion.div 
        className="h-[2px] bg-[#b58b66] origin-left z-50"
        style={{ scaleX }}
      />
    </header>
  );
}
