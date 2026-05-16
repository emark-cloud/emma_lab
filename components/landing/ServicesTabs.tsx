"use client";

import Image from "next/image";
import Link from "next/link";
import * as Tabs from "@radix-ui/react-tabs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SERVICES } from "@/lib/landing-data";

export default function ServicesTabs() {
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
          defaultValue={SERVICES[0].id}
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
              className="bg-white rounded-2xl overflow-hidden shadow-md grid md:grid-cols-2 focus:outline-none"
            >
              <div className="relative min-h-[260px] md:min-h-full">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-navy/90 text-white text-sm font-semibold px-3 py-2 rounded-lg">
                  <i className={`${s.icon} mr-2`} aria-hidden />
                  {s.title}
                </div>
              </div>
              <div className="p-8">
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
                <Link
                  href="/plans"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
                >
                  Book This Test <i className="fas fa-arrow-right" aria-hidden />
                </Link>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
