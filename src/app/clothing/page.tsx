import ClothingPageClient from "./ClothingPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Women's Clothing Collection | Arbuda Western Outfit",
  description: "Browse our elegant collection of traditional and fusion women's clothing, featuring 3-piece sets, 2-piece coordinates, kurtis, and designer sets at Arbuda Western Outfit.",
  alternates: {
    canonical: "/clothing",
  }
};

export default function Page() {
  return <ClothingPageClient />;
}
