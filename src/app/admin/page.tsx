"use client";

import { motion } from "framer-motion";
import {
    TrendingUp,
    Users,
    Package,
    DollarSign,
    ArrowUpRight,
    ShoppingCart
} from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        { label: "Total Revenue", value: "₹24,500", icon: DollarSign, trend: "+12%", color: "text-green-400" },
        { label: "Orders", value: "48", icon: ShoppingCart, trend: "+5%", color: "text-blue-400" },
        { label: "Products", value: "12", icon: Package, trend: "0%", color: "text-purple-400" },
        { label: "New Customers", value: "32", icon: Users, trend: "+18%", color: "text-pink-400" },
    ];

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-2xl border border-white/10"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-white/5 border border-white/10 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className={`text-xs font-bold flex items-center gap-1 ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>
                                {stat.trend} <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
                        <p className="text-2xl font-bold mt-1 text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders Table */}
                <div className="glass p-6 rounded-2xl border border-white/10 overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Recent Orders</h2>
                        <button className="text-sm text-neon-blue hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-white/5">
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { id: "#4032", status: "Success", amount: "₹499" },
                                    { id: "#4031", status: "Success", amount: "₹999" },
                                    { id: "#4030", status: "Pending", amount: "₹1,499" },
                                ].map((order, i) => (
                                    <tr key={i} className="text-sm hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-4">{order.id}</td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${order.status === "Success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 font-bold">{order.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass p-6 rounded-2xl border border-white/10">
                    <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-4 bg-neon-purple/10 border border-neon-purple/20 rounded-xl hover:bg-neon-purple/20 transition-all text-center group">
                            <Package className="w-8 h-8 mx-auto mb-3 text-neon-purple group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold block text-white/90">Add Product</span>
                        </button>
                        <button className="p-4 bg-neon-blue/10 border border-neon-blue/20 rounded-xl hover:bg-neon-blue/20 transition-all text-center group">
                            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-neon-blue group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold block text-white/90">View Reports</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
