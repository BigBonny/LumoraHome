import { Metadata } from "next";
import { getProducts } from "@/lib/shopify";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ViewCollection } from "@/components/sections/ViewCollection";
import { TrustBadges } from "@/components/ui/TrustBadges";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stellux | Transform Your Space Into a Vibe",
  description:
    "Premium ambient lighting for Gen Z & millennials. Galaxy projectors, LED mood lights, sunset lamps & more. Free shipping on orders over $50.",
};

export default async function HomePage() {
  const allProducts = await getProducts(50);

  // Find the hero product by title (fallback to first product if not found)
  const heroProduct =
    allProducts.find((p) =>
      p.title.toLowerCase().includes("5-in-1 galaxy projector")
    ) || allProducts[0];

  // Featured products: exclude the hero product, show up to 6
  const featuredProducts = allProducts
    .filter((p) => p.id !== heroProduct?.id)
    .slice(0, 6);

  return (
    <>
      <Hero product={heroProduct} />
      <FeaturedProducts products={featuredProducts} />
      <ViewCollection />
      <TrustBadges />
    </>
  );
}
