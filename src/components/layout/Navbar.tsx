"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Search, User, Menu, Heart, ChevronDown } from "lucide-react";

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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [activeSearchCategory, setActiveSearchCategory] = useState<string>("Tops");
  
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
        <Link href="/" className="flex-1 md:flex-none text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-foreground via-[#b58b66] to-foreground">
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

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger className="hidden sm:flex h-10 w-10 items-center justify-center rounded-md text-slate-800 hover:text-[#b58b66] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
              <Search className="h-5 w-5" />
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
          <Button variant="ghost" size="icon" className="hidden sm:flex text-slate-800 hover:text-[#b58b66] hover:bg-slate-100">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-800 hover:text-[#b58b66] hover:bg-slate-100">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-800 hover:text-[#b58b66] hover:bg-slate-100 relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
