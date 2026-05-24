import { NextResponse } from "next/server";
import { orderStore } from "@/lib/server/stores";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PaystackVerifyData = {
  status?: string;
  amount?: number;
  currency?: string;
  reference?: string;
};

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit("verify", ip, { windowMs: 5 * 60 * 1000, max: 10 });
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, message: "Too many verification attempts." },
      { status: 429 },
    );
  }

  try {
    const body = (await req.json()) as {
      reference?: string;
      expected_amount?: number;
      expected_currency?: string;
      dev?: boolean;
    };
    const { reference, expected_amount, expected_currency, dev } = body;

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Missing reference." },
        { status: 400 },
      );
    }

    const order = orderStore.get(reference);
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Unknown transaction reference." },
        { status: 400 },
      );
    }

    if (order.status === "verified") {
      return NextResponse.json({
        success: true,
        verified: true,
        message: "Payment already verified.",
      });
    }

    /* DEV SHORT-CIRCUIT — mirrors the frontend's no-Paystack-key fallback
       so the success flow is reachable in local dev without a real charge.
       Gated so it CANNOT fire in production. */
    if (process.env.NODE_ENV !== "production" && dev === true) {
      const amountOk = (expected_amount || order.amount) >= order.amount;
      if (!amountOk) {
        return NextResponse.json(
          { success: false, verified: false, message: "Amount mismatch on dev verification." },
          { status: 400 },
        );
      }
      order.status = "verified";
      order.paystack_reference = reference;
      order.verifiedAt = new Date().toISOString();
      order.devBypass = true;
      orderStore.set(reference, order);
      console.log(
        `[Payment] DEV-VERIFIED (dev mode, no real charge) reference=${reference}`,
      );
      return NextResponse.json({
        success: true,
        verified: true,
        message: "Payment verified (dev mode — no real charge).",
        reference,
      });
    }

    /* Real verification: call Paystack with the SECRET KEY (server only). */
    const secret = process.env.PAYSTACK_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Server missing PAYSTACK_SECRET_KEY." },
        { status: 500 },
      );
    }

    const pstkRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10_000),
      },
    );

    const pstkJson = (await pstkRes.json().catch(() => ({}))) as {
      data?: PaystackVerifyData;
    };
    const data = pstkJson.data;

    if (!data) {
      return NextResponse.json(
        { success: false, verified: false, message: "Invalid response from Paystack." },
        { status: 400 },
      );
    }

    const expectedAmountKobo = Math.round(
      (expected_amount || order.amount) * 100,
    );
    const statusOk = data.status === "success";
    const amountOk = (data.amount ?? 0) >= expectedAmountKobo;
    const currencyOk =
      data.currency === (expected_currency || order.currency || "NGN");
    const referenceOk = data.reference === reference;

    if (!statusOk || !amountOk || !currencyOk || !referenceOk) {
      console.warn(`[Verify] FAILED checks for reference=${reference}`, {
        statusOk,
        amountOk,
        currencyOk,
        referenceOk,
        pstkStatus: data.status,
        pstkAmount: data.amount,
        expectedAmountKobo,
      });
      return NextResponse.json(
        {
          success: false,
          verified: false,
          message: "Payment verification failed. Please contact support.",
        },
        { status: 400 },
      );
    }

    order.status = "verified";
    order.paystack_reference = reference;
    order.paystack_status = data.status;
    order.verifiedAt = new Date().toISOString();
    orderStore.set(reference, order);

    console.log(
      `[Payment] VERIFIED reference=${reference} amount_kobo=${data.amount}`,
    );

    return NextResponse.json({
      success: true,
      verified: true,
      message: "Payment verified successfully.",
      reference,
    });
  } catch (err) {
    console.error(
      "[Verify Payment Error]",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      {
        success: false,
        verified: false,
        message: "Verification service error. Contact support.",
      },
      { status: 500 },
    );
  }
}
