"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { ShopifyProduct } from "@/types/shopify";
import { useCartStore } from "@/store/cartStore";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, isLoading } = useCartStore();

  const firstVariant = product.variants.nodes[0];
  const hasComparePrice = firstVariant?.compareAtPrice?.amount;
  const isOnSale = hasComparePrice &&
    parseFloat(firstVariant.compareAtPrice!.amount) > parseFloat(firstVariant.price.amount);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant || isLoading) return;
    await addItem(firstVariant.id, 1);
  };

  // Determine badge
  let badge = null;
  if (isOnSale && firstVariant?.compareAtPrice?.amount) {
    const discount = Math.round(
      (1 - parseFloat(firstVariant.price.amount) / parseFloat(firstVariant.compareAtPrice.amount)) * 100
    );
    badge = { text: `Save ${discount}%`, variant: "sale" as const };
  } else if (product.tags?.includes("new")) {
    badge = { text: "New", variant: "new" as const };
  } else if (product.tags?.includes("bestseller")) {
    badge = { text: "Best Seller", variant: "default" as const };
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/products/${product.handle}`} className="group block h-full">
        <div className="glass-card overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:border-violet-500/40 group-hover:shadow-2xl group-hover:shadow-violet-600/20 group-hover:-translate-y-1">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-violet-950/40 to-blue-950/40">
            {badge && (
              <div className="absolute top-3 left-3 z-10">
                <Badge variant={badge.variant}>{badge.text}</Badge>
              </div>
            )}

            {product.featuredImage ? (
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-violet-900/50 to-blue-900/50 flex items-center justify-center">
                <span className="text-slate-500 text-sm">No image</span>
              </div>
            )}

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

            {/* Add to Cart - always visible on mobile, hover on desktop */}
            <div className="absolute inset-x-3 bottom-3 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={isLoading || !firstVariant}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black font-semibold text-sm rounded-full shadow-xl hover:bg-violet-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Quick Add
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5 flex flex-col flex-1">
            {/* Category Tag */}
            <p className="text-[10px] text-violet-400 uppercase tracking-[0.15em] font-semibold mb-2">
              {product.productType || "Ambient Lighting"}
            </p>

            {/* Name */}
            <h3 className="font-medium text-white mb-3 line-clamp-2 leading-snug group-hover:text-violet-300 transition-colors min-h-[2.6rem]">
              {product.title}
            </h3>

            {/* Price */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white">
                  ${parseFloat(firstVariant?.price?.amount || "0").toFixed(2)}
                </span>
                {isOnSale && firstVariant?.compareAtPrice?.amount && (
                  <span className="text-sm text-slate-500 line-through">
                    ${parseFloat(firstVariant.compareAtPrice.amount).toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 group-hover:text-violet-300 transition-colors">
                View →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
