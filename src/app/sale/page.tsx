import Link from "next/link";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Exclusive Edit | Premium Women's Fashion Sale",
  description: "Browse our exclusive edit of handpicked women's outfits at Arbuda Western. Discover curated coordinates, designer dresses, and kurtis.",
  alternates: {
    canonical: "/sale",
  }
};

export default function SalePage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-6xl text-center mb-12">
        <div className="inline-block bg-[#b58b66]/10 text-[#b58b66] px-4 py-1.5 rounded-full font-bold text-xs tracking-[0.2em] uppercase mb-6 border border-[#b58b66]/20 shadow-sm">
          Luxury Collections
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
          The <span className="italic text-[#b58b66]">Exclusive</span> Edit
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Curated elegance for the modern woman. Discover our finest pieces selected for their timeless style and unmatched quality.
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
