export default function PlansLoading() {
  return (
    <section className="py-32">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-3 text-ink-muted">
          <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
          Loading wellness bundles…
        </div>
      </div>
    </section>
  );
}
