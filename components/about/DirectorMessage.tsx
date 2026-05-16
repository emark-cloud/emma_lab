import Image from "next/image";

export default function DirectorMessage() {
  return (
    <section id="director" className="py-12 sm:py-16 lg:py-20 bg-bg-soft">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <div data-reveal="left">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-3">
            A Personal Note
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy font-bold leading-tight mb-6">
            Message from
            <br />
            the Director
          </h2>

          <div
            aria-hidden
            className="font-display text-7xl text-accent/30 leading-none mb-2"
          >
            &ldquo;
          </div>

          <p className="text-ink-body leading-relaxed mb-8">
            Hello and thank you for taking the time. With over 30 years of
            operational experience, our lab has a rich history of unwavering
            commitment to diagnostic excellence. We believe every medical
            report represents a patient&apos;s health, which is why we are
            dedicated to providing clear and precise results that facilitate
            optimal treatment and management. As we continue to grow, embracing
            cutting-edge diagnostic technology, we remain at the forefront of
            patient-centred care. We look forward to continuing to serve you as
            a vital part of your healthcare team.
          </p>

          <div className="flex items-center gap-5">
            <svg
              viewBox="0 0 180 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-32 h-12"
              aria-hidden
            >
              <path
                d="M8 35 Q 40 8, 80 28 T 150 25 Q 165 23, 172 30"
                stroke="#1a6fb5"
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M8 44 L 70 44"
                stroke="#0d2d4f"
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="leading-tight">
              <strong className="block text-navy font-display text-lg">
                Akinlayo Adogo
              </strong>
              <span className="text-sm text-ink-muted">
                Director, Emma Lab Global Services Ltd.
              </span>
            </div>
          </div>
        </div>

        <div data-reveal="right" className="relative">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/Rectangle 154.png"
              alt="Akinlayo Adogo, Director of Emma Lab Global Services Ltd."
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
