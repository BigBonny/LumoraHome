"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-violet-600/20 flex items-center justify-center"
        >
          <Search className="w-12 h-12 text-violet-400" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="font-heading text-6xl font-bold gradient-text mb-2">
            404
          </h1>
          <h2 className="font-heading text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-slate-400 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
            been moved or doesn&apos;t exist.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/"
            className="btn-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/5 transition-colors inline-flex items-center justify-center"
          >
            Browse Shop
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
