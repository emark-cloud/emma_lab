import Link from "next/link";

export default function DiagnosticTestsHeader() {
  return (
    <section className="bg-gradient-to-br from-bg-soft via-white to-accent-light">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 py-14 lg:py-20">
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-5">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <i className="fas fa-chevron-right text-[10px]" aria-hidden />
          <span className="text-navy font-medium">Diagnostic Tests</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-navy font-bold leading-tight">
          Diagnostic Tests
        </h1>
        <p className="mt-4 text-ink-body max-w-2xl">
          Explore our full range of diagnostic services — imaging, biochemistry,
          haematology, microbiology and more — delivered with precision, speed,
          and compassion.
        </p>
      </div>
    </section>
  );
}
