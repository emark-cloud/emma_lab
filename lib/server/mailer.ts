import nodemailer from "nodemailer";

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_TO = process.env.CONTACT_TO || SMTP_USER || "";

if (!SMTP_USER || !SMTP_PASS) {
  console.warn(
    "[Warning] SMTP_USER / SMTP_PASS not set — contact and newsletter emails will fail.",
  );
}

declare global {
  // eslint-disable-next-line no-var
  var __emmaLabTransporter: nodemailer.Transporter | undefined;
}

function getTransporter(): nodemailer.Transporter {
  if (globalThis.__emmaLabTransporter) return globalThis.__emmaLabTransporter;
  globalThis.__emmaLabTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { rejectUnauthorized: false },
  });
  return globalThis.__emmaLabTransporter;
}

function escapeHtml(str = ""): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}): Promise<void> {
  const safe = {
    firstName: escapeHtml(input.firstName),
    lastName: escapeHtml(input.lastName),
    email: escapeHtml(input.email),
    phone: escapeHtml(input.phone),
    message: escapeHtml(input.message).replace(/\n/g, "<br/>"),
  };
  await getTransporter().sendMail({
    from: `"Emma Lab Site" <${SMTP_USER}>`,
    to: CONTACT_TO,
    replyTo: input.email,
    subject: `New contact form submission — ${input.firstName} ${input.lastName}`,
    text:
      `New contact form submission\n\n` +
      `Name:  ${input.firstName} ${input.lastName}\n` +
      `Email: ${input.email}\n` +
      `Phone: ${input.phone}\n\n` +
      `Message:\n${input.message}`,
    html: `<div style="font-family:Segoe UI,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#f5f8fb;">
  <div style="background:#fff;border-radius:12px;padding:28px;box-shadow:0 4px 16px rgba(13,45,79,.08);">
    <h2 style="color:#0d2d4f;margin:0 0 16px;">New contact form submission</h2>
    <p><strong>Name:</strong> ${safe.firstName} ${safe.lastName}</p>
    <p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
    <p><strong>Phone:</strong> ${safe.phone}</p>
    <hr style="border:none;border-top:1px solid #eef3f9;margin:20px 0;"/>
    <p style="white-space:pre-wrap;">${safe.message}</p>
  </div>
</div>`,
  });
}

export async function sendNewsletterEmail(email: string): Promise<void> {
  await getTransporter().sendMail({
    from: `"Emma Lab Site" <${SMTP_USER}>`,
    to: CONTACT_TO,
    subject: `Newsletter subscription — ${email}`,
    text: `New newsletter subscriber: ${email}\nReceived: ${new Date().toISOString()}`,
  });
}
