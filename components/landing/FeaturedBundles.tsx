import Link from "next/link";
import clsx from "clsx";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FEATURED_BUNDLES } from "@/lib/landing-data";
import { formatPrice } from "@/lib/format";

export default function FeaturedBundles() {
  return (
    <section id="wellness" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <SectionHeader
          eyebrow="Health Packages"
          title="Wellness Check Bundles"
          description="Choose a bundle that suits your health goals. Comprehensive panels at affordable prices."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {FEATURED_BUNDLES.map((b) => (
            <article
              key={b.id}
              data-reveal="up"
              className={clsx(
                "relative rounded-2xl p-6 md:p-8 shadow-md flex flex-col",
                b.featured
                  ? "bg-navy text-white"
                  : "bg-white text-ink border border-border-soft",
              )}
            >
              {b.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold text-navy text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div
                className={clsx(
                  "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold w-fit mb-4",
                  b.featured
                    ? "bg-white/15 text-white"
                    : "bg-accent-light text-accent",
                )}
              >
                <i className="fas fa-shield-virus" aria-hidden /> {b.badge}
              </div>
              <div className="mb-3">
                <span className="font-display text-3xl font-bold">
                  {formatPrice(b.price)}
                </span>
                <span
                  className={clsx(
                    "text-sm ml-1",
                    b.featured ? "text-white/70" : "text-ink-muted",
                  )}
                >
                  / package
                </span>
              </div>
              <p
                className={clsx(
                  "text-sm mb-5",
                  b.featured ? "text-white/85" : "text-ink-body",
                )}
              >
                {b.description}
              </p>
              <div
                className={clsx(
                  "text-[10px] font-bold uppercase tracking-widest mb-3 pb-3 border-b",
                  b.featured
                    ? "text-white/70 border-white/15"
                    : "text-ink-muted border-border-soft",
                )}
              >
                {b.testCount} tests
              </div>
              <ul className="space-y-2 text-sm flex-1 mb-6">
                {b.tests.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <i
                      className={clsx(
                        "fas fa-check-circle mt-0.5",
                        b.featured ? "text-gold" : "text-teal",
                      )}
                      aria-hidden
                    />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/plans"
                className={clsx(
                  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5",
                  b.featured
                    ? "bg-white text-navy hover:bg-accent-light"
                    : "bg-navy text-white hover:bg-accent",
                )}
              >
                Add to Basket{" "}
                <i className="fas fa-shopping-basket" aria-hidden />
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            <i className="fas fa-th-large" aria-hidden /> Browse Others
          </Link>
        </div>
      </div>
    </section>
  );
}
