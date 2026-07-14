import WesternPageClient from "./WesternPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Western Outfits Collection | Premium Ladies Jeans, Tops & Loungewear",
  description: "Browse our elegant selection of stylish western wear for women, featuring premium high-waist jeans, designers tops, co-ords, and satin loungewear.",
  alternates: {
    canonical: "/western",
  }
};

export default function Page() {
  return <WesternPageClient />;
}
