import Link from "next/link";
import { ShoppingCart, Search, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 text-foreground">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10">
                <Link href="/new" className="text-lg font-medium hover:text-secondary-foreground transition-colors">New In</Link>
                <Link href="/clothing" className="text-lg font-medium hover:text-secondary-foreground transition-colors">Clothing</Link>
                <Link href="/dresses" className="text-lg font-medium hover:text-secondary-foreground transition-colors">Dresses</Link>
                <Link href="/accessories" className="text-lg font-medium hover:text-secondary-foreground transition-colors">Accessories</Link>
                <Link href="/sale" className="text-lg font-medium text-destructive hover:text-destructive/80 transition-colors">Sale</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex-1 md:flex-none text-center md:text-left">
          <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-foreground via-[#b58b66] to-foreground">
            ARBUDA WESTERN OUTFIT<span className="text-[#b58b66]">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 mx-6">
          <Link href="/new" className="text-sm font-medium hover:text-secondary-foreground transition-colors">New In</Link>
          <Link href="/clothing" className="text-sm font-medium hover:text-secondary-foreground transition-colors">Clothing</Link>
          <Link href="/dresses" className="text-sm font-medium hover:text-secondary-foreground transition-colors">Dresses</Link>
          <Link href="/accessories" className="text-sm font-medium hover:text-secondary-foreground transition-colors">Accessories</Link>
          <Link href="/sale" className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">Sale</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-foreground hover:bg-muted">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex text-foreground hover:bg-muted">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
