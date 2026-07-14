"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
        name: "Cort set",
        items: [
          { name: "cort set with pocket", image: "/images/cort set 1.jpeg" }
        ]
      }
    ] 
  },
  {
    name: "Western",
    sections: [
      {
        name: "Jeans",
        items: [
          { name: "Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format" }
        ]
      },
      {
        name: "Lower",
        items: [
          { name: "Lower", image: "https://images.unsplash.com/photo-1506629082955-520b69af7b0d?q=80&w=600&auto=format" }
        ]
      },
      {
        name: "Night Wear",
        items: [
          { name: "Night Wear", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format" }
        ]
      },
      {
        name: "T Shirt",
        items: [
          { name: "t shirt", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format" }
        ]
      },
      {
        name: "Top",
        items: [
          { name: "Top", image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=600&auto=format" }
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

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && pathname) {
      if (!pathname.startsWith("/product/")) {
        sessionStorage.setItem("prevPath", pathname);
      }
    }
  }, [pathname]);

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
    "t shirt": "western",
    "top": "western"
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
    const message = `Hello Arbuda Western! ✨\n\nI want to buy this:\n\nProduct : ${item.name}\nPrice : ₹${item.price}\nSize : M\n\nPlease help me with the order!`;
    window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "py-1 md:py-2" 
          : "bg-transparent py-4 md:py-6"
      }`}
      style={isScrolled ? {
        background: "linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(245,238,230,0.78) 50%, rgba(255,255,255,0.82) 100%)",
        backdropFilter: "blur(24px) saturate(180%) brightness(1.05)",
        WebkitBackdropFilter: "blur(24px) saturate(180%) brightness(1.05)",
        borderBottom: "1px solid rgba(181,139,102,0.18)",
        boxShadow: "0 4px 32px -4px rgba(181,139,102,0.18), 0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(181,139,102,0.08) inset",
      } : undefined}
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
                    { name: "Exclusive Edit", href: "/clothing", icon: "👑" }
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
          <h1 className="text-[12px] min-[330px]:text-[13px] sm:text-xl md:text-2xl lg:text-3xl font-serif font-black tracking-tighter md:tracking-widest uppercase text-black whitespace-nowrap text-center transition-all duration-300">
            ARBUDA <span className="text-[#b58b66]">WESTERN</span> OUTFIT
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 mx-10">
          {[
            { name: "Summary", href: "/" },
            { name: "Luxury Edit", href: "/clothing" }
          ].map((link) => (
            <Link key={link.name} href={link.href} className="group relative text-[14px] font-black text-black hover:text-[#b58b66] transition-colors tracking-widest uppercase">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#b58b66] transition-all duration-400 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-4 min-w-[90px] md:w-auto justify-end">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2.5 rounded-full hover:bg-slate-100 transition-colors text-black active:scale-90"
          >
            <Search className="h-5 w-5 md:h-6 md:w-6" style={{ strokeWidth: 2.5 }} />
          </button>
          
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

    {/* Premium Sidebar Search Overlay - Moved outside header for proper stacking context */}
    <AnimatePresence mode="wait">
      {isSearchOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col overflow-hidden"
        >
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="flex flex-col h-full relative"
          >
            {/* Luxury Background Accents */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#b58b66]/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-[#EADDCD]/20 rounded-full blur-[150px]" />
            </div>

            {/* Close Button - Top Right */}
            <button 
              onClick={() => { 
                setIsSearchOpen(false); 
                setSearchQuery("");
                setActiveSearchCategory(""); 
              }}
              className="absolute top-6 right-6 z-[120] p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-all group shadow-sm active:scale-90"
            >
              <X className="h-6 w-6 md:h-8 md:w-8 text-slate-900 group-hover:rotate-90 transition-transform" />
            </button>


            {/* Search Content Wrapper */}
            <div className="flex-1 flex flex-col pt-24 md:pt-32 relative z-10 overflow-hidden">
              
              {/* STICKY TOP SEARCH BAR - 'Hatke' & Premium */}
              <div className="w-full max-w-4xl mx-auto px-6 mb-8">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#b58b66] to-[#EADDCD] rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
                  <div className="relative flex items-center bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm group-focus-within:shadow-xl transition-all duration-500">
                    <div className="pl-6 pr-4">
                      <Search className="h-5 w-5 text-[#b58b66]" style={{ strokeWidth: 2.5 }} />
                    </div>
                    <input 
                      type="text"
                      placeholder="What are you looking for?"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full py-5 md:py-6 bg-transparent text-sm md:text-base font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery("")}
                        className="p-4 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row h-full overflow-hidden">
                
                {/* CATEGORIES SIDEBAR */}
                <div className={`w-full md:w-[350px] flex flex-col px-6 md:px-10 overflow-y-auto hide-scrollbar transition-all duration-500 bg-white ${(activeSearchCategory || searchQuery) ? "hidden md:flex" : "flex"}`}>
                  <div className="flex justify-between items-center mb-6 px-4">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Quick Filter</h3>
                  </div>
                  
                  <div className="flex flex-col gap-12 pb-20">
                    {categoriesInfo.map((cat) => (
                      <div key={cat.name} className="flex flex-col gap-6">
                        <h4 className="px-4 text-[11px] font-black text-[#b58b66] uppercase tracking-[0.2em]">{cat.name}</h4>
                        <div className="flex flex-col gap-2">
                          {cat.sections.map((sec) => (
                            <button 
                              key={sec.name}
                              onClick={() => { setActiveSearchCategory(sec.name); setSearchQuery(""); }}
                              className={`flex items-center justify-between w-full px-6 py-5 rounded-[2rem] text-sm font-black transition-all active:scale-95 ${
                                activeSearchCategory === sec.name && !searchQuery
                                ? "bg-[#1a202c] text-white shadow-2xl" 
                                : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <span className="tracking-wide">{sec.name}</span>
                              <ArrowRight className={`h-4 w-4 transition-transform ${activeSearchCategory === sec.name && !searchQuery ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RESULTS CONTENT (Slides in on mobile, split on desktop) */}
                <div className={`flex-1 flex flex-col px-6 md:px-12 overflow-y-auto hide-scrollbar bg-[#fafafa]/30 transition-all duration-500 ${!activeSearchCategory && !searchQuery && "hidden md:flex"}`}>
                  
                  {/* Category Header with Back Button (Mobile Only) */}
                  <div className="max-w-4xl w-full mx-auto mb-10 md:mb-16">
                    <button 
                      onClick={() => { setActiveSearchCategory(""); setSearchQuery(""); }}
                      className="md:hidden flex items-center text-[#b58b66] text-[10px] font-black uppercase tracking-widest mb-8 no-tap-highlight"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Collections
                    </button>

                    <h2 className="text-3xl md:text-7xl font-serif font-black text-slate-900 mb-2 md:mb-4 tracking-tighter">
                      {searchQuery ? `Searching: ${searchQuery}` : activeSearchCategory}<span className="text-[#b58b66]">.</span>
                    </h2>
                    <p className="text-[10px] md:text-xs text-[#b58b66] font-black uppercase tracking-[0.3em] flex items-center">
                      <span className="w-2 h-2 rounded-full bg-[#b58b66] mr-3 animate-pulse" />
                      {filteredResults.length} {filteredResults.length === 1 ? 'Exquisite Masterpiece' : 'Exquisite Masterpieces'} Found
                    </p>
                    <div className="h-[2px] w-12 md:w-24 bg-slate-900 mt-6" />
                  </div>

                  {/* Results Grid */}
                  <div className="max-w-6xl w-full mx-auto pb-40">
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-10">
                      {filteredResults.length > 0 ? (
                        filteredResults.map((sub: any) => (
                          <Link 
                            key={sub.name} 
                            href={productMap[sub.name.toLowerCase()] ? (productMap[sub.name.toLowerCase()].length > 5 ? productMap[sub.name.toLowerCase()] : `/product/${productMap[sub.name.toLowerCase()]}`) : "/clothing"}
                            onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                            className="group active:scale-95 transition-transform no-tap-highlight"
                          >
                            <div className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 mb-4 md:mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-700 border border-slate-200">
                              <Image src={sub.image} alt={sub.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" unoptimized />
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="px-1">
                              <p className="text-[9px] font-bold text-[#b58b66] uppercase tracking-[0.2em] mb-1 opacity-70">
                                {(sub as any)?.sectionName || activeSearchCategory}
                              </p>
                              <h4 className="text-slate-900 font-black text-xs md:text-base lg:text-lg truncate group-hover:text-[#b58b66] transition-colors">{sub.name}</h4>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-full py-20 md:py-32 flex flex-col items-center text-center">
                          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <SearchX className="h-10 w-10 text-slate-300" />
                          </div>
                          <p className="text-xl md:text-3xl font-serif italic text-slate-300 mb-6 px-4">We couldn't find any pieces matching your request</p>
                          <button 
                            onClick={() => { setSearchQuery(""); setActiveSearchCategory(""); }} 
                            className="px-8 py-3 bg-[#1a1f2c] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#b58b66] transition-colors shadow-xl"
                          >
                            Browse Collections
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
