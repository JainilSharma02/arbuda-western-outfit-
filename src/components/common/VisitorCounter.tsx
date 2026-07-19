"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState<number>(3);

  useEffect(() => {
    setMounted(true);
    
    // Set random simulated active users (between 4 and 9)
    setActiveUsers(Math.floor(Math.random() * 6) + 4);

    const fetchAndIncrementCounter = async () => {
      // 1. Determine local starting counter
      const baseCount = 28410; // Elegant, high baseline so they look established
      
      const storedCount = localStorage.getItem("arbuda_visitor_count");
      let currentLocalCount = baseCount;
      
      if (storedCount) {
        currentLocalCount = parseInt(storedCount, 10);
      }

      // 2. Increment local count for the session (once per page load)
      const sessionKey = "arbuda_session_counted";
      if (!sessionStorage.getItem(sessionKey)) {
        currentLocalCount += 1;
        sessionStorage.setItem(sessionKey, "true");
      } else {
        // Subtle random increase on page actions (30% chance)
        if (Math.random() > 0.70) {
          currentLocalCount += 1;
        }
      }
      
      localStorage.setItem("arbuda_visitor_count", currentLocalCount.toString());
      setCount(currentLocalCount);

      // 3. Connect to a free cloud counter API (with robust error handling)
      try {
        // namespace: arbuda_western
        // key: website_visits
        const response = await fetch(
          "https://api.counterapi.dev/v1/arbuda_western/website_visits/up"
        );
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.value === "number") {
            // Incorporate API value dynamically
            const apiValue = data.value;
            // Combined count. If API is reset or small, it accumulates on top of our base
            const finalLiveCount = Math.max(baseCount + apiValue, currentLocalCount);
            setCount(finalLiveCount);
            localStorage.setItem("arbuda_visitor_count", finalLiveCount.toString());
          }
        }
      } catch (error) {
        console.warn("Analytics server offline. Falling back to local offline counter.", error);
      }
    };

    fetchAndIncrementCounter();

    // Subtle updates every 15-30 seconds to simulate other online users visiting
    const interval = setInterval(() => {
      // Randomly fluctuate online active users slightly
      setActiveUsers((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const newVal = prev + delta;
        return newVal >= 3 && newVal <= 12 ? newVal : prev;
      });

      // 20% chance of incrementing page view counter live (as if someone else clicked)
      if (Math.random() > 0.8) {
        setCount((prev) => {
          const next = prev + 1;
          localStorage.setItem("arbuda_visitor_count", next.toString());
          return next;
        });
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Animate the visitor counter scrolling up rapidly (odometer effect) on load
  useEffect(() => {
    if (count === 0) return;
    
    let startVal = Math.max(0, count - 35);
    setDisplayCount(startVal);
    
    const duration = 1200; // ms
    const increment = 1;
    const steps = 35;
    const stepTime = Math.floor(duration / steps);
    
    let currentVal = startVal;
    const timer = setInterval(() => {
      currentVal += increment;
      if (currentVal >= count) {
        setDisplayCount(count);
        clearInterval(timer);
      } else {
        setDisplayCount(currentVal);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [count]);

  if (!mounted) {
    // Elegant low-opacity placeholder skeleton during Server-Side Rendering
    return (
      <div className="h-8 w-44 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full animate-pulse"></div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow hover:border-slate-300 dark:hover:border-slate-700">
      {/* Live Indicator */}
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[10px] md:text-[11px] font-medium tracking-wide uppercase text-muted-foreground mr-1">
          Live: <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{activeUsers}</span>
        </span>
      </div>

      {/* Vertical Divider */}
      <div className="h-3 w-px bg-slate-300 dark:bg-slate-700" />

      {/* Traffic view counter */}
      <div className="flex items-center gap-1.5 text-[11px] md:text-[12px] font-medium text-slate-700 dark:text-slate-300 font-sans">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-3.5 h-3.5 text-[#b58b66]"
        >
          <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span className="flex items-center gap-1">
          Visits:
          <span className="font-bold text-slate-900 dark:text-slate-100 font-mono tracking-tight bg-slate-100 dark:bg-slate-800/80 px-1.5 py-0.5 rounded leading-none select-none">
            {displayCount.toLocaleString()}
          </span>
        </span>
      </div>
    </div>
  );
}
