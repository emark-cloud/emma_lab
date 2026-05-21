"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  INVESTIGATIONS,
  INVESTIGATION_CATEGORIES,
  type Investigation,
  type InvestigationCategory,
} from "@/lib/investigations";
import { useCart, useHasHydrated } from "@/lib/cart-store";
import { useToast } from "@/lib/toast-store";
import { formatPrice } from "@/lib/format";

const PREVIEW_COUNT = 8;

type Props = {
  /** Selected service tab id from ServicesTabs. Tabs whose id is not a
   *  lab category (xray/ecg/ultrasound) make the grid render empty. */
  activeCategory: string;
};

function isLabCategory(id: string): id is InvestigationCategory {
  return id in INVESTIGATION_CATEGORIES;
}

export default function InvestigationsGrid({ activeCategory }: Props) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const trimmed = query.trim().toLowerCase();
  const searching = trimmed.length > 0;

  const labCategory = isLabCategory(activeCategory);
  const showCategoryBadge = searching || !labCategory;

  const results = useMemo<Investigation[]>(() => {
    if (searching) {
      return INVESTIGATIONS.filter((i) =>
        i.name.toLowerCase().includes(trimmed),
      );
    }
    if (!labCategory) return INVESTIGATIONS;
    return INVESTIGATIONS.filter((i) => i.category === activeCategory);
  }, [searching, trimmed, labCategory, activeCategory]);

  const collapsible = !searching && results.length > PREVIEW_COUNT;
  const visible = collapsible && !showAll ? results.slice(0, PREVIEW_COUNT) : results;

  return (
    <div className="mt-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-xl text-navy font-bold">
            {searching
              ? `Search results (${results.length})`
              : labCategory
                ? `${INVESTIGATION_CATEGORIES[activeCategory as InvestigationCategory]} tests`
                : "Browse individual tests"}
          </h3>
          <p className="text-sm text-ink-muted mt-1">
            {searching
              ? "Matching tests across every category."
              : labCategory
                ? "Individual investigations you can add to your basket."
                : "Pick a category on the left to narrow these down."}
          </p>
        </div>

        <label className="relative w-full sm:w-80 shrink-0">
          <span className="sr-only">Search tests</span>
          <i
            className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted text-sm"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowAll(false);
            }}
            placeholder="Search tests by name…"
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-border-soft text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </label>
      </div>

      {results.length === 0 && (
        <div className="text-sm text-ink-muted bg-white rounded-xl p-6 border border-border-soft">
          No tests found{searching ? ` matching "${query}"` : ""}.
        </div>
      )}

      {visible.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((inv) => (
            <InvestigationTile
              key={inv.id}
              inv={inv}
              showCategory={showCategoryBadge}
            />
          ))}
        </ul>
      )}

      {collapsible && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            {showAll ? (
              <>
                Show fewer <i className="fas fa-chevron-up text-xs" aria-hidden />
              </>
            ) : (
              <>
                View all {results.length}
                {labCategory
                  ? ` ${INVESTIGATION_CATEGORIES[activeCategory as InvestigationCategory]} tests`
                  : " tests"}{" "}
                <i className="fas fa-chevron-down text-xs" aria-hidden />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function InvestigationTile({
  inv,
  showCategory,
}: {
  inv: Investigation;
  showCategory: boolean;
}) {
  const add = useCart((s) => s.add);
  const remove = useCart((s) => s.remove);
  const hasSingle = useCart((s) => s.has(inv.id));
  const hasBoth = useCart((s) => (inv.pair ? s.has(inv.pair.bothId) : false));
  const hydrated = useHasHydrated();
  const showToast = useToast((s) => s.show);

  // qty=2 means the bilateral variant (only meaningful when inv.pair is set).
  // Default to whichever variant is already in the cart so the tile reflects
  // basket state after a reload.
  const [qty, setQty] = useState<1 | 2>(hasBoth ? 2 : 1);

  const current =
    qty === 2 && inv.pair
      ? { id: inv.pair.bothId, name: inv.pair.bothName, price: inv.pair.bothPrice }
      : { id: inv.id, name: inv.name, price: inv.price };

  const inCart = hydrated && (qty === 2 ? hasBoth : hasSingle);

  function setQuantity(next: 1 | 2) {
    if (next === qty || !inv.pair) return;
    const wasInCart = qty === 2 ? hasBoth : hasSingle;
    if (wasInCart) {
      // Swap the cart entry to the other variant
      const old = qty === 2 ? inv.pair.bothId : inv.id;
      const swapped =
        next === 2
          ? { id: inv.pair.bothId, name: inv.pair.bothName, price: inv.pair.bothPrice }
          : { id: inv.id, name: inv.name, price: inv.price };
      remove(old);
      add(swapped);
    }
    setQty(next);
  }

  return (
    <li className="bg-white rounded-xl border border-border-soft p-4 flex flex-col gap-3 hover:border-accent/40 hover:shadow-sm transition-all">
      <div className="flex-1">
        {showCategory && (
          <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-accent bg-accent-light px-2 py-0.5 rounded mb-2">
            {INVESTIGATION_CATEGORIES[inv.category]}
          </div>
        )}
        <h4 className="font-semibold text-navy text-sm leading-snug">
          {inv.name}
        </h4>
        {inv.pair && (
          <div
            role="group"
            aria-label="Quantity"
            className="mt-3 inline-flex items-center rounded-full border border-border-soft overflow-hidden text-xs"
          >
            <button
              type="button"
              onClick={() => setQuantity(qty === 1 ? 2 : 1)}
              disabled={qty === 1}
              aria-label="Decrease quantity"
              className="w-7 h-7 flex items-center justify-center text-ink-body hover:bg-bg-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-minus" aria-hidden />
            </button>
            <span
              className="w-7 text-center font-semibold text-navy"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(qty === 2 ? 1 : 2)}
              disabled={qty === 2}
              aria-label="Increase quantity"
              className="w-7 h-7 flex items-center justify-center text-ink-body hover:bg-bg-soft disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-plus" aria-hidden />
            </button>
            <span className="px-2 text-ink-muted">
              {qty === 2 ? "both sides" : "single side"}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-border-soft">
        <span className="font-display text-lg font-bold text-navy">
          {formatPrice(current.price)}
        </span>
        <button
          type="button"
          aria-label={
            inCart
              ? `Remove ${current.name} from basket`
              : `Add ${current.name} to basket`
          }
          onClick={() => {
            if (inCart) {
              remove(current.id);
              showToast(`${current.name} removed from basket`, "info");
            } else {
              add(current);
              showToast(`${current.name} added to basket`, "success");
            }
          }}
          className={clsx(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors",
            inCart
              ? "bg-teal text-white hover:bg-teal/90"
              : "bg-navy text-white hover:bg-accent",
          )}
        >
          {inCart ? (
            <>
              <i className="fas fa-check" aria-hidden /> Added
            </>
          ) : (
            <>
              <i className="fas fa-plus" aria-hidden /> Add
            </>
          )}
        </button>
      </div>
    </li>
  );
}
