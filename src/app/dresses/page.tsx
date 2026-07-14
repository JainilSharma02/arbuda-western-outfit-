import DressesPageClient from "./DressesPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Women's Dresses | Designer Gowns & Outfits",
  description: "Explore our collection of women's dresses, from elegant traditional wear to modern fusion party dresses, designed by Arbuda Western.",
  alternates: {
    canonical: "/dresses",
  }
};

export default function Page() {
  return <DressesPageClient />;
}
