/* In-memory store for payment orders. Hung off globalThis so Next's HMR
   doesn't blow it away on every save. Swap for Postgres when we go
   multi-instance. */

export type OrderRecord = {
  email: string;
  name: string;
  phone: string;
  amount: number;
  currency: string;
  items: { name: string; price: number }[];
  status:
    | "pending"
    | "verified"
    | "webhook_confirmed"
    | "failed";
  createdAt: string;
  verifiedAt?: string;
  webhookAt?: string;
  paystack_reference?: string;
  paystack_status?: string;
  devBypass?: boolean;
};

declare global {
  // eslint-disable-next-line no-var
  var __emmaLabOrderStore: Map<string, OrderRecord> | undefined;
}

export const orderStore: Map<string, OrderRecord> =
  globalThis.__emmaLabOrderStore ??
  (globalThis.__emmaLabOrderStore = new Map());
