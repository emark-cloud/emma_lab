/* Typed wrapper around the Express backend.
   All endpoints normalise to { ok, data?, message? } at the call site. */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export type ApiResult<T = unknown> =
  | { ok: true; data: T }
  | { ok: false; message: string };

async function postJson<T>(path: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    } & T;
    if (!res.ok || data.success === false) {
      return { ok: false, message: data.message || "Request failed." };
    }
    return { ok: true, data: data as T };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Network error.",
    };
  }
}

/* ── Contact / newsletter ─────────────────────────── */
export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};
export const submitContact = (p: ContactPayload) =>
  postJson<{ message: string }>("/contact", p);

export const subscribeNewsletter = (email: string) =>
  postJson<{ message: string }>("/newsletter", { email });

/* ── Checkout: OTP + payment ──────────────────────── */
export const sendOtp = (email: string, name: string, resend = false) =>
  postJson<{ message: string }>("/send-otp", { email, name, resend });

export const verifyOtp = (email: string, otp: string) =>
  postJson<{ message: string }>("/verify-otp", { email, otp });

export type InitiatePaymentPayload = {
  email: string;
  name: string;
  phone: string;
  amount: number;
  currency?: string;
  items: { name: string; price: number }[];
};
export const initiatePayment = (p: InitiatePaymentPayload) =>
  postJson<{ txRef: string }>("/initiate-payment", p);

export const verifyPayment = (params: {
  transaction_id: string | number;
  tx_ref: string;
  expected_amount?: number;
  expected_currency?: string;
}) => postJson<{ verified: boolean }>("/verify-payment", params);
