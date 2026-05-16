"use client";

import { useEffect } from "react";
import { useUser } from "@/lib/hooks/useUser";
import { useSavedPlans } from "@/lib/saved-plans-store";

/* Keeps the saved-plans store in sync with auth: loads on sign-in,
   clears on sign-out. Mounted once in the root layout. */
export default function AccountSync() {
  const { user, loading } = useUser();
  const load = useSavedPlans((s) => s.load);
  const reset = useSavedPlans((s) => s.reset);

  useEffect(() => {
    if (loading) return;
    if (user) load();
    else reset();
  }, [user, loading, load, reset]);

  return null;
}
