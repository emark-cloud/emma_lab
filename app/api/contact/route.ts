import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/server/mailer";
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
    const body = (await req.json()) as Record<string, unknown>;
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, message: "First and last name are required." },
        { status: 400 },
      );
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, message: "A valid email is required." },
        { status: 400 },
      );
    }
    if (!phone || phone.length < 7) {
      return NextResponse.json(
        { success: false, message: "A valid phone number is required." },
        { status: 400 },
      );
    }
    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, message: "Please include a brief message." },
        { status: 400 },
      );
    }
    if (message.length > 4000) {
      return NextResponse.json(
        { success: false, message: "Message is too long." },
        { status: 400 },
      );
    }

    await sendContactEmail({ firstName, lastName, email, phone, message });
    console.log(
      `[Contact] ${email} (${firstName} ${lastName}) at ${new Date().toISOString()}`,
    );
    return NextResponse.json({ success: true, message: "Message received." });
  } catch (err) {
    console.error("[Contact Error]", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
