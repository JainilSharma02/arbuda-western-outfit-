import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Arbuda Western Outfit | Premium Women's Western & Traditional Wear Store",
  description: "Explore Arbuda Western Outfit for premium ladies wear in Ahmedabad, India. Buy coordinates sets, 2-piece / 3-piece traditional wear, designer kurtis, jeans, and fashion tops with direct WhatsApp checkout and quick shipping.",
  alternates: {
    canonical: "/",
  }
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
}
