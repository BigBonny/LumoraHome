"use client";

import { Truck, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

const messages = [
  { icon: Truck, text: "Free shipping on orders over $50" },
  { icon: Sparkles, text: "30-day money-back guarantee" },
  { icon: Zap, text: "Ships within 2 business days" },
];

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 text-white py-2 px-4 text-center text-xs sm:text-sm font-medium overflow-hidden"
    >
      <div className="flex items-center justify-center gap-6 sm:gap-10">
        {messages.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-2 ${
                i > 0 ? "hidden md:flex" : ""
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{m.text}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
