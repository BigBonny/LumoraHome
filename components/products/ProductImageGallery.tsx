"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShopifyProduct } from "@/types/shopify";

interface ProductImageGalleryProps {
  product: ShopifyProduct;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const images = product.images.nodes;
  const [selectedImage, setSelectedImage] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-gradient-to-br from-violet-900/30 to-blue-900/30 flex items-center justify-center">
        <span className="text-slate-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative aspect-square rounded-2xl overflow-hidden bg-white/5"
      >
        <Image
          src={images[selectedImage].url}
          alt={images[selectedImage].altText || product.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                selectedImage === index
                  ? "ring-2 ring-violet-500"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText || `${product.title} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
