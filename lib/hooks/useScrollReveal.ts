"use client";

import { useEffect } from "react";

/* Replaces EmmaLab.createRevealObserver. Mark any element on the page with
   `data-reveal` (optionally `data-reveal="left|right|up"`) and call this hook
   once near the top of the tree — it adds `.is-visible` when the element
   enters the viewport. Reveal transitions are defined in app/globals.css. */
export function useScrollReveal(opts?: {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
}) {
  const {
    selector = "[data-reveal]",
    threshold = 0.12,
    rootMargin = "0px",
  } = opts || {};

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(selector).forEach((el) =>
        el.classList.add("is-visible"),
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    const els = document.querySelectorAll(selector);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, threshold, rootMargin]);
}
