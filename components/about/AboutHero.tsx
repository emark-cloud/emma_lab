import Image from "next/image";
import Link from "next/link";
import PageIndexSidebar from "./PageIndexSidebar";
import { buttonClass } from "@/components/ui/Button";

export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-bg-soft via-white to-accent-light overflow-hidden">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
          <div>
            <nav className="flex items-center gap-2 text-sm text-ink-muted mb-6">
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
              <i className="fas fa-chevron-right text-[10px]" aria-hidden />
              <span className="text-navy font-medium">About Us</span>
            </nav>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy font-bold leading-tight">
              About Us
              <span className="block text-base md:text-lg text-accent font-semibold mt-3 tracking-wide">
                Excellence in healthcare, every day
              </span>
            </h1>

            <p className="mt-6 text-ink-body leading-relaxed max-w-2xl">
              For over three decades, Emma Lab has proudly served as a
              cornerstone of diagnostic excellence. Building on over 30 years of
              unwavering commitment, we deliver meticulously accurate medical
              reports, empowering healthcare providers and ensuring patients
              receive the precise information needed for effective treatment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#identity" className={buttonClass("primary")}>
                Explore Our Story <i className="fas fa-arrow-down" aria-hidden />
              </a>
              <Link
                href="/#contact"
                className={buttonClass("outline-navy")}
              >
                <i className="fas fa-envelope" aria-hidden /> Get in Touch
              </Link>
            </div>
          </div>

          <PageIndexSidebar />
        </div>

        <div className="grid sm:grid-cols-[1fr_1.4fr] gap-5 mt-14">
          <div
            data-reveal="left"
            className="relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&q=80"
              alt="Emma Lab facility"
              fill
              sizes="(min-width: 640px) 35vw, 90vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5 text-xs font-semibold text-navy">
              Our Facility
            </div>
          </div>
          <div
            data-reveal="right"
            className="relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src="/images/About us.jpg"
              alt="Emma Lab team"
              fill
              sizes="(min-width: 640px) 50vw, 90vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5 text-xs font-semibold text-navy">
              Our Team
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
