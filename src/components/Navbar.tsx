"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gradient tracking-tighter">EditVault</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8 text-sm font-medium">
                            <Link href="/" className="hover:text-neon-purple transition-colors">Home</Link>
                            <Link href="/store" className="hover:text-neon-purple transition-colors">Store</Link>
                            <Link href="/about" className="hover:text-neon-purple transition-colors">About</Link>
                            <Link href="/contact" className="hover:text-neon-purple transition-colors">Contact</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:text-neon-blue transition-colors relative">
                            <ShoppingCart className="w-6 h-6" />
                            <span className="absolute top-0 right-0 w-4 h-4 bg-neon-purple text-[10px] flex items-center justify-center rounded-full">0</span>
                        </button>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 hover:text-neon-purple transition-colors"
                            >
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-neon-purple">Home</Link>
                            <Link href="/store" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-neon-purple">Store</Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-neon-purple">About</Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:text-neon-purple">Contact</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
