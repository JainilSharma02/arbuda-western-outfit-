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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selections and find the perfect pieces for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
          {categories.map((category, index) => (
            <Link 
              key={category.name} 
              href={category.href}
              className={`group relative overflow-hidden rounded-2xl block ${category.className || ""}`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                <span className="bg-white/90 backdrop-blur-sm text-foreground px-8 py-3 rounded-full font-medium tracking-wide translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
