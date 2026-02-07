"use client";

import { useEffect, useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CheckCircle, Smartphone, Monitor, Info, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            if (data) setProduct(data);
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-neon-purple animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                <Link href="/store" className="text-neon-blue hover:underline">Return to Store</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/store" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8">
                <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Preview */}
                <div className="space-y-6">
                    <div className="aspect-video glass rounded-3xl border border-white/10 flex items-center justify-center text-muted-foreground relative overflow-hidden group">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xl font-bold group-hover:scale-110 transition-transform">Preview Image</span>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Right: Info */}
                <div className="space-y-8">
                    <div>
                        <span className="px-3 py-1 glass border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-neon-blue mb-4 inline-block">
                            {product.tag}
                        </span>
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">{product.description || product.desc}</p>
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
                            <p className="text-sm font-medium">{product.software || "N/A"}</p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold uppercase tracking-tighter text-muted-foreground flex items-center gap-2">
                                <Info className="w-4 h-4" /> License
                            </h4>
                            <p className="text-sm font-medium">Personal / Commercial Use</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-bold">What's Included?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(product.included || ["Full Asset Package", "License Key", "Tutorial Guide"]).map((item: any, i: number) => (
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
