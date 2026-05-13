"use client";

import { useEffect, useState } from "react";
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

/* UI store: which client surface (cart drawer, checkout) is open right now. */
type UiState = {
  cartOpen: boolean;
  checkoutOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
};

export const useCartUi = create<UiState>((set) => ({
  cartOpen: false,
  checkoutOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  setCheckoutOpen: (open) => set({ checkoutOpen: open }),
}));

/* Gate dynamic UI on Zustand-persist hydration to avoid SSR/CSR mismatches. */
export function useHasHydrated(): boolean {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
