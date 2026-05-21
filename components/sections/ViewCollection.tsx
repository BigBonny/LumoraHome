"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Moon, Focus, Camera } from "lucide-react";

const collections = [
  {
    title: "Bedroom Bliss",
    description: "Wind down with warm, cinematic lighting",
    image:
      "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=900&q=80",
    icon: Moon,
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Focus Mode",
    description: "Lighting that fuels deep work",
    image:
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&w=900&q=80",
    icon: Focus,
    accent: "from-blue-500 to-cyan-500",
  },
  {
    title: "Creator Setup",
    description: "Make every frame look magical",
    image:
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=900&q=80",
    icon: Camera,
    accent: "from-fuchsia-500 to-pink-500",
  },
];

export function ViewCollection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-violet-600/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 mb-6">
            <span className="text-sm font-medium text-violet-300">
              Shop by Vibe
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Find Your <span className="gradient-text">Perfect Glow</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Lighting designed for every mood — from late-night studying to
            cinematic content creation.
          </p>
        </motion.div>

        {/* Collection cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {collections.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Link href="/shop" className="group block">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 hover:border-violet-500/50 transition-all">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/40 to-transparent" />
                    <div
                      className={`absolute inset-0 bg-gradient-to-tr ${c.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay`}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.accent} flex items-center justify-center mb-4 shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-white mb-2">
                        {c.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-4">
                        {c.description}
                      </p>
                      <div className="flex items-center gap-2 text-violet-300 text-sm font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Wide CTA banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-white/10"
        >
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1600&q=80"
              alt="Ambient lighting setup"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 via-purple-900/85 to-blue-900/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 py-16 px-8 sm:py-20 sm:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium">
                Limited Time: Free Shipping Over $50
              </span>
            </div>
            <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Your Perfect Ambiance Is Waiting
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-lg">
              Stop settling for harsh overhead lighting. Create the cozy,
              aesthetic atmosphere you deserve.
            </p>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 bg-white text-[#0a0a1a] px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:scale-105 transition-all"
            >
              Shop the Collection
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-sm text-slate-400 mt-4">
              30-day returns • Secure checkout • Ships within 2 business days
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
