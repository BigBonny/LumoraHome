"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, AlertCircle, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 5000 ? 0 : 599; // Free shipping over $50
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-20 px-4 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-slate-400 mb-6">
          Add some products to your cart before checking out.
        </p>
        <Link
          href="/shop"
          className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
          <h1 className="font-heading text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Order Summary</h2>
            <div className="glass-card p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-4 py-2 border-b border-white/10 last:border-0"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-slate-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${((item.product.price * item.quantity) / 100).toFixed(2)}
                  </p>
                </div>
              ))}

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "FREE" : `$${(shipping / 100).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${(total / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Payment</h2>

            {/* Test Card Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-400 text-sm">Test Mode</p>
                <p className="text-slate-400 text-sm">
                  Use card number{" "}
                  <code className="bg-white/10 px-1 rounded">4242 4242 4242 4242</code>
                  {" "}for testing. Any future date and any 3 digits for CVC.
                </p>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-violet-600/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <p className="font-semibold">Secure Checkout</p>
                  <p className="text-sm text-slate-400">
                    Powered by Stripe
                  </p>
                </div>
              </div>

              <p className="text-slate-400 mb-6">
                You will be redirected to Stripe&apos;s secure checkout page to complete
                your payment. We never store your card details.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full btn-primary py-4 rounded-xl font-semibold text-lg disabled:opacity-50"
              >
                {isLoading ? "Processing..." : `Pay $${(total / 100).toFixed(2)}`}
              </motion.button>

              <p className="text-center text-xs text-slate-500 mt-4">
                By completing this purchase, you agree to our Terms of Service and
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
