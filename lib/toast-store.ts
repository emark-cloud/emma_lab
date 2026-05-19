"use client";

import { create } from "zustand";

/* Transient feedback store. Mirrors the useCartUi shape in cart-store.ts:
   in-memory only — NEVER persisted (must not touch the emmalab_cart key). */

export type ToastVariant = "success" | "error" | "info";

export type Toast = {
  id: string;
  message: string;
  variant: ToastVariant;
};

type ToastState = {
  toasts: Toast[];
  show: (message: string, variant?: ToastVariant, ms?: number) => void;
  dismiss: (id: string) => void;
};

export const useToast = create<ToastState>((set, get) => ({
  toasts: [],
  show: (message, variant = "info", ms = 3000) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`;
    set((s) => ({ toasts: [...s.toasts, { id, message, variant }] }));
    if (ms > 0) {
      setTimeout(() => get().dismiss(id), ms);
    }
  },
  dismiss: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
