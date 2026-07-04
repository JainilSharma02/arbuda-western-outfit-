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

      {/* Optimized Floating Orbs - Balanced for Mobile */}
      <motion.div 
        animate={{ 
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full blur-[60px] md:blur-[100px] bg-[#EADDCD]/20 md:bg-[#EADDCD]/30 will-change-transform gpu"
      />
      <motion.div 
        animate={{ 
          x: [0, -20, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-5%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] bg-[#e6c8c1]/15 md:bg-[#e6c8c1]/25 border border-white/10 will-change-transform gpu"
      />

      {/* Simplified Decorative Elements - Desktop Only */}
      <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.02, 0.04, 0.02],
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute border border-[#b58b66]/10 rounded-[40px]"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              left: `${15 + i * 30}%`,
              top: `${20 + i * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Static Grain Texture - Very low opacity, hidden on slow devices if needed */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
    </div>
  );
}
