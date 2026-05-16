"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { BUNDLES, CATEGORIES, type Category } from "@/lib/bundles";
import PlanCard from "./PlanCard";

type Sort = "alpha-asc" | "alpha-desc" | "price-asc" | "price-desc";

export default function PlansBrowser() {
  const [activeCat, setActiveCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("alpha-asc");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = BUNDLES.filter((b) => {
      const catMatch = activeCat === "all" || b.category === activeCat;
      const qMatch = !q || b.name.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
    filtered.sort((a, b) => {
      switch (sort) {
        case "alpha-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return filtered;
  }, [activeCat, sort, query]);

  return (
    <section className="py-12">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = activeCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveCat(c.id as Category | "all")}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                    active
                      ? "bg-navy text-white border-navy"
                      : "bg-white text-ink border-border-soft hover:border-accent/40",
                  )}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:flex-initial">
              <label htmlFor="planSearch" className="visually-hidden">
                Search bundles
              </label>
              <i
                className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm"
                aria-hidden
              />
              <input
                id="planSearch"
                type="search"
                placeholder="Search bundles…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search bundles"
                className="pl-10 pr-4 py-2.5 rounded-full bg-white border border-border-soft text-sm w-full sm:w-56 focus:outline-none focus:border-accent transition-colors"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-bg-muted text-ink-muted hover:bg-danger hover:text-white flex items-center justify-center text-xs"
                >
                  <i className="fas fa-times" aria-hidden />
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm">
              <span className="text-ink-muted">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="px-3 py-2 rounded-full bg-white border border-border-soft text-sm focus:outline-none focus:border-accent transition-colors"
              >
                <option value="alpha-asc">A → Z</option>
                <option value="alpha-desc">Z → A</option>
                <option value="price-asc">Price: low → high</option>
                <option value="price-desc">Price: high → low</option>
              </select>
            </label>
          </div>
        </div>

        <p className="text-sm text-ink-muted mb-6">
          {visible.length} bundle{visible.length !== 1 ? "s" : ""} available
        </p>

        {visible.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border-soft text-center py-16">
            <div className="w-14 h-14 mx-auto rounded-full bg-bg-muted text-ink-muted flex items-center justify-center text-xl mb-4">
              <i className="fas fa-search" aria-hidden />
            </div>
            <h3 className="font-display text-xl text-navy font-bold mb-1">
              No bundles found
            </h3>
            <p className="text-ink-body text-sm">
              Try a different category or clear your search.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((b) => (
              <PlanCard key={b.id} bundle={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
