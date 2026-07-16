import WesternPageClient from "./WesternPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Western Outfits Collection | Arbuda Western Outfit",
  description: "Browse our elegant selection of stylish western wear for women, featuring premium high-waist jeans, designers tops, co-ords, and satin loungewear at Arbuda Western Outfit.",
  alternates: {
    canonical: "/western",
  }
};

export default function Page() {
  return <WesternPageClient />;
}
