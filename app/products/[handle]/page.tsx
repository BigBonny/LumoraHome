import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProducts, getProductByHandle } from "@/lib/shopify";
import { ProductImageGallery } from "@/components/products/ProductImageGallery";
import { ProductForm } from "@/components/products/ProductForm";
import { ProductCard } from "@/components/products/ProductCard";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { ShopifyProduct } from "@/types/shopify";

interface ProductPageProps {
  params: { handle: string };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    return {
      title: "Product Not Found | LumoraHome",
    };
  }

  return {
    title: `${product.title} | LumoraHome`,
    description: product.seo.description || product.description.slice(0, 160),
    openGraph: {
      images: product.featuredImage ? [{ url: product.featuredImage.url }] : [],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts(100);
  return products.map((product) => ({
    handle: product.handle,
  }));
}

async function getRelatedProducts(
  currentProduct: ShopifyProduct
): Promise<ShopifyProduct[]> {
  const allProducts = await getProducts(100);
  return allProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.productType === currentProduct.productType ||
          p.tags.some((tag) => currentProduct.tags.includes(tag)))
    )
    .slice(0, 4);
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);
  const firstVariant = product.variants.nodes[0];

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <a href="/shop" className="hover:text-white transition-colors">
            Shop
          </a>
          <span>/</span>
          <span className="text-slate-500">{product.productType || "Products"}</span>
          <span>/</span>
          <span className="text-white">{product.title}</span>
        </div>

        {/* Product Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <ProductImageGallery product={product} />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">
                {product.productType || "Lighting"}
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold">
                {product.title}
              </h1>
            </div>

            {/* Description */}
            <div
              className="prose prose-invert prose-sm max-w-none text-slate-400"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />

            {/* Form */}
            <ProductForm product={product} />

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-Day Returns
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure Checkout
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 Support
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-white/10 pt-16">
            <h2 className="font-heading text-2xl font-bold mb-8">
              You May Also <span className="gradient-text">Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
