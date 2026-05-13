import Link from "next/link";

export default function PlansHeader() {
  return (
    <section className="bg-gradient-to-br from-bg-soft via-white to-accent-light">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 py-14 lg:py-20">
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-5">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <i className="fas fa-chevron-right text-[10px]" aria-hidden />
          <span className="text-navy font-medium">View Plans</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-navy font-bold leading-tight">
          Wellness Check Bundles
        </h1>
        <p className="mt-4 text-ink-body max-w-2xl">
          Curated diagnostic packages at transparent prices. Filter by category,
          sort by what matters to you, and add bundles to your basket — checkout
          happens securely via OTP and Flutterwave.
        </p>
      </div>
    </section>
  );
}
