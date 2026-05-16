"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { WHY_ITEMS } from "@/lib/landing-data";

export default function WhyAccordion() {
  return (
    <section id="why" className="py-12 sm:py-16 lg:py-20 bg-bg-soft">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div data-reveal="left" className="relative">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto">
            <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-[spin_22s_linear_infinite]" />
            <div className="absolute inset-6 rounded-full border-2 border-accent/30 animate-[spin_16s_linear_infinite_reverse]" />
            <div className="absolute inset-12 rounded-full border-2 border-accent/40 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-navy text-white flex items-center justify-center text-3xl shadow-lg">
                <i className="fas fa-flask" aria-hidden />
              </div>
            </div>
          </div>
          <div className="mt-8 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-2">
              Why Choose
            </p>
            <h2 className="font-display text-4xl text-navy font-bold">
              Emma Lab?
            </h2>
          </div>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          defaultValue="0"
          data-reveal="right"
          className="space-y-3"
        >
          {WHY_ITEMS.map((item, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <Accordion.Item
                key={item.title}
                value={String(i)}
                className="rounded-xl bg-white border border-border-soft data-[state=open]:border-accent/40 transition-colors overflow-hidden"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full flex items-center gap-4 px-5 py-4 text-left group">
                    <span className="font-display font-bold text-accent text-lg">
                      {num}
                    </span>
                    <span className="flex-1 font-semibold text-navy">
                      {item.title}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-accent-light text-accent flex items-center justify-center group-data-[state=open]:bg-accent group-data-[state=open]:text-white transition-colors">
                      <i className="fas fa-plus group-data-[state=open]:hidden" />
                      <i className="fas fa-minus group-data-[state=closed]:hidden" />
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-5 pb-5 pl-16 text-sm text-ink-body data-[state=open]:animate-in data-[state=closed]:animate-out">
                  {item.body}
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </section>
  );
}
