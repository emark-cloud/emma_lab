"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/landing-data";
import InvestigationsGrid from "./InvestigationsGrid";

export default function ServicesTabs({ showInvestigations = true, showBookButton = true, imageLabelBottom = "bottom-4", imageLabelBottomOverrides = {}, contentClassName = "p-8" }: { showInvestigations?: boolean; showBookButton?: boolean; imageLabelBottom?: string; imageLabelBottomOverrides?: Record<string, string>; contentClassName?: string }) {
  const [active, setActive] = useState(SERVICES[0].id);

  return (
    <section id="what-we-do" className="py-12 sm:py-16 lg:py-20 bg-bg-soft">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <SectionHeader
          eyebrow="Our Diagnostic Tests"
          title="What We Do"
          description="Comprehensive diagnostics delivered with precision, speed, and compassion."
          align="center"
        />

        <Tabs.Root
          value={active}
          onValueChange={setActive}
          orientation="vertical"
          className="grid lg:grid-cols-[280px_1fr] gap-8"
        >
          <Tabs.List
            aria-label="Diagnostic services"
            className="flex flex-col gap-2"
          >
            {SERVICES.map((s) => (
              <Tabs.Trigger
                key={s.id}
                value={s.id}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium text-ink-body bg-white border border-transparent hover:border-accent/30 data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:border-navy transition-colors"
              >
                <i className={`${s.icon} text-accent w-5`} aria-hidden />
                {s.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {SERVICES.map((s) => (
            <Tabs.Content
              key={s.id}
              value={s.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md grid md:grid-cols-2 focus:outline-none h-[400px]"
            >
              <div className="relative h-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                  style={{ objectPosition: s.id === "xray" ? "center top" : "center 80%" }}
                />
                {s.id === "ecg" && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                    <svg
                      viewBox="0 0 800 56"
                      preserveAspectRatio="none"
                      aria-hidden
                      className="absolute bottom-3 left-0 h-8 w-[200%]"
                      style={{ animation: "ecg-scroll 6s linear infinite" }}
                    >
                      <path
                        d="M0,38 L28,38 C31,38 35,26 40,26 C45,26 49,38 54,38 L68,38 L71,43 L76,6 L81,47 L87,38 L108,38 C112,38 118,24 128,24 C138,24 144,38 150,38 L200,38 L228,38 C231,38 235,26 240,26 C245,26 249,38 254,38 L268,38 L271,43 L276,6 L281,47 L287,38 L308,38 C312,38 318,24 328,24 C338,24 344,38 350,38 L400,38 L428,38 C431,38 435,26 440,26 C445,26 449,38 454,38 L468,38 L471,43 L476,6 L481,47 L487,38 L508,38 C512,38 518,24 528,24 C538,24 544,38 550,38 L600,38 L628,38 C631,38 635,26 640,26 C645,26 649,38 654,38 L668,38 L671,43 L676,6 L681,47 L687,38 L708,38 C712,38 718,24 728,24 C738,24 744,38 750,38 L800,38"
                        stroke="#2cad6e"
                        strokeWidth="2.2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                <div className={`absolute ${imageLabelBottomOverrides[s.id] ?? imageLabelBottom} left-4 bg-navy/90 text-white text-sm font-semibold px-3 py-2 rounded-lg`}>
                  <i className={`${s.icon} mr-2`} aria-hidden />
                  {s.title}
                </div>
              </div>
              <div className={contentClassName}>
                <h3 className="font-display text-2xl text-navy font-bold mb-3">
                  {s.title}
                </h3>
                <p className="text-ink-body mb-5">{s.blurb}</p>
                <ul className="space-y-2 mb-6">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <i
                        className="fas fa-check-circle text-teal"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                {showBookButton && (
                  <Link
                    href="/diagnostic-tests"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
                  >
                    Book This Test <i className="fas fa-arrow-right" aria-hidden />
                  </Link>
                )}
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        {showInvestigations && <InvestigationsGrid activeCategory={active} />}
      </div>
    </section>
  );
}
