"use client";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

/* Mount once near the top of a page; it observes every `[data-reveal]`
   element and toggles `.is-visible`. The transition itself lives in
   app/globals.css. */
export default function RevealOnScroll() {
  useScrollReveal();
  return null;
}
