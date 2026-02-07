"use client";

import { useEffect, useState } from "react";
import { Search, ShoppingCart, RefreshCw, Filter } from "lucide-react";
import { getSupabase } from "@/lib/supabase";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchOrders = async () => {
        setLoading(true);
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setOrders(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter(o =>
        o.order_id.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase()) ||
        o.payment_id?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Sales & Orders</h1>
                    <p className="text-muted-foreground">Monitor transactions and payment status.</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="px-6 py-3 glass border border-white/10 rounded-xl hover:bg-white/5 transition-all flex items-center gap-2"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
            </div>

            <div className="glass p-6 rounded-2xl border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by ID or Email..."
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
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Customer Email</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-20 text-center text-muted-foreground italic">
                                        Fetching orders...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-20 text-center text-muted-foreground italic">
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.order_id} className="text-sm hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-4 font-mono text-xs">{order.order_id}</td>
                                        <td className="px-4 py-4">{order.email}</td>
                                        <td className="px-4 py-4 font-bold text-neon-blue">₹{order.amount}</td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${order.status === "success"
                                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                    : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-xs text-muted-foreground">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
