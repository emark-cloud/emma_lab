import Link from "next/link";

export default function CareersHeader() {
  return (
    <section className="bg-gradient-to-br from-bg-soft via-white to-accent-light">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 py-14 lg:py-20">
        <nav className="flex items-center gap-2 text-sm text-ink-muted mb-5">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <i className="fas fa-chevron-right text-[10px]" aria-hidden />
          <span className="text-navy font-medium">Careers</span>
        </nav>
        <h1 className="font-display text-4xl md:text-5xl text-navy font-bold leading-tight">
          Careers
        </h1>
        <p className="mt-4 text-ink-body max-w-2xl">
          Join a team where your potential is valued and your work makes a
          difference every day. Explore the benefits of building your career
          with Emma Lab.
        </p>
      </div>
    </section>
  );
}
