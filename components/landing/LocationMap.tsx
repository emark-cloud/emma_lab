import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/Button";

const DETAILS = [
  {
    icon: "fas fa-phone-alt",
    label: "Phone",
    value: "+234 912 091 4837",
    href: "tel:+2349120914837",
  },
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "emmalabglobal@gmail.com",
    href: "mailto:emmalabglobal@gmail.com",
  },
  {
    icon: "fas fa-clock",
    label: "Hours",
    value: "Mon–Fri: 7am–6pm  |  Sat: 8am–4pm  |  Sun: 10am–2pm",
  },
];

export default function LocationMap() {
  return (
    <section id="location" className="py-20 bg-bg-soft">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-2 gap-10 items-stretch">
        <div data-reveal="left" className="relative rounded-3xl overflow-hidden shadow-md min-h-[420px]">
          <iframe
            title="Emma Lab Global Services Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.3!2d3.933!3d7.398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjMnNTIuOCJOIDPCsDU1JzU0LjgiRQ!5e0!3m2!1sen!2sng!4v1"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-5 left-5 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 max-w-[260px]">
            <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center flex-shrink-0">
              <i className="fas fa-flask" aria-hidden />
            </div>
            <div className="leading-tight">
              <strong className="block text-navy text-sm">Emma Lab</strong>
              <span className="text-xs text-ink-muted">Oyo, Nigeria</span>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener"
                className="block text-xs text-accent font-semibold mt-1"
              >
                Open Google Maps{" "}
                <i className="fas fa-external-link-alt text-[10px]" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        <div data-reveal="right">
          <SectionHeader
            eyebrow="Our Location"
            title={
              <>
                Connecting
                <br />
                Near and Far
              </>
            }
            className="mb-6"
          />

          <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-accent-light text-accent flex items-center justify-center">
                <i className="fas fa-map-marker-alt" aria-hidden />
              </div>
              <h4 className="font-display font-bold text-navy">Headquarters</h4>
            </div>
            <address className="not-italic text-sm text-ink-body leading-relaxed">
              Emma Lab Global Services Ltd.
              <br />
              No 12, Ibaaraye Street, Danzaria,
              <br />
              Owode, Oyo, Oyo State, Nigeria.
            </address>
          </div>

          <ul className="space-y-3 mb-8">
            {DETAILS.map((d) => (
              <li key={d.label} className="flex items-start gap-3">
                <i className={`${d.icon} text-accent mt-1`} aria-hidden />
                <div>
                  <span className="block text-xs uppercase tracking-widest text-ink-muted">
                    {d.label}
                  </span>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="text-sm text-ink hover:text-accent"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <span className="text-sm">{d.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <a
            href="https://maps.google.com/?q=Owode,Oyo,Nigeria"
            target="_blank"
            rel="noopener"
            className={buttonClass("primary")}
          >
            <i className="fas fa-map-marked-alt" aria-hidden /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
