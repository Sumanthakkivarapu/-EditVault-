"use client";

import { motion } from "framer-motion";
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const MOCK_PRODUCTS = [
    { id: 1, name: "TikTok Trend Transitions", price: 499, tag: "CapCut", sales: 24 },
    { id: 2, name: "Cinematic Master Collection", price: 999, tag: "LUTs", sales: 18 },
    { id: 3, name: "Creator Essentials Pack", price: 1499, tag: "Premiere Pro", sales: 6 },
];

export default function AdminProducts() {
    const [search, setSearch] = useState("");

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Product Inventory</h1>
                    <p className="text-muted-foreground">Manage your digital assets and pricing.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neon-purple hover:text-white transition-all flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Add New Asset
                </Link>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Filter assets..."
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-neon-purple/50 outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-white/5">
                                <th className="px-4 py-3">Product Name</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Sales</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="text-sm hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center text-[10px] uppercase font-bold text-muted-foreground">
                                            {product.tag.slice(0, 2)}
                                        </div>
                                        <div>
                                            <p className="font-bold">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">{product.tag}</p>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 font-medium text-neon-blue">₹{product.price}</td>
                                    <td className="px-4 py-4 font-bold">{product.sales}</td>
                                    <td className="px-4 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/product/${product.id}`} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-white">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-white">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
