"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { HERO_SLIDES } from "@/lib/landing-data";
import { Button } from "@/components/ui/Button";
import BookingModal from "./BookingModal";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (paused || reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HERO_SLIDES.length),
      5000,
    );
    return () => clearInterval(id);
  }, [paused]);

  const go = (dir: 1 | -1) =>
    setIndex(
      (i) => (i + dir + HERO_SLIDES.length) % HERO_SLIDES.length,
    );

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-bg-soft via-white to-accent-light"
    >
      <div className="max-w-[var(--container-emma)] mx-auto px-6 py-10 sm:py-14 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.1] font-bold">
            Your
            <br />
            <strong className="text-accent">Trusted Partner</strong> in
            <br />
            <strong>Diagnostic Excellence</strong>
          </h1>
          <p className="text-lg text-ink-body max-w-md">
            We provide accurate, precise and timely results.
          </p>
          <Button onClick={() => setBookingOpen(true)} variant="primary">
            <i className="fas fa-arrow-right" aria-hidden /> Book a Test
          </Button>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative flex gap-4 overflow-hidden">
            {HERO_SLIDES.map((slide, i) => (
              <div
                key={slide.src}
                className={clsx(
                  "relative rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ease-out",
                  i === index
                    ? "w-full aspect-[4/3] lg:aspect-auto lg:flex-[1.6] lg:min-h-[420px]"
                    : "hidden lg:block lg:flex-1 lg:min-h-[320px] lg:opacity-80",
                )}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-navy shadow-md hover:bg-white transition-colors flex items-center justify-center"
            >
              <i className="fas fa-chevron-left text-sm" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 text-navy shadow-md hover:bg-white transition-colors flex items-center justify-center"
            >
              <i className="fas fa-chevron-right text-sm" aria-hidden />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={clsx(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-8 bg-accent" : "w-2 bg-ink-muted/30",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </section>
  );
}
