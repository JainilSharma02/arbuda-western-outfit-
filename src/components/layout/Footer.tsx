import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-widest mb-4 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-[#b58b66] to-foreground uppercase">
              ARBUDA WESTERN OUTFIT<span className="text-[#b58b66]">.</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-[13px] leading-relaxed max-w-[300px]">
              Premium women's fashion designed for the modern, elegant, and confident woman. Elevate your wardrobe with our luxurious collections.
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://www.instagram.com/arbuda_western_outfit_end_dres?igsh=bTAyZTJzazk5NHo1" 
                target="_blank"
                className="p-2.5 bg-background border border-slate-200 rounded-full hover:bg-slate-50 transition-all font-bold text-xs uppercase h-10 w-10 flex items-center justify-center shadow-sm"
              >
                IG
              </Link>
              <Link 
                href="https://wa.me/919427673886" 
                target="_blank"
                className="p-2.5 bg-background border border-slate-200 rounded-full hover:bg-slate-50 transition-all font-bold text-xs uppercase h-10 w-10 flex items-center justify-center shadow-sm"
              >
                WA
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/new" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/clothing" className="hover:text-foreground transition-colors">Clothing</Link></li>
              <li><Link href="/sale" className="hover:text-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-medium text-lg mb-6">Customer Care</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link href="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ARBUDA WESTERN OUTFIT. All rights reserved. | @jsmdevlopment</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
