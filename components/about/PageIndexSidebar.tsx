"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

const ITEMS = [
  { id: "identity", num: "01", title: "Our Identity" },
  { id: "numbers", num: "02", title: "Our Impact by the Numbers" },
  { id: "accreditations", num: "03", title: "Our Accreditations" },
  { id: "director", num: "04", title: "Message from the Director" },
];

export default function PageIndexSidebar() {
  const [active, setActive] = useState(ITEMS[0].id);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    for (const { id } of ITEMS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sticky top-16 z-30 -mx-6 px-6 py-3 bg-bg-soft/95 backdrop-blur lg:static lg:mx-0 lg:px-0 lg:py-0 lg:bg-transparent lg:backdrop-blur-none lg:top-32">
      <p className="hidden lg:block text-xs uppercase tracking-[0.2em] font-semibold text-ink-muted mb-4">
        On This Page
      </p>
      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {ITEMS.map((item, i) => {
          const isActive = active === item.id && i !== 0;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={clsx(
                "group flex items-center gap-3 lg:gap-4 pl-4 pr-6 py-2.5 lg:py-3 rounded-xl border transition-colors whitespace-nowrap shrink-0",
                isActive
                  ? "bg-navy text-white border-navy"
                  : "bg-white border-border-soft text-ink hover:bg-navy hover:text-white hover:border-navy",
              )}
            >
              <span
                className={clsx(
                  "font-display font-bold text-sm",
                  isActive ? "text-gold" : "text-accent group-hover:text-white",
                )}
              >
                {item.num}
              </span>
              <span className="text-sm font-medium">{item.title}</span>
              <i
                className={clsx(
                  "fas fa-arrow-down ml-auto text-xs rotate-[20deg] transition-all group-hover:text-white group-hover:opacity-100",
                  isActive ? "text-ink opacity-100" : "text-ink opacity-30",
                )}
                aria-hidden
              />
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
