"use client";

import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#fafafa] [perspective:1500px]">
      {/* Dynamic 3D Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(#b58b66 1px, transparent 1px), linear-gradient(90deg, #b58b66 1px, transparent 1px)',
          backgroundSize: '100px 100px',
          transform: 'rotateX(60deg) translateY(-20%) scale(2)',
          transformOrigin: 'top center'
        }} 
      />

      {/* Floating 3D Orbs - Optimized with Translate3d */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotateZ: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full blur-[120px] bg-[#EADDCD]/40 mix-blend-multiply transition-transform translate-z-0"
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[150px] bg-[#e6c8c1]/30 mix-blend-multiply translate-z-0"
      />

      {/* Floating 3D Glass Cards (Subtle Parallax) */}
      <div className="absolute inset-0 [transform-style:preserve-3d]">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.02, 0.05, 0.02],
              z: [i * 20, (i * 20) + 40, i * 20],
              y: [0, -20, 0]
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute border border-[#b58b66]/10 rounded-3xl"
            style={{
              width: `${150 + i * 50}px`,
              height: `${150 + i * 50}px`,
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              backdropFilter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      {/* Premium Grain Texture */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }} />
    </div>
  );
}
