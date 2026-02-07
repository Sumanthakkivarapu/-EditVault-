"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewProduct() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        tag: "CapCut",
        description: "",
        software: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Product added successfully! (Simulated)");
        window.location.href = "/admin/products";
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <Link href="/admin/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Inventory
            </Link>

            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Add New Asset</h1>
                <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-neon-purple text-white font-bold rounded-xl hover:shadow-[0_0_15px_rgba(176,38,255,0.4)] transition-all flex items-center gap-2"
                >
                    <Save className="w-5 h-5" /> Publish Asset
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
                        <h2 className="text-xl font-bold">General Information</h2>
                        <div className="space-y-4">
                            <label className="block space-y-2">
                                <span className="text-sm font-medium">Product Name</span>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-neon-purple/50"
                                    placeholder="e.g. Cinematic VFX Presets"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-medium">Description</span>
                                <textarea
                                    rows={6}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-neon-purple/50 resize-none"
                                    placeholder="Describe the asset, its features, and what's included..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </label>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
                        <h2 className="text-xl font-bold">Technical Specifics</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <label className="block space-y-2">
                                <span className="text-sm font-medium">Software Compatibility</span>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-neon-purple/50"
                                    placeholder="e.g. Adobe Premiere Pro"
                                    value={formData.software}
                                    onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                                />
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-medium">Software Tag</span>
                                <select
                                    className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-xl outline-none focus:border-neon-purple/50"
                                    value={formData.tag}
                                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                                >
                                    <option>CapCut</option>
                                    <option>Premiere Pro</option>
                                    <option>After Effects</option>
                                    <option>LUTs</option>
                                    <option>Sfx</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
                        <h2 className="text-xl font-bold">Pricing</h2>
                        <div className="space-y-2">
                            <span className="text-sm font-medium">Price (INR)</span>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                                <input
                                    type="number"
                                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-neon-purple/50"
                                    placeholder="499"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
                        <h2 className="text-xl font-bold">Product File</h2>
                        <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-neon-blue/50 transition-colors group cursor-pointer">
                            <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground group-hover:text-neon-blue transition-colors" />
                            <p className="text-sm font-medium mb-1">Click to upload asset</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ZIP, MP4, CUBE (MAX 100MB)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
