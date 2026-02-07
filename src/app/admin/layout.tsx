"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    LogOut,
    ExternalLink,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIDEBAR_ITEMS = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin" },
    { name: "Products", icon: Package, href: "/admin/products" },
    { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex flex-col w-64 glass border-r border-white/10 transition-all duration-300 ${!isSidebarOpen ? "w-20" : "w-64"}`}>
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && <span className="text-xl font-bold text-gradient">Admin Console</span>}
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    {SIDEBAR_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-white/10 space-y-4">
                    <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        {isSidebarOpen && <span>View Store</span>}
                    </Link>
                    <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full text-left">
                        <LogOut className="w-4 h-4" />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="md:hidden glass p-4 flex items-center justify-between border-b border-white/10">
                    <span className="text-lg font-bold text-gradient">EditVault Admin</span>
                    <button className="p-2"><Menu className="w-6 h-6" /></button>
                </header>
                <div className="p-8 pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
