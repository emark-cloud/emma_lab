import { NextResponse } from "next/server";
import { sendNewsletterEmail } from "@/lib/server/mailer";
import { clientIp, rateLimit } from "@/lib/server/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limit = rateLimit("contact", ip, { windowMs: 15 * 60 * 1000, max: 5 });
  if (!limit.ok) {
    return NextResponse.json(
      { success: false, message: "Too many submissions. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = (await req.json()) as { email?: string };
    const email = String(body.email ?? "").trim();
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, message: "A valid email is required." },
        { status: 400 },
      );
    }
    await sendNewsletterEmail(email);
    console.log(`[Newsletter] ${email} at ${new Date().toISOString()}`);
    return NextResponse.json({ success: true, message: "Subscribed." });
  } catch (err) {
    console.error(
      "[Newsletter Error]",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      { success: false, message: "Subscription failed. Please try again." },
      { status: 500 },
    );
  }
}
