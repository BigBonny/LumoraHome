"use client";

import { motion } from "framer-motion";
import { ShopifyProduct } from "@/types/shopify";
import { ProductGrid } from "@/components/products/ProductGrid";

interface FeaturedProductsProps {
  products: ShopifyProduct[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section
      id="featured"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 mb-6 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-sm font-medium text-violet-300">
              Curated Selection
            </span>
          </motion.div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight tracking-tight">
            Bestsellers That{" "}
            <span className="gradient-text">Set the Mood</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Premium ambient lighting designed to help you unwind, focus, and
            create content that truly stands out. Every piece tested for quality
            and aesthetic impact.
          </p>
        </motion.div>

        {/* Products Grid */}
        <ProductGrid products={products} />

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <a
            href="/shop"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 hover:border-violet-500/50 transition-all"
          >
            View All Products
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
