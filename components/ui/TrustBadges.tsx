"use client";

import { motion } from "framer-motion";
import { Truck, RotateCcw, Shield, Headphones } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Shipping Over $50",
    description: "Get your ambiance upgrade delivered free. Express options available.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Easy Returns",
    description: "Not absolutely in love? Send it back within 30 days for a full refund.",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "Shop with confidence. Your payment data is protected with bank-level encryption.",
  },
  {
    icon: Headphones,
    title: "Here to Help",
    description: "Questions about your setup? Our team responds within hours to help you.",
  },
];

export function TrustBadges() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#080814] border-y border-white/5">
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Shop With <span className="gradient-text">Confidence</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            One simple promise: you&apos;ll love your new lighting, or we&apos;ll
            make it right.
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card p-7 text-center hover:border-violet-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-violet-600/30 to-blue-600/30 border border-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <badge.icon className="w-7 h-7 text-violet-300" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">
                {badge.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
