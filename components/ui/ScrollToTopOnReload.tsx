"use client";

import { useEffect } from "react";

/* Browsers restore the previous scroll position on reload. Mount this once
   in the root layout so a reload lands at the top instead. Back/forward
   navigation still restores scroll because we only act on `reload`.
   Browser scroll restoration can fire after hydration, so we also reset
   on the next frame and on `load` to win that race. */
export default function ScrollToTopOnReload() {
  useEffect(() => {
    const [nav] = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];

    if (nav?.type !== "reload") return;

    const toTop = () => window.scrollTo(0, 0);

    toTop();
    const raf = requestAnimationFrame(toTop);
    window.addEventListener("load", toTop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", toTop);
    };
  }, []);

  return null;
}
