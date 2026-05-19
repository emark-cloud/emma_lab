"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { useCart, useCartUi, useHasHydrated } from "@/lib/cart-store";
import { useUser } from "@/lib/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import AuthModal from "@/components/auth/AuthModal";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Diagnostic Tests", href: "/diagnostic-tests" },
  { label: "View Plans", href: "/plans" },
  { label: "Career", href: "/careers" },
  { label: "Contact Us", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = useCart((s) => s.items.length);
  const setCartOpen = useCartUi((s) => s.setCartOpen);
  const authOpen = useCartUi((s) => s.authOpen);
  const setAuthOpen = useCartUi((s) => s.setAuthOpen);
  const hydrated = useHasHydrated();
  const { user, loading: authLoading } = useUser();

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email ||
    "Account";

  async function signOut() {
    setAccountOpen(false);
    await createClient().auth.signOut();
    router.refresh();
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-white/20 backdrop-blur-md shadow-md"
          : "bg-white shadow-none",
      )}
    >
      <div className="max-w-[var(--container-emma)] mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          onClick={(e) => {
            // Already home: a Next.js <Link> to the current route is a
            // no-op, so force a fresh reload that lands at the top
            // (ScrollToTopOnReload handles the scroll on reload nav).
            if (pathname === "/") {
              e.preventDefault();
              window.location.reload();
            }
          }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 relative flex-shrink-0">
            <Image
              src="/images/Emma Logo.png"
              alt="Emma Lab"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <span className="block font-display font-bold text-navy text-lg">
              Emma Lab
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-ink-muted">
              Global Services Ltd.
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-ink hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!authLoading && user ? (
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setAccountOpen((v) => !v)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors max-w-[200px]"
              >
                <i className="fas fa-user-circle" aria-hidden />
                <span className="truncate">{displayName}</span>
                <i
                  className={clsx(
                    "fas fa-chevron-down text-[10px] transition-transform",
                    accountOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              {accountOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setAccountOpen(false)}
                    aria-hidden
                  />
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-border-soft py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-border-soft">
                      <p className="text-xs text-ink-muted">Signed in as</p>
                      <p className="text-sm font-medium text-navy truncate">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/account"
                      role="menuitem"
                      onClick={() => setAccountOpen(false)}
                      className="w-full text-left px-4 py-2.5 text-sm text-ink hover:bg-bg-soft transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-user" aria-hidden /> My account
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={signOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-ink hover:bg-bg-soft transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-sign-out-alt" aria-hidden /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
            >
              <i className="fas fa-user-circle" aria-hidden /> Log in
            </button>
          )}
          <button
            type="button"
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className="relative w-10 h-10 rounded-full bg-accent-light text-accent hover:bg-accent hover:text-white transition-colors flex items-center justify-center"
          >
            <i className="fas fa-shopping-cart" aria-hidden />
            <span
              className={clsx(
                "absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-gold text-navy text-[11px] font-bold flex items-center justify-center transition-opacity duration-200",
                hydrated && cartCount > 0 ? "opacity-100" : "opacity-0",
              )}
              aria-hidden={!(hydrated && cartCount > 0)}
            >
              {hydrated ? cartCount : ""}
            </span>
          </button>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
          >
            <span
              className={clsx(
                "block w-6 h-0.5 bg-navy transition-transform",
                menuOpen && "rotate-45 translate-y-2",
              )}
            />
            <span
              className={clsx(
                "block w-6 h-0.5 bg-navy transition-opacity",
                menuOpen && "opacity-0",
              )}
            />
            <span
              className={clsx(
                "block w-6 h-0.5 bg-navy transition-transform",
                menuOpen && "-rotate-45 -translate-y-2",
              )}
            />
          </button>
        </div>
      </div>
      <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out lg:hidden" />
          <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-full max-w-xs bg-white shadow-lg flex flex-col data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right lg:hidden">
            <header className="flex items-center justify-between gap-4 px-6 py-5 border-b border-border-soft">
              <Dialog.Title className="font-display text-lg text-navy font-bold">
                Menu
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  aria-label="Close menu"
                  className="w-9 h-9 rounded-full bg-bg-soft text-ink hover:bg-surface hover:rotate-90 transition-all flex items-center justify-center"
                >
                  <i className="fas fa-times" aria-hidden />
                </button>
              </Dialog.Close>
            </header>
            <Dialog.Description className="sr-only">
              Site navigation and account options
            </Dialog.Description>
            <nav className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4 text-sm font-medium">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-ink hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              ))}
              {!authLoading && user ? (
                <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-border-soft">
                  <span className="text-xs text-ink-muted">
                    Signed in as{" "}
                    <span className="text-navy font-medium">{user.email}</span>
                  </span>
                  <Link
                    href="/account"
                    className="text-left text-ink hover:text-accent transition-colors"
                  >
                    <i className="fas fa-user" aria-hidden /> My account
                  </Link>
                  <button
                    type="button"
                    onClick={signOut}
                    className="text-left text-ink hover:text-accent transition-colors"
                  >
                    <i className="fas fa-sign-out-alt" aria-hidden /> Sign out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setAuthOpen(true);
                  }}
                  className="text-left text-ink hover:text-accent transition-colors pt-4 mt-2 border-t border-border-soft"
                >
                  <i className="fas fa-user-circle" aria-hidden /> Log in
                </button>
              )}
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
}
