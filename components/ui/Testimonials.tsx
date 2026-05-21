"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    handle: "@alexm.vibes",
    avatar: "https://i.pravatar.cc/120?img=47",
    rating: 5,
    text: "The galaxy projector completely transformed my bedroom. I fall asleep faster and wake up feeling refreshed. Best purchase I've made for my mental health.",
  },
  {
    id: 2,
    name: "Jordan Kim",
    handle: "@jordanstudies",
    avatar: "https://i.pravatar.cc/120?img=14",
    rating: 5,
    text: "My study sessions are 10x better with the ambient lighting. No more harsh overhead lights giving me headaches. Honestly life-changing.",
  },
  {
    id: 3,
    name: "Taylor Reyes",
    handle: "@taylor.creates",
    avatar: "https://i.pravatar.cc/120?img=33",
    rating: 5,
    text: "Bought the sunset lamp for my girlfriend and she absolutely loves it. Quality is amazing and shipping was super fast — packaged beautifully too.",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 mb-6">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-violet-300">
              Loved by 2,400+ customers
            </span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
            What Our <span className="gradient-text">Community Says</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Real reviews from people who transformed their spaces
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative glass-card p-7 hover:border-violet-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote icon */}
              <Quote className="absolute top-5 right-5 w-8 h-8 text-violet-500/20" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-200 mb-6 leading-relaxed text-[15px]">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-violet-500/30">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
