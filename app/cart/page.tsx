"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { cart, updateItem, removeItem, isLoading } = useCartStore();

  const cartLines = cart?.lines?.nodes || [];
  const subtotal = cart?.cost?.subtotalAmount;
  const checkoutUrl = cart?.checkoutUrl;

  if (cartLines.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-violet-600/10 flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-violet-400" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-slate-400 mb-6">
            Looks like you haven't added anything yet. Let's fix that!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-600/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
          <p className="text-slate-400 mt-2">
            {cart?.totalQuantity} {cart?.totalQuantity === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartLines.map((line) => {
              const merchandise = line.merchandise;
              const product = merchandise.product;

              return (
                <motion.div
                  key={line.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4 p-4 glass-card"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                    {merchandise.image || product.featuredImage ? (
                      <Image
                        src={merchandise.image?.url || product.featuredImage?.url || ""}
                        alt={merchandise.image?.altText || product.title}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet-900/30 to-blue-900/30" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${product.handle}`}
                      className="font-medium text-white hover:text-violet-400 transition-colors line-clamp-1"
                    >
                      {product.title}
                    </Link>

                    {merchandise.selectedOptions.length > 0 && (
                      <p className="text-sm text-slate-500 mt-1">
                        {merchandise.selectedOptions
                          .map((opt) => opt.value)
                          .join(" / ")}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                        <button
                          onClick={() => updateItem(line.id, line.quantity - 1)}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() => updateItem(line.id, line.quantity + 1)}
                          disabled={isLoading}
                          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-semibold text-lg">
                        ${parseFloat(line.cost.totalAmount.amount).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(line.id)}
                    disabled={isLoading}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors self-start"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="p-6 glass-card sticky top-24">
              <h2 className="font-heading text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>${subtotal ? parseFloat(subtotal.amount).toFixed(2) : "0.00"}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-400">Free over $50</span>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${subtotal ? parseFloat(subtotal.amount).toFixed(2) : "0.00"}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Taxes calculated at checkout
                  </p>
                </div>
              </div>

              <a
                href={checkoutUrl || "#"}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-600/30 transition-all"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/shop"
                className="block text-center text-slate-400 hover:text-white transition-colors mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
