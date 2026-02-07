"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

export default function NewProduct() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        tag: "CapCut",
        description: "",
        software: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !formData.name || !formData.price) {
            alert("Please fill in all required fields and upload a file.");
            return;
        }

        setLoading(true);
        try {
            const supabase = getSupabase();

            // 1. Upload file to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `products/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("assets")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Insert record to Database
            const { error: dbError } = await supabase
                .from("products")
                .insert([{
                    name: formData.name,
                    price: parseInt(formData.price),
                    tag: formData.tag,
                    description: formData.description,
                    software: formData.software,
                    file_url: filePath, // This is the storage path used in /api/download
                    image_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" // Default premium placeholder
                }]);

            if (dbError) throw dbError;

            alert("Product added successfully!");
            window.location.href = "/admin/products";
        } catch (error: any) {
            console.error("Error adding product:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
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
                    disabled={loading}
                    className={`px-6 py-3 bg-neon-purple text-white font-bold rounded-xl transition-all flex items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_0_15px_rgba(176,38,255,0.4)] hover:scale-105 active:scale-95'}`}
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {loading ? "Publishing..." : "Publish Asset"}
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
                        <div
                            onClick={() => document.getElementById('file-upload')?.click()}
                            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all group cursor-pointer ${file ? 'border-neon-purple/50 bg-neon-purple/5' : 'border-white/10 hover:border-neon-blue/50'}`}
                        >
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                            {file ? (
                                <div className="space-y-2">
                                    <CheckCircle className="w-10 h-10 mx-auto text-neon-purple" />
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="text-[10px] text-red-400 uppercase font-bold hover:underline"
                                    >
                                        Remove File
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground group-hover:text-neon-blue transition-colors" />
                                    <p className="text-sm font-medium mb-1">Click to upload asset</p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ZIP, MP4, CUBE (MAX 100MB)</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
