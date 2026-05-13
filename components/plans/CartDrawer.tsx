"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useCart, useCartUi, useHasHydrated } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const open = useCartUi((s) => s.cartOpen);
  const setOpen = useCartUi((s) => s.setCartOpen);
  const setCheckoutOpen = useCartUi((s) => s.setCheckoutOpen);
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const total = useCart((s) => s.total());
  const hydrated = useHasHydrated();
  const list = hydrated ? items : [];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-lg flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right">
          <header className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border-soft">
            <div>
              <Dialog.Title className="font-display text-xl text-navy font-bold">
                Your Basket
              </Dialog.Title>
              <Dialog.Description className="text-sm text-ink-muted">
                {list.length} bundle{list.length !== 1 ? "s" : ""} selected
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-bg-soft text-ink hover:bg-surface hover:rotate-90 transition-all flex items-center justify-center"
              >
                <i className="fas fa-times" aria-hidden />
              </button>
            </Dialog.Close>
          </header>

          {list.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              <div className="w-16 h-16 rounded-full bg-bg-soft text-ink-muted flex items-center justify-center text-2xl mb-4">
                <i className="fas fa-shopping-basket" aria-hidden />
              </div>
              <h3 className="font-display text-lg text-navy font-semibold mb-1">
                Your basket is empty
              </h3>
              <p className="text-sm text-ink-body max-w-xs">
                Add a wellness bundle to get started — you can review and edit
                before checkout.
              </p>
            </div>
          ) : (
            <ul className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
              {list.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 bg-bg-soft rounded-xl px-4 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-accent font-semibold">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="w-8 h-8 rounded-full bg-white text-ink-muted hover:bg-danger hover:text-white transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-trash" aria-hidden />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {list.length > 0 && (
            <footer className="border-t border-border-soft px-6 py-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-muted">Total</span>
                <strong className="font-display text-2xl text-navy">
                  {formatPrice(total)}
                </strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setCheckoutOpen(true);
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors"
              >
                Proceed to Checkout{" "}
                <i className="fas fa-arrow-right" aria-hidden />
              </button>
              <button
                type="button"
                onClick={clear}
                className="w-full text-xs text-ink-muted hover:text-danger transition-colors"
              >
                Clear basket
              </button>
            </footer>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
