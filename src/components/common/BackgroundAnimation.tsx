"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#fafafa]">
      {/* Dynamic 3D Grid Overlay - Simplified */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: 'linear-gradient(#b58b66 1px, transparent 1px), linear-gradient(90deg, #b58b66 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-10%) scale(2)',
          transformOrigin: 'top center'
        }} 
      />

      {/* Optimized Floating Orbs - Fewer and larger for better performance */}
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[100px] bg-[#EADDCD]/30 mix-blend-multiply will-change-transform"
      />
      <motion.div 
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[120px] bg-[#e6c8c1]/25 mix-blend-multiply will-change-transform"
      />

      {/* Simplified Decorative Elements - Removed expensive backdrop-blur */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.03, 0.06, 0.03],
              y: [0, -30, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute border border-[#b58b66]/5 rounded-[40px] bg-white/[0.05]"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${10 + i * 25}%`,
              top: `${15 + i * 20}%`,
              transform: `translateZ(${i * 10}px)`
            }}
          />
        ))}
      </div>

      {/* Static Grain Texture - Very low opacity */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
    </div>
  );
}
