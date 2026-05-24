import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { orderStore, type OrderRecord } from "@/lib/server/stores";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      email?: string;
      name?: string;
      phone?: string;
      amount?: number;
      currency?: string;
      items?: { name: string; price: number }[];
    };
    const { email, name, phone, amount, currency, items } = body;

    if (
      !email ||
      !name ||
      !phone ||
      !amount ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required payment details." },
        { status: 400 },
      );
    }

    if (typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid payment amount." },
        { status: 400 },
      );
    }

    const txRef = `EMMALAB-${Date.now()}-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

    const order: OrderRecord = {
      email,
      name,
      phone,
      amount,
      currency: currency || "NGN",
      items,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    orderStore.set(txRef, order);

    console.log(
      `[Payment] Initiated txRef=${txRef} amount=${amount} email=${email}`,
    );

    return NextResponse.json({ success: true, txRef });
  } catch (err) {
    console.error(
      "[Initiate Payment Error]",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      { success: false, message: "Could not initiate payment." },
      { status: 500 },
    );
  }
}
