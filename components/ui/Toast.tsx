"use client";

import clsx from "clsx";
import { useHasHydrated } from "@/lib/cart-store";
import { useToast, type ToastVariant } from "@/lib/toast-store";

/* Single global stack. Mounted once in app/layout.tsx. Gated on hydration
   (same technique as useHasHydrated) so the server renders nothing and there
   is no SSR/CSR mismatch. Sits above modals (z-50) at z-[60].
   Entrance uses the fade-in-up keyframe from globals.css, which the global
   prefers-reduced-motion rule already clamps to an instant appear. */

const VARIANT: Record<
  ToastVariant,
  { border: string; icon: string; iconColor: string }
> = {
  success: {
    border: "border-l-teal",
    icon: "fas fa-circle-check",
    iconColor: "text-teal",
  },
  error: {
    border: "border-l-danger",
    icon: "fas fa-circle-exclamation",
    iconColor: "text-danger",
  },
  info: {
    border: "border-l-accent",
    icon: "fas fa-circle-info",
    iconColor: "text-accent",
  },
};

export default function ToastViewport() {
  const hydrated = useHasHydrated();
  const { toasts, dismiss } = useToast();

  if (!hydrated || toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[60] flex flex-col gap-3 w-[min(92vw,360px)]"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => {
        const v = VARIANT[t.variant];
        return (
          <div
            key={t.id}
            className={clsx(
              "flex items-start gap-3 bg-white rounded-2xl shadow-md border-l-4 px-4 py-3 animate-[fade-in-up_.25s_ease]",
              v.border,
            )}
          >
            <i
              className={clsx(v.icon, v.iconColor, "mt-0.5 text-base")}
              aria-hidden
            />
            <p className="flex-1 text-sm text-ink-body leading-snug">
              {t.message}
            </p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="shrink-0 w-6 h-6 rounded-full text-ink-muted hover:bg-bg-soft hover:text-ink transition-colors flex items-center justify-center"
            >
              <i className="fas fa-times text-xs" aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
}
