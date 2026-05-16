"use client";

import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type SavedPlansState = {
  ids: string[];
  loadedFor: string | null; // user id the list was loaded for
  has: (bundleId: string) => boolean;
  /* Loads the signed-in user's saved bundles. No-op if already loaded for
     this user, unconfigured, or logged out. */
  load: () => Promise<void>;
  /* Optimistic add/remove with Supabase write; reverts on error. */
  toggle: (bundleId: string) => Promise<void>;
  reset: () => void;
};

export const useSavedPlans = create<SavedPlansState>((set, get) => ({
  ids: [],
  loadedFor: null,
  has: (bundleId) => get().ids.includes(bundleId),

  load: async () => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      set({ ids: [], loadedFor: null });
      return;
    }
    if (get().loadedFor === user.id) return;

    const { data, error } = await supabase
      .from("saved_plans")
      .select("bundle_id");
    if (error) {
      console.error("loadSavedPlans failed:", error.message);
      return;
    }
    set({
      ids: (data ?? []).map((r) => r.bundle_id as string),
      loadedFor: user.id,
    });
  },

  toggle: async (bundleId) => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const saved = get().ids.includes(bundleId);
    // Optimistic update.
    set((s) => ({
      ids: saved
        ? s.ids.filter((id) => id !== bundleId)
        : [...s.ids, bundleId],
    }));

    const { error } = saved
      ? await supabase
          .from("saved_plans")
          .delete()
          .eq("user_id", user.id)
          .eq("bundle_id", bundleId)
      : await supabase
          .from("saved_plans")
          .insert({ user_id: user.id, bundle_id: bundleId });

    if (error) {
      console.error("toggleSavedPlan failed:", error.message);
      // Revert.
      set((s) => ({
        ids: saved
          ? [...s.ids, bundleId]
          : s.ids.filter((id) => id !== bundleId),
      }));
    }
  },

  reset: () => set({ ids: [], loadedFor: null }),
}));
