import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-widest mb-6 text-transparent bg-clip-text bg-gradient-to-r from-foreground via-[#b58b66] to-foreground">
              ARBUDA WESTERN OUTFIT<span className="text-[#b58b66]">.</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Premium women's fashion designed for the modern, elegant, and confident woman. Elevate your wardrobe with our luxurious collections.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-background rounded-full hover:bg-secondary transition-colors font-bold text-xs uppercase h-8 w-8 flex items-center justify-center">
                IG
              </Link>
              <Link href="#" className="p-2 bg-background rounded-full hover:bg-secondary transition-colors font-bold text-xs uppercase h-8 w-8 flex items-center justify-center">
                FB
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/new" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/clothing" className="hover:text-foreground transition-colors">Clothing</Link></li>
              <li><Link href="/shoes" className="hover:text-foreground transition-colors">Shoes</Link></li>
              <li><Link href="/accessories" className="hover:text-foreground transition-colors">Accessories</Link></li>
              <li><Link href="/sale" className="hover:text-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-medium text-lg mb-6">Customer Care</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/track-order" className="hover:text-foreground transition-colors">Track Order</Link></li>
              <li><Link href="/size-guide" className="hover:text-foreground transition-colors">Size Guide</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-lg mb-6">Join The Club</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter and get 15% off your first order.
            </p>
            <form className="flex flex-col gap-3">
              <Input 
                type="email" 
                placeholder="Email Address" 
                className="bg-background border-border"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ARBUDA WESTERN OUTFIT. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
