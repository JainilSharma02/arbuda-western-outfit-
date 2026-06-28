"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Silk Slip Dress",
    price: 189.00,
    originalPrice: 220.00,
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1974&auto=format&fit=crop",
    colors: ["#111", "#e0e0e0"],
    tag: "Sale",
  },
  {
    id: 2,
    name: "Structured Wool Blazer",
    price: 245.00,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1974&auto=format&fit=crop",
    colors: ["#8B4513", "#111"],
    tag: "New",
  },
  {
    id: 3,
    name: "Pleated Midi Skirt",
    price: 125.00,
    image: "https://images.unsplash.com/photo-1583496661160-c588c443c982?q=80&w=2072&auto=format&fit=crop",
    colors: ["#f5f5dc", "#000"],
  },
  {
    id: 4,
    name: "Cashmere Turtleneck Sweater",
    price: 210.00,
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1972&auto=format&fit=crop",
    colors: ["#fff", "#d3d3d3"],
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Trending Now</h2>
            <p className="text-muted-foreground max-w-xl">
              Elevate your wardrobe with our most loved pieces this season.
            </p>
          </div>
          <Link href="/shop" className="hidden border-b border-foreground md:inline-flex pb-1 font-medium hover:text-muted-foreground hover:border-muted-foreground transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="group overflow-hidden rounded-xl border-none shadow-none bg-transparent">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted mb-4">
                  {product.tag && (
                    <Badge className="absolute top-4 left-4 z-10 bg-white text-black hover:bg-white px-3 py-1 uppercase tracking-widest text-[10px]">
                      {product.tag}
                    </Badge>
                  )}
                  
                  {/* Actions overlay */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <Button size="icon" variant="secondary" className="rounded-full shadow-sm bg-white hover:bg-gray-100 text-black h-9 w-9">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full shadow-sm bg-white hover:bg-gray-100 text-black h-9 w-9">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Add to cart bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <Button className="w-full bg-white text-black hover:bg-white/90 shadow-lg rounded-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>

                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${product.image})` }}
                  />
                </div>
                
                <CardContent className="p-0">
                  <div className="flex gap-1 mb-2">
                    {product.colors.map(color => (
                      <span key={color} className="block h-3 w-3 rounded-full border border-border" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <h3 className="font-medium text-lg leading-tight mb-1">
                    <Link href={`/product/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Button variant="outline" className="rounded-full w-full max-w-sm">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
