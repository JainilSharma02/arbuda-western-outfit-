"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MousePointer2 } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  return (
    <section ref={containerRef} className="relative h-[85vh] md:h-[90vh] min-h-[600px] w-full bg-slate-900 flex items-center justify-center overflow-hidden [perspective:1000px]">
      {/* Background Image - Absolute with Optimized Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat gpu"
        style={{ 
          backgroundImage: "url('/images/hero_ai.png')",
          y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
        }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
        {/* Subtle Mesh Gradient for 'Hatke' feel */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(181,139,102,0.15),transparent_50%)]" />
      </motion.div>

      <motion.div 
        style={{ y: titleY }}
        className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center gpu"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 md:mb-8"
        >
          <span className="inline-block py-1.5 px-5 rounded-full bg-secondary/90 backdrop-blur-sm text-secondary-foreground text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg border border-white/20">
            Arbuda Western Outfit ✦ Collection 2026
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 md:mb-8 tracking-tight drop-shadow-2xl max-w-4xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Elevate Your <br />
          Everyday Style<span className="text-[#b58b66]">.</span>
        </motion.h1>
        
        <motion.p 
          className="text-sm sm:text-base md:text-xl text-white/90 mb-10 md:mb-12 max-w-2xl font-medium tracking-wide leading-relaxed px-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Discover curated collections designed for the modern woman. <br className="hidden md:block" />
          Embrace luxury, comfort, and timeless elegance.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Button size="lg" className="bg-white text-black hover:bg-[#b58b66] hover:text-white text-base h-14 md:h-16 px-8 md:px-10 rounded-full shadow-2xl transition-all border-none font-bold active:scale-95">
            Shop New Arrivals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Decorative 3D elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotateZ: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] left-[10%] w-32 h-32 border border-white/10 rounded-full hidden lg:block"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotateZ: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[10%] w-48 h-48 border border-white/5 rounded-full hidden lg:block"
      />

      {/* Premium Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#b58b66] to-transparent" />
      </motion.div>
    </section>
  );
}
