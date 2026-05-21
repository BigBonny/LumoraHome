import { Metadata } from "next";
import Image from "next/image";
import { Sparkles, Heart, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | LumoraHome",
  description:
    "Learn about LumoraHome's mission to transform spaces with premium ambient lighting for Gen Z and millennials.",
};

const values = [
  {
    icon: Sparkles,
    title: "Quality Tested",
    description:
      "Every product is tested in our own spaces before it hits the store. If it doesn't create the vibe, we don't sell it.",
  },
  {
    icon: Heart,
    title: "Honest Pricing",
    description:
      "No inflated prices or fake discounts. We charge fair prices for quality products and are transparent about our costs.",
  },
  {
    icon: Zap,
    title: "Real Support",
    description:
      "Have a question about your setup? We actually respond — usually within a few hours. Real help from real people.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 border border-violet-500/30 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium text-violet-300">
              Our story
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold mb-5 leading-tight tracking-tight">
            About <span className="gradient-text">LumoraHome</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We&apos;re on a mission to help Gen Z and millennials transform
            their spaces into personalized sanctuaries through the power of
            ambient lighting.
          </p>
        </div>

        {/* Story Section */}
        <div className="glass-card p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80"
                alt="Ambient lighting setup"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="font-heading text-2xl font-bold">Our Story</h2>
              <p className="text-slate-400 leading-relaxed">
                LumoraHome started with a simple frustration: we could not find ambient
                lighting that actually looked good in real life. Everything was either
                cheap plastic junk or overpriced designer pieces. We wanted something
                in between — quality lighting that actually transformed a room without
                breaking the bank.
              </p>
              <p className="text-slate-400 leading-relaxed">
                We test every product ourselves. If it does not create that perfect
                vibe, improve our focus, or help us unwind after a long day, it does
                not make it to our store. That is our promise.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-center mb-8">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-violet-600/20 to-blue-600/20 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitments */}
        <div className="glass-card p-8">
          <div className="text-center mb-6">
            <h2 className="font-heading text-2xl font-bold">Our Promise</h2>
            <p className="text-slate-400 text-sm mt-2">What you can always expect from us</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <p className="text-3xl font-bold gradient-text">Premium</p>
              <p className="text-slate-400 text-sm">Curated Selection</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold gradient-text">Fast</p>
              <p className="text-slate-400 text-sm">Global Shipping</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold gradient-text">30 Day</p>
              <p className="text-slate-400 text-sm">Easy Returns</p>
            </div>
            <div className="p-4">
              <p className="text-3xl font-bold gradient-text">24/7</p>
              <p className="text-slate-400 text-sm">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
