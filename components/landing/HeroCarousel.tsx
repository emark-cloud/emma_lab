"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { HERO_SLIDES } from "@/lib/landing-data";
import { buttonClass } from "@/components/ui/Button";

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
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
            <span className="font-normal">Your</span>
            <br />
            <strong className="text-[1.15em]">Trusted Partner</strong>
            <br />
            <span className="font-normal">in</span>{" "}
            <strong className="text-[1.15em]">Diagnostic</strong>
            <br />
            <strong className="text-[1.15em]">Excellence</strong>
          </h1>
          <p className="text-lg text-ink-body max-w-md">
            We provide accurate, precise and timely results.
          </p>
          <Link
            href="/diagnostic-tests"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary")}
          >
            <i className="fas fa-arrow-right" aria-hidden /> Book a Test
          </Link>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative flex gap-4 overflow-hidden rounded-2xl bg-white lg:h-[420px]">
            {HERO_SLIDES.map((slide, i) => (
              <button
                type="button"
                key={slide.src}
                onClick={() => setIndex(i)}
                onMouseEnter={() => setIndex(i)}
                onFocus={() => setIndex(i)}
                aria-label={slide.alt}
                aria-pressed={i === index}
                className={clsx(
                  "group relative rounded-2xl overflow-hidden shadow-lg text-left bg-transparent transition-[flex-grow,filter] duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  i === index
                    ? "w-full aspect-[4/3] lg:aspect-auto lg:flex-[2.8] lg:h-full"
                    : "hidden lg:block lg:flex-[0.8] lg:h-full lg:brightness-[0.45] lg:saturate-50 lg:hover:brightness-100 lg:hover:saturate-100 lg:cursor-pointer",
                )}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className={clsx(
                    "object-cover transition-transform duration-700 ease-out",
                    i === index ? "scale-100" : "scale-105 group-hover:scale-100",
                  )}
                  priority={i === 0}
                />
              </button>
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
    </section>
  );
}
