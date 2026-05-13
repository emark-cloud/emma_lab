import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md">
        <p className="font-display text-7xl font-bold text-accent mb-2">404</p>
        <h1 className="font-display text-3xl text-navy font-bold mb-3">
          Page not found
        </h1>
        <p className="text-ink-body mb-8">
          The page you&apos;re looking for has moved or doesn&apos;t exist.
          Let&apos;s get you back somewhere useful.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white text-sm font-semibold hover:bg-accent transition-colors"
          >
            <i className="fas fa-arrow-left" aria-hidden /> Back to Home
          </Link>
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            View Wellness Plans
          </Link>
        </div>
      </div>
    </main>
  );
}
