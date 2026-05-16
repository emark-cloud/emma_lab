"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { BUNDLES, CATEGORY_LABELS } from "@/lib/bundles";
import { useCart } from "@/lib/cart-store";
import { useSavedPlans } from "@/lib/saved-plans-store";
import { listOrders, type Order } from "@/lib/supabase/account";
import { formatPrice } from "@/lib/format";

type Tab = "saved" | "orders";

export default function AccountDashboard({ email }: { email: string }) {
  const [tab, setTab] = useState<Tab>("saved");
  const savedIds = useSavedPlans((s) => s.ids);
  const load = useSavedPlans((s) => s.load);

  useEffect(() => {
    load();
  }, [load]);

  const savedBundles = BUNDLES.filter((b) => savedIds.includes(b.id));

  return (
    <div data-reveal="up">
      {email && (
        <p className="text-sm text-ink-muted mb-6">
          Signed in as <span className="text-navy font-medium">{email}</span>
        </p>
      )}

      <div className="flex gap-2 mb-6 border-b border-border-soft">
        <TabButton
          active={tab === "saved"}
          onClick={() => setTab("saved")}
          icon="fa-bookmark"
          label={`Saved Plans${savedBundles.length ? ` (${savedBundles.length})` : ""}`}
        />
        <TabButton
          active={tab === "orders"}
          onClick={() => setTab("orders")}
          icon="fa-receipt"
          label="Order History"
        />
      </div>

      {tab === "saved" ? (
        <SavedPlans bundleIds={savedBundles.map((b) => b.id)} />
      ) : (
        <OrderHistory />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "px-4 py-3 text-sm font-semibold flex items-center gap-2 border-b-2 -mb-px transition-colors",
        active
          ? "border-accent text-accent"
          : "border-transparent text-ink-muted hover:text-navy",
      )}
    >
      <i className={`fas ${icon}`} aria-hidden />
      {label}
    </button>
  );
}

function SavedPlans({ bundleIds }: { bundleIds: string[] }) {
  const add = useCart((s) => s.add);
  const inCart = useCart((s) => s.items);
  const toggleSaved = useSavedPlans((s) => s.toggle);
  const bundles = BUNDLES.filter((b) => bundleIds.includes(b.id));

  if (bundles.length === 0) {
    return (
      <EmptyState
        icon="fa-bookmark"
        title="No saved plans yet"
        body="Tap the bookmark on any plan to keep it here for later."
        cta={{ href: "/plans", label: "Browse plans" }}
      />
    );
  }

  return (
    <ul className="grid sm:grid-cols-2 gap-4">
      {bundles.map((b) => {
        const added = inCart.some((i) => i.id === b.id);
        return (
          <li
            key={b.id}
            className="bg-white rounded-2xl border border-border-soft p-5 flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-accent-light text-accent">
                {CATEGORY_LABELS[b.category]}
              </span>
              <button
                type="button"
                onClick={() => toggleSaved(b.id)}
                aria-label="Remove from saved plans"
                title="Remove"
                className="text-accent hover:text-danger transition-colors"
              >
                <i className="fas fa-bookmark" aria-hidden />
              </button>
            </div>
            <h3 className="font-display text-lg font-bold text-navy mb-1">
              {b.name}
            </h3>
            <p className="text-sm text-ink-body mb-3 flex-1">
              {b.description}
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-xl font-bold text-navy">
                {formatPrice(b.price)}
              </span>
              <button
                type="button"
                disabled={added}
                onClick={() =>
                  add({ id: b.id, name: b.name, price: b.price })
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy text-white text-sm font-semibold hover:bg-accent transition-colors disabled:opacity-60"
              >
                {added ? (
                  <>
                    <i className="fas fa-check" aria-hidden /> In basket
                  </>
                ) : (
                  <>
                    Add to basket{" "}
                    <i className="fas fa-shopping-basket" aria-hidden />
                  </>
                )}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function OrderHistory() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    listOrders().then(setOrders);
  }, []);

  if (orders === null) {
    return <p className="text-ink-muted">Loading your orders…</p>;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon="fa-receipt"
        title="No orders yet"
        body="Once you complete a checkout, your receipts show up here."
        cta={{ href: "/plans", label: "Browse plans" }}
      />
    );
  }

  return (
    <ul className="space-y-4">
      {orders.map((o) => (
        <li
          key={o.id}
          className="bg-white rounded-2xl border border-border-soft p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div>
              <p className="font-semibold text-navy">
                {new Date(o.created_at).toLocaleDateString("en-NG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {o.reference && (
                <p className="text-xs text-ink-muted">
                  Ref: <code className="font-mono">{o.reference}</code>
                </p>
              )}
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal/15 text-teal capitalize">
              <i className="fas fa-circle-check" aria-hidden />
              {o.status}
            </span>
          </div>
          <ul className="text-sm divide-y divide-border-soft mb-3">
            {o.items.map((it, idx) => (
              <li
                key={`${o.id}-${idx}`}
                className="flex items-center justify-between py-2"
              >
                <span className="text-ink">{it.name}</span>
                <span className="text-ink-muted">
                  {formatPrice(it.price)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-border-soft pt-3">
            <span className="text-sm text-ink-muted">Total</span>
            <strong className="font-display text-lg text-navy">
              {formatPrice(Number(o.total))}
            </strong>
          </div>
        </li>
      ))}
    </ul>
  );
}

function EmptyState({
  icon,
  title,
  body,
  cta,
}: {
  icon: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
}) {
  return (
    <div className="bg-white rounded-2xl border border-border-soft p-10 text-center">
      <div className="w-14 h-14 mx-auto rounded-full bg-bg-soft text-ink-muted flex items-center justify-center text-2xl mb-4">
        <i className={`fas ${icon}`} aria-hidden />
      </div>
      <h3 className="font-display text-xl text-navy font-bold mb-2">
        {title}
      </h3>
      <p className="text-ink-body mb-6">{body}</p>
      <a
        href={cta.href}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white text-sm font-semibold hover:bg-accent transition-colors"
      >
        {cta.label} <i className="fas fa-arrow-right" aria-hidden />
      </a>
    </div>
  );
}
