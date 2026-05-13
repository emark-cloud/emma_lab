const SEALS = [
  {
    icon: "fas fa-award",
    title: "MLSCN",
    body: "Medical Laboratory Science Council of Nigeria",
    ringClass: "border-navy",
    discClass: "bg-navy text-white",
  },
  {
    icon: "fas fa-certificate",
    title: "ISO 9001",
    body: "Quality Management System Certified",
    ringClass: "border-accent",
    discClass: "bg-accent text-white",
  },
  {
    icon: "fas fa-microscope",
    title: "CAP",
    body: "College of American Pathologists Proficiency",
    ringClass: "border-teal",
    discClass: "bg-teal text-white",
  },
  {
    icon: "fas fa-shield-alt",
    title: "NAFDAC",
    body: "Approved Diagnostic Laboratory",
    ringClass: "border-gold",
    discClass: "bg-gold text-white",
  },
];

export default function AccreditationSeals() {
  return (
    <section id="accreditations" className="py-20">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <header data-reveal="up" className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-3">
            Certified Standards
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-navy font-bold">
            Our Accreditations
          </h2>
          <p className="mt-4 text-ink-body max-w-xl mx-auto">
            Recognised and certified by leading national and international
            healthcare bodies.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SEALS.map((s) => (
            <article
              key={s.title}
              data-reveal="up"
              className="text-center"
            >
              <div
                className={`mx-auto w-28 h-28 rounded-full border-[3px] ${s.ringClass} flex items-center justify-center mb-5`}
              >
                <div
                  className={`w-20 h-20 rounded-full ${s.discClass} flex items-center justify-center text-2xl`}
                >
                  <i className={s.icon} aria-hidden />
                </div>
              </div>
              <h4 className="font-display text-lg text-navy font-bold">
                {s.title}
              </h4>
              <p className="mt-1 text-sm text-ink-body">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
