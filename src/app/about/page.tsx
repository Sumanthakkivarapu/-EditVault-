"use client";

import { motion } from "framer-motion";
import { Users, Target, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-bold mb-6"
                >
                    About <span className="text-gradient">EditVault</span>
                </motion.h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    We are on a mission to empower creators with high-quality, professional-grade editing assets that make their content stand out in the digital age.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                <div className="glass p-1 rounded-3xl border border-white/10 overflow-hidden">
                    <div className="aspect-video bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center text-muted-foreground font-bold italic">
                        Our Workspace
                    </div>
                </div>
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Why we started EditVault?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        As video editors ourselves, we realized that finding the right presets, LUTs, and templates often takes more time than the actual creative process. We built EditVault to bridge that gap.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Every asset in our store is creator-tested. We use these exact same packs in our own client projects and social media content, ensuring they perform perfectly in real-world scenarios.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: Users, title: "Community Driven", desc: "Built by creators, for creators." },
                    { icon: Target, title: "Precision Crafted", desc: "Every transition and LUT is pixel-perfect." },
                    { icon: ShieldCheck, title: "Secure & Trusted", desc: "Safe payments and instant delivery." },
                    { icon: Heart, title: "Passion for Quality", desc: "We never compromise on the final output." },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="glass p-8 rounded-2xl border border-white/10 text-center"
                    >
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                            <item.icon className="w-6 h-6 text-neon-blue" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
