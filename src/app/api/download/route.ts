import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");

    if (!orderId) {
        return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    try {
        // 1. Verify order in Supabase
        const { data: order, error: orderError } = await supabase
            .from("orders")
            .select("*, products(file_url)")
            .eq("order_id", orderId)
            .eq("status", "success")
            .single();

        if (orderError || !order) {
            return NextResponse.json({ error: "Invalid or unpaid order" }, { status: 403 });
        }

        // 2. Extract file path from URL (assuming stored in Supabase Storage)
        // file_url would look like: "products/pack-1.zip"
        const filePath = (order as any).products.file_url;

        // 3. Generate signed URL (valid for 1 hour)
        const { data, error: signError } = await supabase
            .storage
            .from("assets")
            .createSignedUrl(filePath, 3600);

        if (signError || !data?.signedUrl) {
            return NextResponse.json({ error: "Could not generate download link" }, { status: 500 });
        }

        // 4. Redirect to the signed URL
        return NextResponse.redirect(data.signedUrl);

    } catch (error) {
        console.error("Download Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
