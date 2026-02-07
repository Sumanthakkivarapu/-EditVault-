"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
    { id: 1, name: "TikTok Trend Transitions", price: 499, tag: "CapCut", desc: "15+ viral transitions for short-form content." },
    { id: 2, name: "Cinematic Master Collection", price: 999, tag: "LUTs", desc: "Professional color grading presets for any mood." },
    { id: 3, name: "Creator Essentials Pack", price: 1499, tag: "Premiere Pro", desc: "The ultimate toolkit for YouTubers." },
    { id: 4, name: "After Effects Motion Pro", price: 1999, tag: "After Effects", desc: "Advanced motion graphics templates." },
    { id: 5, name: "Lo-Fi Sound FX Pack", price: 299, tag: "Sfx", desc: "50+ high-quality audio samples." },
    { id: 6, name: "Instagram Reel Templates", price: 799, tag: "CapCut", desc: "Fast-paced designs for maximum engagement." },
];

const CATEGORIES = ["All", "CapCut", "Premiere Pro", "After Effects", "LUTs", "Sfx"];

export default function Store() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const filteredProducts = PRODUCTS.filter(p =>
        (category === "All" || p.tag === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2">Digital <span className="text-gradient">Assets</span></h1>
                    <p className="text-muted-foreground">Find the perfect assets for your next project.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl justify-end">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search assets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 glass rounded-lg border border-white/10 focus:border-neon-purple/50 outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-12">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === cat
                            ? "bg-neon-purple text-white shadow-[0_0_10px_rgba(176,38,255,0.4)]"
                            : "glass border border-white/10 hover:border-white/20"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, i) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group glass rounded-xl overflow-hidden border border-white/10 hover:border-neon-purple/30 transition-all flex flex-col"
                    >
                        <Link href={`/product/${product.id}`} className="block aspect-video bg-muted relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform">
                                Preview Thumbnail
                            </div>
                            <div className="absolute top-2 left-2 px-2 py-0.5 glass border border-white/10 rounded text-[10px] font-bold uppercase backdrop-blur-md">
                                {product.tag}
                            </div>
                        </Link>

                        <div className="p-6 flex-1 flex flex-col">
                            <Link href={`/product/${product.id}`}>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors">{product.name}</h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">{product.desc}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <div>
                                    <span className="text-2xl font-bold">₹{product.price}</span>
                                    <span className="text-[10px] text-muted-foreground ml-2 block">One-time payment</span>
                                </div>
                                <Link
                                    href={`/checkout?id=${product.id}`}
                                    className="px-6 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-neon-blue hover:text-white transition-all shadow-lg active:scale-95"
                                >
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-xl text-muted-foreground">No assets found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
