import DressesPageClient from "./DressesPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Women's Dresses & Gowns | Arbuda Western Outfit",
  description: "Explore our collection of women's dresses, from elegant traditional wear to modern fusion party dresses, designed by Arbuda Western Outfit.",
  alternates: {
    canonical: "/dresses",
  }
};

export default function Page() {
  return <DressesPageClient />;
}
