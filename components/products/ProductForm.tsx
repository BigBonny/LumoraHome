"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import { ShopifyProduct, ShopifyVariant } from "@/types/shopify";
import { useCartStore } from "@/store/cartStore";

interface ProductFormProps {
  product: ShopifyProduct;
}

export function ProductForm({ product }: ProductFormProps) {
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(
    product.variants.nodes[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem, isLoading } = useCartStore();

  const variants = product.variants.nodes;
  const hasVariants = variants.length > 1;

  // Get unique option names (e.g., "Size", "Color")
  const optionNames = hasVariants
    ? variants[0]?.selectedOptions.map((opt) => opt.name) || []
    : [];

  // Group variants by options
  const getOptionsForName = (name: string) => {
    const options = new Set<string>();
    variants.forEach((variant) => {
      const option = variant.selectedOptions.find((opt) => opt.name === name);
      if (option) options.add(option.value);
    });
    return Array.from(options);
  };

  // Get currently selected option values
  const selectedOptions = selectedVariant?.selectedOptions || [];

  // Handle option change
  const handleOptionChange = (optionName: string, value: string) => {
    // Find variant that matches all selected options
    const newVariant = variants.find((variant) => {
      const option = variant.selectedOptions.find((opt) => opt.name === optionName);
      return option?.value === value;
    });

    if (newVariant) {
      setSelectedVariant(newVariant);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    await addItem(selectedVariant.id, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const isOnSale =
    selectedVariant?.compareAtPrice &&
    parseFloat(selectedVariant.compareAtPrice.amount) >
      parseFloat(selectedVariant.price.amount);

  return (
    <div className="space-y-6">
      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-white">
          ${parseFloat(selectedVariant?.price?.amount || "0").toFixed(2)}
        </span>
        {isOnSale && selectedVariant?.compareAtPrice && (
          <>
            <span className="text-xl text-slate-500 line-through">
              ${parseFloat(selectedVariant.compareAtPrice.amount).toFixed(2)}
            </span>
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm font-semibold rounded">
              Save ${
                (
                  parseFloat(selectedVariant.compareAtPrice.amount) -
                  parseFloat(selectedVariant.price.amount)
                ).toFixed(2)
              }
            </span>
          </>
        )}
      </div>

      {/* Variant Selectors */}
      {hasVariants &&
        optionNames.map((optionName) => (
          <div key={optionName} className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              {optionName}
            </label>
            <div className="flex flex-wrap gap-2">
              {getOptionsForName(optionName).map((value) => {
                const isSelected = selectedOptions.find(
                  (opt) => opt.name === optionName && opt.value === value
                );

                return (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(optionName, value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="font-medium text-slate-300">Quantity</span>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Availability */}
      {selectedVariant && (
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              selectedVariant
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
          <span className="text-sm text-slate-400">
            {selectedVariant ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={
          isLoading || !selectedVariant
        }
        className={`w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
          addedToCart
            ? "bg-green-600 text-white shadow-green-600/30"
            : "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-violet-600/30 hover:shadow-violet-600/50"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : addedToCart ? (
          <>
            <Check className="w-5 h-5" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Add to Cart - ${
              (
                parseFloat(selectedVariant?.price?.amount || "0") * quantity
              ).toFixed(2)
            }
          </>
        )}
      </motion.button>

      {/* Shipping Note */}
      <div className="flex items-center gap-2 text-sm text-green-400 bg-green-500/10 px-4 py-2 rounded-lg">
        <Check className="w-4 h-4" />
        <span>Free shipping on orders over $50</span>
      </div>
    </div>
  );
}
