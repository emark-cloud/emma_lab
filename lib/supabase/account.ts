import { createClient } from "./client";
import { isSupabaseConfigured } from "./config";

export type OrderItem = { id: string; name: string; price: number };

export type Order = {
  id: string;
  reference: string | null;
  items: OrderItem[];
  total: number;
  currency: string;
  status: string;
  created_at: string;
};

/* Records a completed purchase against the signed-in user. Best-effort:
   a logged-out checkout (or unconfigured Supabase) is a silent no-op so
   the success flow is never blocked. Authoritative order writes move to
   the backend when the payment rewrite lands. */
export async function recordOrder(input: {
  reference: string | null;
  items: OrderItem[];
  total: number;
  currency?: string;
}): Promise<void> {
  if (!isSupabaseConfigured) return;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from("orders").insert({
    user_id: user.id,
    reference: input.reference,
    items: input.items,
    total: input.total,
    currency: input.currency ?? "NGN",
  });
  if (error) console.error("recordOrder failed:", error.message);
}

export async function listOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("id, reference, items, total, currency, status, created_at")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listOrders failed:", error.message);
    return [];
  }
  return (data ?? []) as Order[];
}
