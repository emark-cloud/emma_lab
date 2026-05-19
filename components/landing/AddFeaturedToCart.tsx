"use client";

import clsx from "clsx";
import { useCart, useHasHydrated } from "@/lib/cart-store";
import { useToast } from "@/lib/toast-store";

/* Add-to-basket for the homepage featured bundles. Mirrors PlanCard's
   button behaviour (toggle add/remove + toast + hydration gating) so the
   cart works identically from the landing page. */
export default function AddFeaturedToCart({
  id,
  name,
  price,
  featured,
}: {
  id: string;
  name: string;
  price: number;
  featured?: boolean;
}) {
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const has = useCart((s) => s.has(id));
  const hydrated = useHasHydrated();
  const inCart = hydrated && has;
  const showToast = useToast((s) => s.show);

  return (
    <button
      type="button"
      aria-label={
        inCart ? `Remove ${name} from basket` : `Add ${name} to basket`
      }
      onClick={() => {
        if (inCart) {
          remove(id);
          showToast(`${name} removed from basket`, "info");
        } else {
          add({ id, name, price });
          showToast(`${name} added to basket`, "success");
        }
      }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5",
        inCart
          ? "bg-teal text-white hover:bg-teal/90"
          : featured
            ? "bg-white text-navy hover:bg-accent-light"
            : "bg-navy text-white hover:bg-accent",
      )}
    >
      {inCart ? (
        <>
          <i className="fas fa-check" aria-hidden /> Added to Basket
        </>
      ) : (
        <>
          Add to Basket <i className="fas fa-shopping-basket" aria-hidden />
        </>
      )}
    </button>
  );
}
