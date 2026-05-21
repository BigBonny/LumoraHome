"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Twitter, Youtube, Lock, ShieldCheck } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Galaxy Projectors", href: "/shop" },
    { label: "Mood Lights", href: "/shop" },
    { label: "LED Strips", href: "/shop" },
  ],
  company: [
    { label: "About Us", href: "/about" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#080814]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/images/Hero.png"
                alt="Stellux"
                width={260}
                height={80}
                className="h-20 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </Link>
            <p className="mt-5 text-slate-400 text-sm max-w-xs leading-relaxed">
              Transform your space into a vibe with premium ambient lighting.
              Curated for Gen Z and millennials who appreciate aesthetic living.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Strip */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-x-8 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SSL Secured Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>30-Day Money-Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-center">
            <span>VISA · Mastercard · Amex · Apple Pay · Shop Pay</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Stellux. Crafted with care for the
            aesthetic generation.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
