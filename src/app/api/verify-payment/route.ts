import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, amount } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            const supabase = getSupabase();
            // 1. Save to Supabase
            const { error: dbError } = await supabase
                .from("orders")
                .insert([{
                    order_id: razorpay_order_id,
                    payment_id: razorpay_payment_id,
                    amount: amount,
                    status: "success",
                    email: email
                }]);

            if (dbError) {
                console.error("Supabase Error:", dbError);
                // Even if DB fails, payment was successful at Razorpay. 
                // In production, use webhooks and robust retry logic.
            }

            return NextResponse.json({ message: "Payment verified successfully", success: true });
        } else {
            return NextResponse.json({ message: "Payment verification failed", success: false }, { status: 400 });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
