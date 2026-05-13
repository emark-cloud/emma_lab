"use client";

import { useCountUp } from "@/lib/hooks/useCountUp";

const COUNTERS = [
  { target: 350, suffix: "k+", label: "clients served" },
  { target: 30, suffix: "+", label: "years of operational experience" },
  { target: 50, suffix: "+", label: "partners" },
];

export default function NumbersCounters() {
  return (
    <section id="numbers" className="py-20 bg-bg-soft">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <header data-reveal="up" className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-3">
            By the Numbers
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-navy font-bold">
            Our Impact by the Numbers
          </h2>
        </header>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {COUNTERS.map((c, i) => (
            <div key={c.label} className="flex items-stretch">
              <CounterBlock {...c} />
              {i < COUNTERS.length - 1 && (
                <div className="hidden md:block w-px bg-border-soft mx-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterBlock({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <div className="text-center px-4">
      <p className="font-display text-5xl md:text-6xl font-bold text-navy">
        <span ref={ref}>{value}</span>
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-2 text-ink-muted uppercase text-xs tracking-widest">
        {label}
      </p>
      <div className="mx-auto mt-3 w-12 h-0.5 bg-accent" />
    </div>
  );
}
