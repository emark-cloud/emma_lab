import Link from "next/link";

export default function AboutPageCta() {
  return (
    <section data-reveal="up" className="py-16">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <div className="bg-gradient-to-br from-navy via-navy-mid to-accent text-white rounded-3xl px-8 py-12 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="md:max-w-xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Ready to Experience the Emma Lab Difference?
            </h2>
            <p className="text-white/80">
              Book a diagnostic test today or speak with our team.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#wellness"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-navy text-sm font-semibold hover:bg-accent-light transition-colors"
            >
              View Wellness Bundles{" "}
              <i className="fas fa-arrow-right" aria-hidden />
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-white text-white text-sm font-semibold hover:bg-white hover:text-navy transition-colors"
            >
              <i className="fas fa-phone-alt" aria-hidden /> Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
