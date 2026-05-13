export default function CtaBanner() {
  return (
    <section data-reveal="up" className="py-12">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <div className="bg-navy text-white rounded-3xl px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-white/80">
              Book a test today and get accurate results delivered promptly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#appointment"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-navy text-sm font-semibold hover:bg-accent-light transition-colors"
            >
              Book a Test <i className="fas fa-arrow-right" aria-hidden />
            </a>
            <a
              href="tel:+2349120914837"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-white text-white text-sm font-semibold hover:bg-white hover:text-navy transition-colors"
            >
              <i className="fas fa-phone" aria-hidden /> Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
