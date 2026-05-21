"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cart, getCheckoutUrl } = useCartStore();
  const checkoutUrl = getCheckoutUrl();
  const hasItems = (cart?.totalQuantity ?? 0) > 0;

  // Redirect to Shopify checkout if URL is available
  useEffect(() => {
    if (checkoutUrl && hasItems) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl, hasItems]);

  if (!hasItems) {
    return (
      <div className="pt-32 pb-20 px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-violet-600/10 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-violet-400" />
        </div>
        <h1 className="font-heading text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-slate-400 mb-6">
          Add some products to your cart before checking out.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-600/30 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-violet-600/10 flex items-center justify-center mx-auto mb-6">
        <span className="w-6 h-6 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
      </div>
      <h1 className="font-heading text-2xl font-bold mb-2">Redirecting to checkout…</h1>
      <p className="text-slate-400 mb-6">Taking you to Shopify&apos;s secure checkout.</p>
      {checkoutUrl && (
        <a
          href={checkoutUrl}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-600/30 transition-all"
        >
          Go to Checkout
        </a>
      )}
    </div>
  );
}
