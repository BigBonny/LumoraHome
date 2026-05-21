"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export function CartDrawer() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCartStore();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const cartLines = cart?.lines?.nodes || [];
  const subtotal = cart?.cost?.subtotalAmount;
  const checkoutUrl = cart?.checkoutUrl;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md z-50 bg-[#0a0a1a] border-l border-white/10 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-violet-400" />
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  {cart?.totalQuantity > 0 && (
                    <span className="px-2 py-1 bg-violet-600/20 text-violet-300 text-sm rounded-full">
                      {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"}
                    </span>
                  )}
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Content */}
              {cartLines.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <div className="w-24 h-24 rounded-full bg-violet-600/10 flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-violet-400" />
                  </div>
                  <p className="text-xl font-semibold mb-2">Your cart is empty</p>
                  <p className="text-slate-400 text-center mb-6">
                    Looks like you haven't added anything yet.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-600/30 transition-all"
                  >
                    Start Shopping
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {cartLines.map((line) => {
                      const merchandise = line.merchandise;
                      const product = merchandise.product;

                      return (
                        <motion.div
                          key={line.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex gap-4 p-4 glass-card"
                        >
                          {/* Product Image */}
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                            {merchandise.image || product.featuredImage ? (
                              <Image
                                src={merchandise.image?.url || product.featuredImage?.url || ""}
                                alt={merchandise.image?.altText || product.title}
                                fill
                                className="object-cover"
                                sizes="80px"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-violet-900/30 to-blue-900/30" />
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/products/${product.handle}`}
                              onClick={closeCart}
                              className="font-medium text-white hover:text-violet-400 transition-colors line-clamp-1"
                            >
                              {product.title}
                            </Link>

                            {/* Variant Options */}
                            {merchandise.selectedOptions.length > 0 && (
                              <p className="text-sm text-slate-500 mt-1">
                                {merchandise.selectedOptions
                                  .map((opt) => opt.value)
                                  .join(" / ")}
                              </p>
                            )}

                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateItem(line.id, line.quantity - 1)}
                                  disabled={isLoading}
                                  className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-medium">
                                  {line.quantity}
                                </span>
                                <button
                                  onClick={() => updateItem(line.id, line.quantity + 1)}
                                  disabled={isLoading}
                                  className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Price */}
                              <span className="font-semibold">
                                ${parseFloat(line.cost.totalAmount.amount).toFixed(2)}
                              </span>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(line.id)}
                            disabled={isLoading}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors self-start"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-white/10 p-6 space-y-4">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Subtotal</span>
                      <span className="text-xl font-bold">
                        ${subtotal ? parseFloat(subtotal.amount).toFixed(2) : "0.00"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500">
                      Shipping and taxes calculated at checkout.
                    </p>

                    {/* Checkout Button */}
                    <a
                      href={checkoutUrl || "#"}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-600/30 transition-all"
                    >
                      Checkout
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    {/* Continue Shopping */}
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="block text-center text-slate-400 hover:text-white transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
