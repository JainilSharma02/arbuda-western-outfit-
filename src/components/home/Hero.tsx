"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background Image - Absolute */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-70"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')" }}
      >
        {/* Subtle Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-widest uppercase mb-6">
            Spring/Summer 2026
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-sm max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Elevate Your Everyday Style.
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light drop-shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Discover curated collections designed for the modern woman. Embrace luxury, comfort, and timeless elegance.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button size="lg" className="bg-white text-black hover:bg-white/90 text-base h-14 px-8 rounded-full shadow-xl">
            Shop New Arrivals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
