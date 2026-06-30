"use client";

import Link from "next/link";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function SalePage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-6xl text-center mb-12">
        <div className="inline-block bg-red-100 text-red-600 px-4 py-1.5 rounded-full font-bold text-sm tracking-widest uppercase mb-6">
          Clearance Sale
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
          Up to 50% Off ✨
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Stock up on your absolute favorites at unbeatable prices. The Arbuda exclusive seasonal sale is officially live.
        </p>
      </div>
      
      {/* Reusing existing component for quick layout */}
      <FeaturedProducts />
      
      <div className="flex justify-center mt-12">
        <Link href="/clothing" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors">
          Explore All Categories Instead
        </Link>
      </div>
    </div>
  );
}
