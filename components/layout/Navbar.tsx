"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
        <Link href="/" className="flex items-center gap-3">
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

        <nav
          className={clsx(
            "lg:flex items-center gap-7 text-sm font-medium",
            menuOpen
              ? "flex flex-col absolute top-full left-0 right-0 bg-white shadow-md p-6 gap-4"
              : "hidden",
          )}
        >
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
            <div className="lg:hidden flex flex-col gap-3 pt-3 border-t border-border-soft">
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
              className="lg:hidden text-left text-ink hover:text-accent transition-colors pt-3 border-t border-border-soft"
            >
              <i className="fas fa-user-circle" aria-hidden /> Log in
            </button>
          )}
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
            {hydrated && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-gold text-navy text-[11px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
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
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
}
