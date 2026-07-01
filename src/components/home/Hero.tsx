"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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
    <section ref={containerRef} className="relative h-[90vh] min-h-[650px] w-full bg-slate-900 flex items-center justify-center overflow-hidden [perspective:2000px]">
      {/* Background Image - Absolute with 3D Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop')",
          scale: bgScale,
          z: -100
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </motion.div>

      <motion.div 
        style={{ y: titleY, rotateX: titleRotate, transformStyle: "preserve-3d" }}
        className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block py-1.5 px-5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold tracking-[0.2em] uppercase shadow-xl">
            Spring/Summer 2026
          </span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 tracking-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-4xl"
          initial={{ opacity: 0, z: -100, rotateX: -10 }}
          animate={{ opacity: 1, z: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          Elevate Your <br />
          Everyday Style<span className="text-secondary">.</span>
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-xl text-white mb-12 max-w-2xl font-medium tracking-wide leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Discover curated collections designed for the modern woman. <br className="hidden md:block" />
          Embrace luxury, comfort, and timeless elegance.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, translateZ: 50 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <Button size="lg" className="bg-white text-black hover:bg-secondary hover:text-secondary-foreground text-base h-16 px-10 rounded-full shadow-2xl transition-all border-none font-bold">
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
    </section>
  );
}
