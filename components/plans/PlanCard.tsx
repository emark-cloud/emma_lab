"use client";

import clsx from "clsx";
import { type Bundle, CATEGORY_LABELS } from "@/lib/bundles";
import { useCart, useCartUi, useHasHydrated } from "@/lib/cart-store";
import { useSavedPlans } from "@/lib/saved-plans-store";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { formatPrice } from "@/lib/format";

export default function PlanCard({ bundle }: { bundle: Bundle }) {
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const has = useCart((s) => s.has(bundle.id));
  const hydrated = useHasHydrated();
  const inCart = hydrated && has;

  const setAuthOpen = useCartUi((s) => s.setAuthOpen);
  const toggleSaved = useSavedPlans((s) => s.toggle);
  const isSaved = useSavedPlans((s) => s.has(bundle.id));
  const saved = hydrated && isSaved;

  async function onSaveClick() {
    if (!isSupabaseConfigured) return;
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) {
      setAuthOpen(true);
      return;
    }
    toggleSaved(bundle.id);
  }

  const featured = bundle.featured;

  return (
    <article
      data-reveal="up"
      className={clsx(
        "relative rounded-2xl p-6 shadow-md flex flex-col transition-transform hover:-translate-y-1",
        featured
          ? "bg-navy text-white"
          : "bg-white text-ink border border-border-soft",
      )}
    >
      {featured && (
        <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gold text-navy text-xs font-bold uppercase tracking-wider">
          Most Popular
        </div>
      )}

      <div className="flex items-center justify-between gap-3 mb-4">
        <div
          className={clsx(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold",
            featured
              ? "bg-white/15 text-white"
              : "bg-accent-light text-accent",
          )}
        >
          <i className="fas fa-shield-virus" aria-hidden />
          {CATEGORY_LABELS[bundle.category]}
        </div>
        {isSupabaseConfigured && (
          <button
            type="button"
            onClick={onSaveClick}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved plans" : "Save this plan"}
            title={saved ? "Saved" : "Save for later"}
            className={clsx(
              "w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0",
              featured
                ? "bg-white/15 text-white hover:bg-white/25"
                : "bg-bg-soft text-ink-muted hover:text-accent",
              saved && (featured ? "text-gold" : "text-accent"),
            )}
          >
            <i
              className={clsx(saved ? "fas" : "far", "fa-bookmark")}
              aria-hidden
            />
          </button>
        )}
      </div>

      <h3 className="font-display text-xl font-bold mb-2">{bundle.name}</h3>
      <p
        className={clsx(
          "text-sm mb-4",
          featured ? "text-white/85" : "text-ink-body",
        )}
      >
        {bundle.description}
      </p>

      <div className="mb-4">
        <span className="font-display text-3xl font-bold">
          {formatPrice(bundle.price)}
        </span>
        <span
          className={clsx(
            "text-sm ml-1",
            featured ? "text-white/70" : "text-ink-muted",
          )}
        >
          / package
        </span>
      </div>

      <div
        className={clsx(
          "text-[10px] font-bold uppercase tracking-widest mb-3 pb-3 border-b",
          featured
            ? "text-white/70 border-white/15"
            : "text-ink-muted border-border-soft",
        )}
      >
        {bundle.tests.length} tests included
      </div>

      <ul className="space-y-2 text-sm flex-1 mb-5 max-h-44 overflow-y-auto pr-1">
        {bundle.tests.map((t) => (
          <li key={t} className="flex items-start gap-2">
            <i
              className={clsx(
                "fas fa-check-circle mt-0.5 shrink-0",
                featured ? "text-gold" : "text-teal",
              )}
              aria-hidden
            />
            {t}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() =>
          inCart
            ? remove(bundle.id)
            : add({ id: bundle.id, name: bundle.name, price: bundle.price })
        }
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
    </article>
  );
}
