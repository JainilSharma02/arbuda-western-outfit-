"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SocialPopups() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop Version */}
          <motion.div 
            className="fixed bottom-8 right-8 z-50 hidden md:flex flex-col gap-5 gpu"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link
              href="https://www.instagram.com/arbuda_western_outfit_end_dres?igsh=bTAyZTJzazk5NHo1"
              target="_blank"
              className="group relative flex items-center justify-center w-14 h-14 bg-white border border-slate-100 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-500" />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="z-10 transition-colors duration-500 group-hover:text-white">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span className="absolute right-16 bg-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap shadow-xl border border-slate-50 pointer-events-none translate-x-4 group-hover:translate-x-0">
                Instagram
              </span>
            </Link>
            
            <Link
              href="https://wa.me/919427673886"
              target="_blank"
              className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_rgba(37,211,102,0.4)] transition-all duration-500 hover:-translate-y-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
              </svg>
              <span className="absolute right-16 bg-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap shadow-xl border border-slate-50 pointer-events-none translate-x-4 group-hover:translate-x-0 text-slate-800">
                WhatsApp
              </span>
            </Link>
          </motion.div>

          {/* Mobile Version - Very subtle and premium */}
          <motion.div 
            className="fixed bottom-24 left-6 z-[60] md:hidden gpu"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
          >
            <Link
              href="https://wa.me/919427673886"
              target="_blank"
              className="flex items-center justify-center w-12 h-12 bg-[#25D366] rounded-full shadow-2xl active:scale-90 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
