"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, CheckCircle, Smartphone, Monitor, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
    {
        id: 1,
        name: "TikTok Trend Transitions",
        price: 499,
        tag: "CapCut",
        desc: "15+ viral transitions for short-form content. These effects are optimized for high-paced editing and viral engagement.",
        included: ["15 Dynamic Transitions", "Installation Guide", "Lifetime Updates"],
        software: "CapCut (Desktop & Mobile)",
        license: "Personal Use Only"
    },
    {
        id: 2,
        name: "Cinematic Master Collection",
        price: 999,
        tag: "LUTs",
        desc: "Professional color grading presets for any mood. Transform your flat footage into cinematic masterpieces with a single click.",
        included: ["25 Cinematic LUTs (.cube)", "Compatible with all Pro Apps", "Instructional Video"],
        software: "Premiere, Davinci, FCPX, CapCut",
        license: "Personal Use / Social Media"
    },
    {
        id: 3,
        name: "Creator Essentials Pack",
        price: 1499,
        tag: "Premiere Pro",
        desc: "The ultimate toolkit for YouTubers. Contains everything from titles and transitions to sound effects and overlays.",
        included: ["50+ Mogrt Templates", "10 Intro Snippets", "Exclusive SFX Library"],
        software: "Adobe Premiere Pro CC",
        license: "Commercial Use (Single Seat)"
    },
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = PRODUCTS.find((p) => p.id === parseInt(id)) || PRODUCTS[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/store" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Preview */}
                <div className="space-y-6">
                    <div className="aspect-video glass rounded-3xl border border-white/10 flex items-center justify-center text-muted-foreground relative overflow-hidden group">
                        <span className="text-xl font-bold group-hover:scale-110 transition-transform">Video Preview Placeholder</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-square glass rounded-xl border border-white/5 flex items-center justify-center text-xs text-muted-foreground">Thumbnail</div>
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="space-y-8">
                    <div>
                        <span className="px-3 py-1 glass border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-neon-blue mb-4 inline-block">
                            {product.tag}
                        </span>
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">{product.desc}</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-4xl font-extrabold text-gradient">₹{product.price}</span>
                        <Link
                            href={`/checkout?id=${product.id}`}
                            className="flex-1 py-4 bg-white text-black font-bold rounded-xl hover:bg-neon-purple hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
                        >
                            <ShoppingCart className="w-5 h-5" /> Buy Now
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/5">
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold uppercase tracking-tighter text-muted-foreground flex items-center gap-2">
                                <Smartphone className="w-4 h-4" /> Software
                            </h4>
                            <p className="text-sm font-medium">{product.software}</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold uppercase tracking-tighter text-muted-foreground flex items-center gap-2">
                                <Info className="w-4 h-4" /> License
                            </h4>
                            <p className="text-sm font-medium">{product.license}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">What's Included?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {product.included.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                                    <CheckCircle className="w-4 h-4 text-neon-purple" /> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
