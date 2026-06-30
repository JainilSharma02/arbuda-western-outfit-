"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, Heart, ChevronDown, Trash2, ShoppingBag } from "lucide-react";

const categoriesInfo = [
  { 
    name: "Tops", 
    subcategories: [
      { name: "T-shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop" },
      { name: "Tank tops", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop" },
      { name: "Blouses", image: "https://images.unsplash.com/photo-1564222256577-45e728f1c5f1?q=80&w=600&auto=format&fit=crop" },
      { name: "Button-down shirts", image: "https://images.unsplash.com/photo-1598554747436-c000d43a010d?q=80&w=600&auto=format&fit=crop" },
      { name: "Sweaters", image: "https://images.unsplash.com/photo-1614301552345-06443c7bda1c?q=80&w=600&auto=format&fit=crop" },
      { name: "Cardigans", image: "https://images.unsplash.com/photo-1550294723-5e921d3f2191?q=80&w=600&auto=format&fit=crop" }
    ] 
  },
  { 
    name: "Bottoms", 
    subcategories: [
      { name: "Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop" },
      { name: "Trousers", image: "https://images.unsplash.com/photo-1594633312681-42037199c15a?q=80&w=600&auto=format&fit=crop" },
      { name: "Leggings", image: "https://images.unsplash.com/photo-1506629082955-520b69af7b0d?q=80&w=600&auto=format&fit=crop" },
      { name: "Skirts", image: "https://images.unsplash.com/photo-1583496661160-c588c443c982?q=80&w=600&auto=format&fit=crop" },
      { name: "Shorts", image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop" }
    ] 
  },
  { 
    name: "One-Piece Items", 
    subcategories: [
      { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" },
      { name: "Jumpsuits", image: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600&auto=format&fit=crop" },
      { name: "Rompers", image: "https://images.unsplash.com/photo-1515347619252-1c05d9e9abac?q=80&w=600&auto=format&fit=crop" }
    ] 
  },
  { 
    name: "Outerwear", 
    subcategories: [
      { name: "Blazers", image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop" },
      { name: "Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop" },
      { name: "Coats", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=600&auto=format&fit=crop" },
      { name: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-0a37f66ce869?q=80&w=600&auto=format&fit=crop" },
      { name: "Shrugs", image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop" }
    ] 
  },
  { 
    name: "Traditional Indian Wear", 
    subcategories: [
      { name: "Kurtas", image: "https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=600&auto=format&fit=crop" },
      { name: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop" },
      { name: "Salwar suits", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac662?q=80&w=600&auto=format&fit=crop" },
      { name: "Lehengas", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop" }
    ] 
  },
  { 
    name: "Innerwear & Loungewear", 
    subcategories: [
      { name: "Bras", image: "https://images.unsplash.com/photo-1617013840733-143890f5c1d6?q=80&w=600&auto=format&fit=crop" },
      { name: "Panties", image: "https://images.unsplash.com/photo-1555529733-0e6705d93333?q=80&w=600&auto=format&fit=crop" },
      { name: "Camisoles", image: "https://images.unsplash.com/photo-1550614000-4b95dd526563?q=80&w=600&auto=format&fit=crop" },
      { name: "Socks", image: "https://images.unsplash.com/photo-1586525198275-680c2f70b7ad?q=80&w=600&auto=format&fit=crop" },
      { name: "Nightsuits", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=600&auto=format&fit=crop" }
    ] 
  }
];
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export default function Navbar() {
  const [activeSearchCategory, setActiveSearchCategory] = useState<string>("Tops");
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

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
  
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10">
                <Link href="/" className="text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors">Summary</Link>
                <Link href="/new" className="text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors">New In</Link>
                <Link href="/clothing" className="text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors">Clothing</Link>
                <Link href="/dresses" className="text-lg font-medium text-slate-800 hover:text-[#b58b66] transition-colors">Dresses</Link>
                <Link href="/sale" className="text-lg font-medium text-red-600 hover:text-red-700 transition-colors">Sale</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-auto text-center md:flex-none md:text-left truncate px-1 sm:px-3">
          <h1 className="text-[16px] min-[390px]:text-[18px] sm:text-xl md:text-2xl font-serif font-bold tracking-wider md:tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-foreground via-[#b58b66] to-foreground">
            ARBUDA WESTERN OUTFIT<span className="text-[#b58b66]">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 mx-6">
          <Link href="/" className="text-sm font-medium text-slate-800 hover:text-[#b58b66] transition-colors">Summary</Link>
          <Link href="/new" className="text-sm font-medium text-slate-800 hover:text-[#b58b66] transition-colors">New In</Link>
          <Link href="/clothing" className="text-sm font-medium text-slate-800 hover:text-[#b58b66] transition-colors">Clothing</Link>
          <Link href="/dresses" className="text-sm font-medium text-slate-800 hover:text-[#b58b66] transition-colors">Dresses</Link>
          <Link href="/sale" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">Sale</Link>
        </nav>

        {/* Actions - Now visible on mobile! */}
        <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-4 md:flex-none w-auto md:w-auto min-w-[70px]">
          <Sheet>
            <SheetTrigger className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-md text-slate-800 hover:text-[#b58b66] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
              <Search className="h-[18px] w-[18px] md:h-5 md:w-5" />
              <span className="sr-only">Search</span>
            </SheetTrigger>
            <SheetContent side="top" className="w-full pt-20 pb-12 px-4 shadow-2xl bg-white border-b border-slate-100">
              <div className="container mx-auto max-w-5xl">
                
                {/* Search Input */}
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 mb-10 transition-colors focus-within:border-[#b58b66] focus-within:ring-2 focus-within:ring-[#b58b66]/20">
                  <Search className="w-6 h-6 text-slate-400 mr-4" />
                  <input 
                    type="text" 
                    placeholder="Search for Tops, Kurtas, Dresses..." 
                    className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400 text-lg sm:text-xl font-medium"
                    autoFocus
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                  {/* Category Sidebar */}
                  <div className="md:w-1/3 flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-2 pb-2 md:pb-0 pr-4 border-b md:border-b-0 md:border-r border-slate-100 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {categoriesInfo.map(cat => (
                      <button 
                        key={cat.name}
                        onClick={() => setActiveSearchCategory(cat.name)}
                        className={`text-left whitespace-nowrap px-6 py-3.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-between ${activeSearchCategory === cat.name ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                      >
                        {cat.name}
                        <ChevronDown className={`w-4 h-4 ml-4 md:rotate-[-90deg] transition-transform ${activeSearchCategory === cat.name ? 'rotate-180 md:rotate-0 text-[#b58b66]' : 'opacity-0 md:opacity-100'}`} />
                      </button>
                    ))}
                  </div>

                  {/* Subcategories Grid */}
                  <div className="md:w-2/3 pt-2 md:pt-4 md:pl-6 min-h-[250px]">
                    <h3 className="text-sm uppercase tracking-wider font-bold text-slate-400 mb-6 flex items-center">
                      <span className="w-8 h-px bg-slate-200 mr-3"></span>
                      Showing {activeSearchCategory}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      {categoriesInfo.find(c => c.name === activeSearchCategory)?.subcategories.map(sub => (
                        <Link 
                          href={`/category/${sub.name.toLowerCase().replace(/\s+/g, '-')}`}
                          key={sub.name} 
                          className="group relative rounded-2xl border border-slate-100 bg-white hover:border-[#b58b66] hover:shadow-[0_8px_30px_rgb(181,139,102,0.18)] transition-all overflow-hidden flex flex-col items-start"
                        >
                          {/* Image Box */}
                          <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                            <Image 
                              src={sub.image} 
                              alt={sub.name}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          
                          {/* Label */}
                          <div className="w-full flex justify-between items-center p-4">
                            <span className="text-slate-700 font-semibold group-hover:text-[#b58b66] transition-colors line-clamp-1">{sub.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </SheetContent>
          </Sheet>
          <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
            <SheetTrigger className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-md text-foreground hover:text-[#b58b66] hover:bg-accent hover:text-accent-foreground transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
              <Heart className="h-[18px] w-[18px] md:h-5 md:w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-background" />
              )}
              <span className="sr-only">Wishlist</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[450px] p-6 sm:p-8 overflow-y-auto bg-gradient-to-br from-[#fefcfb] via-[#fcf6f0] to-[#f4e2d3] border-l border-white/50 shadow-2xl">
              {/* Decorative Subtle Texture/Pattern */}
              <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b58b66 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
              
              <div className="relative z-10 flex items-center justify-between mb-8 pb-5 border-b border-[#b58b66]/10">
                <h2 className="text-3xl font-serif font-bold text-slate-800 tracking-tight">
                  Wishlist<span className="text-[#b58b66]">.</span>
                </h2>
                <span className="px-3 py-1 bg-[#b58b66]/10 text-[#b58b66] text-[10px] font-bold rounded-full uppercase tracking-widest backdrop-blur-sm border border-[#b58b66]/20">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>

              {wishlistItems.length === 0 ? (
                <div className="relative z-10 flex flex-col items-center justify-center h-[50vh] text-center">
                  <div className="w-24 h-24 mb-6 rounded-full bg-white/60 flex items-center justify-center shadow-[0_0_40px_rgba(181,139,102,0.15)] border border-white">
                    <Heart className="w-10 h-10 text-[#b58b66]/40" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-slate-700 mb-2">No favorites yet</h3>
                  <p className="text-[#b58b66] font-medium text-sm">Discover pieces you'll love.</p>
                </div>
              ) : (
                <div className="relative z-10 flex flex-col gap-5 pb-10">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="group relative flex gap-4 items-center bg-white/70 backdrop-blur-3xl p-3 sm:p-4 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white hover:shadow-[0_20px_40px_rgba(181,139,102,0.12)] hover:-translate-y-1 transition-all duration-500 overflow-hidden isolate">
                      
                      {/* Entire card is a link that also closes the sheet */}
                      <Link 
                        href={`/product/${item.id}`} 
                        className="absolute inset-0 z-0 cursor-pointer" 
                        aria-label={`View ${item.name}`}
                        onClick={() => setIsWishlistOpen(false)}
                      ></Link>

                      {/* Hover gradient effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#b58b66]/0 via-[#b58b66]/5 to-[#b58b66]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"></div>
                      
                      <div className="relative w-24 h-28 sm:w-28 sm:h-32 rounded-[16px] overflow-hidden flex-shrink-0 bg-slate-50 border border-white shadow-inner pointer-events-none">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" />
                      </div>
                      
                      <div className="flex-1 min-w-0 pr-1 py-1 flex flex-col justify-center h-full pointer-events-none">
                        <h3 className="block font-serif font-bold text-[16px] sm:text-[18px] leading-tight line-clamp-2 text-slate-800 group-hover:text-[#b58b66] transition-colors mb-2">{item.name}</h3>
                        <p className="text-[14px] sm:text-[15px] font-bold text-[#b58b66] bg-[#b58b66]/10 px-3 py-1 rounded-lg w-fit">₹{item.price}</p>
                      </div>
                      
                      {/* Buttons need higher z-index and pointer-events-auto to sit above the absolute Link */}
                      <div className="flex flex-col gap-2.5 items-center justify-center z-10 relative pointer-events-auto pr-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 text-white bg-gradient-to-br from-[#c9a37e] to-[#b58b66] hover:from-[#b58b66] hover:to-[#9a7653] shadow-md hover:shadow-lg rounded-full transition-all duration-300 hover:scale-110"
                          onClick={() => {
                            const message = `Hi, I want to purchase the *${item.name}* - Price: ₹${item.price}. I found this from my wishlist.`;
                            window.open(`https://wa.me/919427673886?text=${encodeURIComponent(message)}`, '_blank');
                          }}
                        >
                          <ShoppingBag className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px]" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 text-slate-400 hover:text-red-500 hover:bg-red-50 bg-white rounded-full transition-all duration-300 shadow-sm border border-slate-100 hover:border-red-100 hover:scale-105"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Trash2 className="h-[18px] w-[18px] sm:h-[18px] sm:w-[18px]" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}
