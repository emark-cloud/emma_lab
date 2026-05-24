/* Typed wrapper around the Express backend.
   All endpoints normalise to { ok, data?, message? } at the call site. */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";

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

/* ── Checkout: payment ────────────────────────────── */
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
  reference: string;
  expected_amount?: number;
  expected_currency?: string;
  dev?: boolean;
}) => postJson<{ verified: boolean }>("/verify-payment", params);
