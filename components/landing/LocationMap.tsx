import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/Button";

const BUSINESS = "Emma Lab Global Services Ltd";
const ADDRESS = "No 12 Ibaraye Street, Danzaria St, Owode, Oyo 211172, Oyo";
const MAPS_QUERY = encodeURIComponent(`${BUSINESS}, ${ADDRESS}`);
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

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
    value: ["Laboratory: 24 hours / 7 days", "Ultrasound & X-Ray (Mon–Sat): 8am–5pm"],
  },
];

export default function LocationMap() {
  return (
    <section id="location" className="py-12 sm:py-16 lg:py-20 bg-bg-soft">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-2 gap-10 items-stretch">
        <div data-reveal="left" className="relative rounded-3xl overflow-hidden shadow-md min-h-[420px]">
          <iframe
            title="Emma Lab Global Services Location"
            src={`https://maps.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`}
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Emma Lab Global Services location in Google Maps"
            className="absolute inset-0 z-10"
          />
          <div className="absolute bottom-5 left-5 z-20 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 max-w-[260px]">
            <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center flex-shrink-0">
              <i className="fas fa-flask" aria-hidden />
            </div>
            <div className="leading-tight">
              <strong className="block text-navy text-sm">Emma Lab</strong>
              <span className="text-xs text-ink-muted">Oyo, Nigeria</span>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
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
              No 12 Ibaraye Street, Danzaria St,
              <br />
              Owode, Oyo 211172, Oyo State, Nigeria.
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
                  ) : Array.isArray(d.value) ? (
                    d.value.map((line) => (
                      <span key={line} className="block text-sm">
                        {line}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm">{d.value}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <a
            href={DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("primary")}
          >
            <i className="fas fa-map-marked-alt" aria-hidden /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
