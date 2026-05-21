"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Home } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function SuccessPage() {
  const { clearCart, cart } = useCartStore();

  useEffect(() => {
    // Clear cart on successful order (but only if we had items)
    if (cart && cart.totalQuantity > 0) {
      clearCart();
    }
  }, []); // Run once on mount

  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-heading text-3xl font-bold mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-slate-400 mb-8">
            Thank you for your purchase. We&apos;ve sent a confirmation email with
            your order details.
          </p>
        </motion.div>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center mb-2">
                <Package className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-xs text-slate-400">Packed</span>
            </div>
            <div className="w-12 h-0.5 bg-white/10" />
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Truck className="w-5 h-5 text-slate-400" />
              </div>
              <span className="text-xs text-slate-400">Shipped</span>
            </div>
            <div className="w-12 h-0.5 bg-white/10" />
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                <Home className="w-5 h-5 text-slate-400" />
              </div>
              <span className="text-xs text-slate-400">Delivered</span>
            </div>
          </div>

          <div className="text-left space-y-2 text-sm">
            <p className="text-slate-400">
              <span className="text-white">Estimated delivery:</span>{" "}
              7-14 business days
            </p>
            <p className="text-slate-400">
              <span className="text-white">Order number:</span>{" "}
              #LU{Date.now().toString().slice(-6)}
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
