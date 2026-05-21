import { Metadata } from "next";
import { getProducts } from "@/lib/shopify";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ShopFilters } from "@/components/shop/ShopFilters";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse Stellux's full collection of premium ambient lighting. Galaxy projectors, LED mood lights, sunset lamps & more. Free shipping over $50.",
  alternates: { canonical: "https://www.stellux.store/shop" },
  openGraph: {
    title: "Shop | Stellux",
    description: "Browse premium ambient lighting products. Free shipping over $50.",
    url: "https://www.stellux.store/shop",
    type: "website",
  },
};

interface ShopPageProps {
  searchParams: { category?: string; sort?: string };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const products = await getProducts(100);

  // Get unique product types for filtering
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.productType).filter(Boolean)))];

  // Filter by category
  let filteredProducts = products;
  if (searchParams.category && searchParams.category !== "All") {
    filteredProducts = products.filter(
      (p) => p.productType === searchParams.category
    );
  }

  // Sort products
  const sort = searchParams.sort || "featured";
  if (sort === "price-low") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(a.priceRange.minVariantPrice.amount) -
        parseFloat(b.priceRange.minVariantPrice.amount)
    );
  } else if (sort === "price-high") {
    filteredProducts.sort(
      (a, b) =>
        parseFloat(b.priceRange.minVariantPrice.amount) -
        parseFloat(a.priceRange.minVariantPrice.amount)
    );
  }

  return (
    <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-sm font-medium text-violet-300">
              {filteredProducts.length} products available
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-5 leading-tight tracking-tight">
            Shop The <span className="gradient-text">Collection</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Discover our full range of premium ambient lighting designed to
            transform every space and mood.
          </p>
        </div>

        {/* Filters and Sort */}
        <ShopFilters
          categories={categories}
          selectedCategory={searchParams.category || "All"}
          selectedSort={sort}
        />

        {/* Results Count */}
        <p className="text-slate-400 mb-6 text-sm">
          Showing{" "}
          <span className="text-white font-semibold">
            {filteredProducts.length}
          </span>{" "}
          product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
