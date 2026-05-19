"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import BookingModal from "./BookingModal";

const TRUST = [
  { icon: "fas fa-shield-alt", label: "Confidential" },
  { icon: "fas fa-bolt", label: "Fast Results" },
  { icon: "fas fa-star", label: "Accredited Lab" },
];

export default function AppointmentCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="appointment"
        className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-mid to-accent text-white py-12 sm:py-16 lg:py-20"
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />

        <div className="relative max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div data-reveal="left">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white/70 mb-3">
              Book Today
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Not sure what test to take?
              <br />
              <em className="text-gold not-italic">Book an Appointment</em>
            </h2>
            <p className="text-white/80 mb-8 max-w-md">
              Our specialists are available 6 days a week. Same-day results
              available for most standard tests.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button onClick={() => setOpen(true)} variant="white">
                Book your Appointment{" "}
                <i className="fas fa-arrow-right" aria-hidden />
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 text-sm text-white/85"
                >
                  <i className={`${t.icon} text-gold`} aria-hidden /> {t.label}
                </div>
              ))}
            </div>
          </div>

          <div data-reveal="right" className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/Rectangle 154.png"
                alt="Emma Lab doctor"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute top-6 left-2 sm:-left-2 bg-white text-ink rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
              <i className="fas fa-vial text-accent text-xl" aria-hidden />
              <div className="leading-tight">
                <strong className="block text-navy">200+</strong>
                <span className="text-xs text-ink-muted">Test Types</span>
              </div>
            </div>
            <div className="absolute bottom-6 right-2 sm:-right-2 bg-white text-ink rounded-2xl px-4 py-3 flex items-center gap-3 shadow-lg">
              <i className="fas fa-clock text-accent text-xl" aria-hidden />
              <div className="leading-tight">
                <strong className="block text-navy">24h</strong>
                <span className="text-xs text-ink-muted">Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookingModal open={open} onOpenChange={setOpen} />
    </>
  );
}
