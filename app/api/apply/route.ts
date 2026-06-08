import { NextRequest, NextResponse } from "next/server";
import { sendApplicationEmail } from "@/lib/server/mailer";

const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const fullName = (formData.get("fullName") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const position = (formData.get("position") as string | null)?.trim() ?? "";
  const coverLetter = (formData.get("coverLetter") as string | null)?.trim() ?? "";
  const cv = formData.get("cv") as File | null;

  if (!fullName || !email || !phone || !position || !coverLetter) {
    return NextResponse.json({ message: "Please fill in all required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (!cv || cv.size === 0) {
    return NextResponse.json({ message: "Please attach your CV or resume." }, { status: 400 });
  }
  if (!ALLOWED_MIME.includes(cv.type)) {
    return NextResponse.json({ message: "CV must be a PDF or Word document." }, { status: 400 });
  }
  if (cv.size > MAX_FILE_BYTES) {
    return NextResponse.json({ message: "CV file must be under 5 MB." }, { status: 400 });
  }

  const cvBuffer = Buffer.from(await cv.arrayBuffer());

  try {
    await sendApplicationEmail({
      fullName,
      email,
      phone,
      position,
      coverLetter,
      cvFileName: cv.name,
      cvBuffer,
      cvMimeType: cv.type,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[apply] email send error:", err);
    return NextResponse.json(
      { message: "Failed to send your application. Please try again." },
      { status: 500 },
    );
  }
}
