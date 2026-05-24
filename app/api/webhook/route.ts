import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { orderStore } from "@/lib/server/stores";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* Paystack signs the raw request body with HMAC-SHA512 using the secret key
   and puts the hex digest in the `x-paystack-signature` header. We must
   verify against the bytes Paystack signed — so use req.text(), not
   req.json(), before parsing. */
export async function POST(req: Request) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const signature = req.headers.get("x-paystack-signature");

    if (!secret || !signature) {
      console.warn("[Webhook] Missing signature or secret — rejected");
      return NextResponse.json(
        { success: false, message: "Invalid webhook signature." },
        { status: 401 },
      );
    }

    const raw = await req.text();
    const expected = crypto
      .createHmac("sha512", secret)
      .update(raw)
      .digest("hex");

    const sigBuf = Buffer.from(signature, "utf8");
    const expBuf = Buffer.from(expected, "utf8");

    if (
      sigBuf.length !== expBuf.length ||
      !crypto.timingSafeEqual(sigBuf, expBuf)
    ) {
      console.warn("[Webhook] Invalid signature — rejected");
      return NextResponse.json(
        { success: false, message: "Invalid webhook signature." },
        { status: 401 },
      );
    }

    const event = JSON.parse(raw) as {
      event?: string;
      data?: { reference?: string };
    };
    const reference = event.data?.reference;
    console.log(`[Webhook] Event: ${event.event} reference=${reference}`);

    if (event.event === "charge.success" && reference) {
      const order = orderStore.get(reference);
      if (order && order.status === "pending") {
        order.status = "webhook_confirmed";
        order.webhookAt = new Date().toISOString();
        orderStore.set(reference, order);
        /* TODO: trigger lab booking workflow, send email, etc. */
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Webhook Error]", err instanceof Error ? err.message : err);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
