import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_KEY } from "./config";

/* Browser-side Supabase client for Client Components.
   Safe to call on every render — createBrowserClient is memoised internally. */
export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
}
