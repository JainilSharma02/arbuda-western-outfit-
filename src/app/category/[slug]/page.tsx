import CategoryPageClient from "./CategoryPageClient";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return {
    title: `${formattedTitle} Collection | Buy ${formattedTitle} Online`,
    description: `Shop the latest premium ${formattedTitle.toLowerCase()} designs at Arbuda Western Outfit. Discover handpicked trends, high-quality fabrics, and style guides.`,
    alternates: {
      canonical: `/category/${slug}`,
    }
  };
}

export default function Page({ params }: Props) {
  return <CategoryPageClient params={params} />;
}
