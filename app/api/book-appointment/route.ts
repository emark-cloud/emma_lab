import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/server/mailer";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit("booking", ip, { windowMs: 15 * 60 * 1000, max: 5 });
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const fullName = String(body.fullName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const preferredDate = String(body.preferredDate ?? "").trim();
    const preferredTime = String(body.preferredTime ?? "").trim();

    if (!fullName) {
      return NextResponse.json({ success: false, message: "Full name is required." }, { status: 400 });
    }
    if (!phone || phone.length < 7) {
      return NextResponse.json({ success: false, message: "A valid phone number is required." }, { status: 400 });
    }
    if (!preferredDate) {
      return NextResponse.json({ success: false, message: "Preferred date is required." }, { status: 400 });
    }
    if (!preferredTime) {
      return NextResponse.json({ success: false, message: "Preferred time is required." }, { status: 400 });
    }

    await sendBookingEmail({ fullName, phone, preferredDate, preferredTime });
    console.log(`[Booking] ${fullName} (${phone}) for ${preferredDate} at ${preferredTime}`);
    return NextResponse.json({ success: true, message: "Booking received." });
  } catch (err) {
    console.error("[Booking Error]", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, message: "Failed to submit booking. Please try again." },
      { status: 500 },
    );
  }
}
