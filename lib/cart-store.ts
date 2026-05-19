"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = { id: string; name: string; price: number };

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
  has: (id: string) => boolean;
};

/* Persist key matches the legacy localStorage entry so existing visitors
   keep their cart through the cutover. */
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) =>
          s.items.find((i) => i.id === item.id)
            ? s
            : { items: [...s.items, item] },
        ),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price, 0),
      has: (id) => get().items.some((i) => i.id === id),
    }),
    {
      name: "emmalab_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

/* UI store: which client surface (cart drawer, checkout, auth modal) is
   open right now. authOpen lives here so any component (e.g. a plan card)
   can prompt sign-in, not just the navbar. */
type UiState = {
  cartOpen: boolean;
  checkoutOpen: boolean;
  authOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setAuthOpen: (open: boolean) => void;
};

export const useCartUi = create<UiState>((set) => ({
  cartOpen: false,
  checkoutOpen: false,
  authOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  setCheckoutOpen: (open) => set({ checkoutOpen: open }),
  setAuthOpen: (open) => set({ authOpen: open }),
}));

/* Gate dynamic UI on hydration to avoid SSR/CSR mismatches. The server
   snapshot is always false and the client snapshot always true, so the
   first client render matches the server output and flips post-hydration
   — the canonical useSyncExternalStore hydration pattern. */
const noopSubscribe = () => () => {};
export function useHasHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
