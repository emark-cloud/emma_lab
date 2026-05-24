/* NEXT_PUBLIC_ vars are inlined at build time, so these are safe to read
   on both server and client. Until the Supabase project is wired up, auth
   degrades gracefully instead of 500-ing every request (same spirit as the
   Paystack dev fallback). */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);
