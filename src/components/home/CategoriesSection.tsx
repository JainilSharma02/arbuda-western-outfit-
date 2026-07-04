"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Fusion Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop",
    href: "/dresses",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    name: "Ethnic Sets",
    image: "https://images.unsplash.com/photo-1583391733958-d25e07fac662?q=80&w=1974&auto=format&fit=crop",
    href: "/dresses",
  },
  {
    name: "Handicraft Bags",
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop",
    href: "/dresses",
    className: "md:col-span-2",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
              Curated <span className="italic text-[#b58b66]">Collections</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Explore our hand-picked selections of premium western attire, designed to elevate your everyday elegance.
            </p>
          </div>
          <Link href="/clothing" className="group flex items-center gap-2 text-slate-900 font-bold uppercase tracking-widest text-sm border-b-2 border-slate-900 pb-1 hover:text-[#b58b66] hover:border-[#b58b66] transition-all">
            View All Styles 
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
          {categories.map((category, index) => (
            <Link 
              key={category.name} 
              href={category.href}
              className={`group relative overflow-hidden rounded-[2rem] block shadow-2xl shadow-slate-200/50 ${category.className || ""}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-end p-10">
                <h3 className="text-white text-2xl font-serif font-bold mb-4 translate-y-2 transition-transform duration-500 group-hover:translate-y-0 text-center">
                  {category.name}
                </h3>
                <span className="bg-white/95 backdrop-blur-md text-slate-900 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
