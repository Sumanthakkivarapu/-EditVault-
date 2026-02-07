"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Sparkles, Smile } from "lucide-react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/50 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider uppercase border border-white/10 rounded-full glass neon-glow-purple">
              Elevate Your Content
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Premium <span className="text-gradient">Editing Assets</span> <br />
              for Modern Creators
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Instant downloads. Affordable pricing. Creator-tested packs. <br />
              Stop wasting hours and start creating content that stands out.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/store" className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2">
                Browse Assets <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/store?pkg=pro" className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2 border border-white/10">
                Get Pro Pack <Zap className="w-5 h-5 text-neon-blue" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products (Mockup) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Packs</h2>
            <p className="text-muted-foreground">Our most popular assets this month</p>
          </div>
          <Link href="/store" className="text-neon-blue hover:text-white transition-colors flex items-center gap-1 group">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "TikTok Trend Transitions", price: "₹499", tag: "CapCut", color: "neon-purple" },
            { name: "Cinematic Master Collection", price: "₹999", tag: "LUTs", color: "neon-blue" },
            { name: "Creator Essentials Pack", price: "₹1,499", tag: "Premiere Pro", color: "neon-pink" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 rounded-xl border border-white/10 group hover:border-white/20 transition-all relative"
            >
              <div className="aspect-video w-full bg-muted rounded-lg mb-4 overflow-hidden relative">
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-${item.color}`}>
                  {item.tag}
                </div>
                <div className="w-full h-full flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform">
                  Preview Video
                </div>
              </div>
              <h3 className="text-lg font-bold mb-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">Professional presets for your next hit video.</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{item.price}</span>
                <button className="p-2 glass rounded-lg hover:bg-white/10 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 glass border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: Zap, title: "Instant Download", desc: "Get access to your files immediately after purchase." },
              { icon: Shield, title: "Secure Payments", desc: "Your transactions are handled safely via Razorpay." },
              { icon: Sparkles, title: "High Quality", desc: "Assets tested by professional creators for best results." },
              { icon: Smile, title: "Beginner Friendly", desc: "Easy to use with step-by-step guides included." },
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
                  <feature.icon className="w-6 h-6 text-neon-blue" />
                </div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
