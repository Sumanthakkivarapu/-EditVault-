"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, Download, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";

function SuccessContent() {
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("payment_id");
    const email = searchParams.get("email");

    return (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-20 h-20 bg-neon-purple/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-neon-purple/50">
                    <CheckCircle2 className="w-12 h-12 text-neon-purple" />
                </div>

                <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-xl text-muted-foreground mb-12">
                    Thank you for your purchase. Your digital assets are ready.
                </p>

                <div className="glass p-8 rounded-3xl border border-white/10 mb-12 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Download className="w-20 h-20" />
                    </div>

                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Download className="w-5 h-5 text-neon-blue" /> Your Download
                    </h2>

                    <div className="space-y-6">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                            <div>
                                <p className="font-bold">Premium Asset Pack</p>
                                <p className="text-sm text-muted-foreground">Size: 420.5 MB • Version: 1.0</p>
                            </div>
                            <button className="px-6 py-2 bg-neon-purple text-white font-bold rounded-lg hover:shadow-[0_0_15px_rgba(176,38,255,0.6)] transition-all flex items-center gap-2">
                                Download Now
                            </button>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-neon-blue/5 rounded-xl border border-neon-blue/20">
                            <Mail className="w-5 h-5 text-neon-blue mt-1" />
                            <div>
                                <p className="text-sm font-medium">Email sent to <span className="text-white">{email}</span></p>
                                <p className="text-xs text-muted-foreground">We've sent a backup download link and receipt to your inbox.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link href="/store" className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                        Continue Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="text-xs text-muted-foreground">
                        Payment ID: {paymentId}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
