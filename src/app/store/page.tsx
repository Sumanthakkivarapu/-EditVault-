"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Loader2 } from "lucide-react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

const CATEGORIES = ["All", "CapCut", "Premiere Pro", "After Effects", "LUTs", "Sfx"];

export default function Store() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p =>
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
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="aspect-video glass rounded-xl border border-white/10 animate-pulse flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-white/10 animate-spin" />
                        </div>
                    ))
                ) : filteredProducts.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                        <p className="text-xl text-muted-foreground">No assets found matching your criteria.</p>
                    </div>
                ) : (
                    filteredProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group glass rounded-xl overflow-hidden border border-white/10 hover:border-neon-purple/30 transition-all flex flex-col"
                        >
                            <Link href={`/product/${product.id}`} className="block aspect-video bg-muted relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground group-hover:scale-105 transition-transform">
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        "Preview Image"
                                    )}
                                </div>
                                <div className="absolute top-2 left-2 px-2 py-0.5 glass border border-white/10 rounded text-[10px] font-bold uppercase backdrop-blur-md">
                                    {product.tag}
                                </div>
                            </Link>

                            <div className="p-6 flex-1 flex flex-col">
                                <Link href={`/product/${product.id}`}>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-neon-purple transition-colors">{product.name}</h3>
                                </Link>
                                <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">{product.description || product.desc}</p>

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
                    ))
                )}
            </div>
        </div>
    );
}
