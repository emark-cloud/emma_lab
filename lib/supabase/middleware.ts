import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_URL, SUPABASE_KEY, isSupabaseConfigured } from "./config";

/* Refreshes the Supabase auth token on every request and writes any rotated
   cookies onto the response. Uses the plain NextResponse.next() + response
   cookie pattern documented for the Next 16 proxy convention — passing the
   request into NextResponse.next() breaks sub-route resolution in Next 16. */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next();

  // Until Supabase env vars are set, skip auth entirely so the site still
  // serves (mirrors the Paystack dev fallback).
  if (!isSupabaseConfigured) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Do not run code between createServerClient and getClaims — it refreshes
  // the token, and a gap here can log users out at random.
  await supabase.auth.getClaims();

  return response;
}
