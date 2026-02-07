"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { loadRazorpay } from "@/lib/razorpay";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
    { id: 1, name: "TikTok Trend Transitions", price: 499, tag: "CapCut" },
    { id: 2, name: "Cinematic Master Collection", price: 999, tag: "LUTs" },
    { id: 3, name: "Creator Essentials Pack", price: 1499, tag: "Premiere Pro" },
    { id: 4, name: "After Effects Motion Pro", price: 1999, tag: "After Effects" },
    { id: 5, name: "Lo-Fi Sound FX Pack", price: 299, tag: "Sfx" },
    { id: 6, name: "Instagram Reel Templates", price: 799, tag: "CapCut" },
];

function CheckoutContent() {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");
    const [product, setProduct] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (productId) {
            const found = PRODUCTS.find((p) => p.id === parseInt(productId));
            setProduct(found);
        }
    }, [productId]);

    const handlePayment = async () => {
        if (!email) {
            alert("Please enter your email to receive the download link.");
            return;
        }

        setLoading(true);
        const res = await loadRazorpay();

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            setLoading(false);
            return;
        }

        try {
            const orderRes = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: product.price, productId: product.id }),
            });

            const orderData = await orderRes.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "EditVault",
                description: `Purchase for ${product.name}`,
                order_id: orderData.id,
                handler: async function (response: any) {
                    const verifyRes = await fetch("/api/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        window.location.href = `/success?payment_id=${response.razorpay_payment_id}&order_id=${response.razorpay_order_id}&email=${email}`;
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
                },
                prefill: {
                    email: email,
                },
                theme: {
                    color: "#b026ff",
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <div className="p-20 text-center">Loading product...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left: Product Summary */}
                <div className="glass p-8 rounded-2xl border border-white/10 h-fit">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-muted-foreground">{product.name}</span>
                        <span className="font-bold">₹{product.price}</span>
                    </div>
                    <div className="border-t border-white/5 my-4 pt-4 flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-neon-purple text-2xl">₹{product.price}</span>
                    </div>

                    <div className="mt-8 space-y-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-neon-blue" />
                            <span>Instant download after payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4 text-neon-blue" />
                            <span>Secure checkout via Razorpay</span>
                        </div>
                    </div>
                </div>

                {/* Right: Payment Form */}
                <div className="space-y-8">
                    <div className="glass p-8 rounded-2xl border border-white/10">
                        <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-4">
                            <label className="block">
                                <span className="text-sm font-medium mb-1 block">Email Address</span>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full px-4 py-3 glass rounded-lg border border-white/10 outline-none focus:border-neon-purple/50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <span className="text-[10px] text-muted-foreground mt-2 block">The download link will be sent to this email.</span>
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={loading}
                        className="w-full py-4 bg-white text-black font-extrabold rounded-xl hover:bg-neon-blue hover:text-white transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : (
                            <>
                                <CreditCard className="w-5 h-5" /> Pay with Razorpay
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <Link href="/store" className="text-sm text-muted-foreground hover:text-white transition-colors">
                            ← Cancel and return to store
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="p-20 text-center">Loading checkout...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}
