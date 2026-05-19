"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

/* Floating "back to top" control. Mounted once globally so it works on
   every page; it fades in only after the visitor has scrolled down a bit
   to avoid cluttering the top of the page. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={clsx(
        "group fixed bottom-6 right-6 z-40 flex items-center gap-2 transition-opacity duration-300",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <span
        role="tooltip"
        className="pointer-events-none rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        Back to Top
      </span>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
        className="w-12 h-12 rounded-full bg-navy text-white shadow-lg hover:bg-accent transition-colors flex items-center justify-center"
      >
        <i className="fas fa-hand-point-up text-lg" aria-hidden />
      </button>
    </div>
  );
}
