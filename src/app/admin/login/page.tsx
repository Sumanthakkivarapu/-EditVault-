"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // In a real app, this should be a server action or API call
        // For this demonstration, we'll set the cookie on the client (not ideal but works for basic lock)
        // The middleware will verify the value against the server environment variable

        document.cookie = `admin-session=${password}; path=/; max-age=86400; SameSite=Lax`;
        window.location.href = "/admin";
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full glass p-10 rounded-3xl border border-white/10 text-center"
            >
                <div className="w-16 h-16 bg-neon-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-neon-purple/30">
                    <Lock className="w-8 h-8 text-neon-purple" />
                </div>

                <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
                <p className="text-muted-foreground mb-10">Enter your credentials to manage EditVault.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2 text-left">
                        <span className="text-sm font-medium ml-1">Master Password</span>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-4 glass rounded-xl border border-white/10 outline-none focus:border-neon-purple/50 bg-[#0a0a0a]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-sm">
                            <ShieldAlert className="w-4 h-4" /> Invalid password. Please try again.
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neon-purple hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                        Enter Console <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <p className="mt-8 text-xs text-muted-foreground">
                    Protected by EditVault Security Integration.
                </p>
            </motion.div>
        </div>
    );
}
