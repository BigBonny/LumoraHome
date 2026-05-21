"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Check, Music, Wifi, Volume2 } from "lucide-react";
import { ShopifyProduct } from "@/types/shopify";

interface HeroProps {
  product?: ShopifyProduct;
}

export function Hero({ product }: HeroProps) {
  const productImage =
    product?.featuredImage?.url || "/images/heroImg.webp";
  const productHref = product ? `/products/${product.handle}` : "/shop";
  const price = product?.priceRange.minVariantPrice.amount;
  const compareAt =
    product?.compareAtPriceRange?.minVariantPrice.amount &&
    parseFloat(product.compareAtPriceRange.minVariantPrice.amount) >
      parseFloat(product.priceRange.minVariantPrice.amount)
      ? product.compareAtPriceRange.minVariantPrice.amount
      : null;
  const discount =
    compareAt && price
      ? Math.round((1 - parseFloat(price) / parseFloat(compareAt)) * 100)
      : null;
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden pt-28 md:pt-32 pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Lifestyle photo */}
        <Image
          src="/images/heroImg.webp"
          alt="Ambient lit bedroom"
          fill
          priority
          className="object-cover opacity-30"
        />
        {/* Color wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/80 via-[#0a0a1a]/90 to-blue-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-600/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-violet-300/40 rounded-full"
              initial={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: 0,
              }}
              animate={{
                y: [null, "-20%"],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 6,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-7 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-200">
                {discount ? `Save ${discount}% — Featured Drop` : "Featured Drop"}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
              <span className="block text-white">Your Room.</span>
              <span className="block gradient-text">Your Galaxy.</span>
            </h1>

            {/* Product name */}
            <p className="max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-slate-200 font-medium">
              {product?.title || "Premium ambient lighting"}
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                <Wifi className="w-3.5 h-3.5 text-violet-300" />
                App Control
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                <Music className="w-3.5 h-3.5 text-violet-300" />
                Bluetooth Speaker
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                <Volume2 className="w-3.5 h-3.5 text-violet-300" />
                White Noise
              </div>
            </div>

            {/* Price */}
            {price && (
              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="text-4xl font-bold text-white">
                  ${parseFloat(price).toFixed(2)}
                </span>
                {compareAt && (
                  <span className="text-xl text-slate-500 line-through">
                    ${parseFloat(compareAt).toFixed(2)}
                  </span>
                )}
                {discount && (
                  <span className="text-sm font-semibold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                    -{discount}%
                  </span>
                )}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href={productHref}
                className="group bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-lg shadow-violet-600/40 hover:shadow-violet-600/60 hover:scale-105 transition-all"
              >
                Shop This Drop
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#featured"
                className="px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all"
              >
                Browse All
              </Link>
            </div>

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 pt-4"
            >
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Secure checkout</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Floating product visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-violet-600/40 via-fuchsia-500/30 to-blue-600/40 blur-3xl rounded-full animate-pulse" />

              {/* Main product card (clickable) */}
              <Link href={productHref} className="block h-full w-full group">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-900/50"
                >
                  <Image
                    src={productImage}
                    alt={product?.title || "Featured product"}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 via-transparent to-transparent" />

                  {/* Discount badge on card */}
                  {discount && (
                    <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold shadow-lg">
                      SAVE {discount}%
                    </div>
                  )}
                </motion.div>
              </Link>

              {/* Floating feature card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-6 top-1/4 glass-card px-4 py-3 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">5-in-1</p>
                    <p className="text-sm font-bold text-white">Galaxy Projector</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating feature card 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-4 bottom-12 glass-card px-4 py-3 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">App + Speaker</p>
                    <p className="text-sm font-bold text-white">Smart Control</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-violet-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
