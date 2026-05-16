"use client";

import { useCartUi } from "@/lib/cart-store";
import { Button } from "@/components/ui/Button";

export default function AccountSignInPrompt() {
  const setAuthOpen = useCartUi((s) => s.setAuthOpen);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-md">
      <div className="w-14 h-14 mx-auto rounded-full bg-accent-light text-accent flex items-center justify-center text-2xl mb-4">
        <i className="fas fa-lock" aria-hidden />
      </div>
      <h2 className="font-display text-2xl text-navy font-bold mb-2">
        Sign in to continue
      </h2>
      <p className="text-ink-body mb-6">
        Your saved plans and order history live here. Sign in or create an
        account to view them.
      </p>
      <Button type="button" onClick={() => setAuthOpen(true)}>
        Sign in <i className="fas fa-arrow-right" aria-hidden />
      </Button>
    </div>
  );
}
