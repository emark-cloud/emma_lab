import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialIcons } from "@/components/ui/SocialIcons";

const CARDS = [
  {
    icon: "fas fa-phone-alt",
    title: "Call Us",
    body: ["Mon–Sat 8am–6pm", "Sunday 10am–4pm"],
    ctas: [
      { label: "+234 813 602 5120", href: "tel:+2348136025120" },
      { label: "+234 803 578 9680", href: "tel:+2348035789680" },
    ],
  },
  {
    icon: "fab fa-whatsapp",
    title: "Chat With Us",
    body: ["We reply within minutes", "during working hours"],
    ctas: [
      {
        label: "+234 912 091 4837",
        href: "https://wa.me/2349120914837",
        external: true,
      },
    ],
  },
];

export default function ContactInfoGrid() {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-bg-soft">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <SectionHeader
          eyebrow="Reach Out"
          title="Get In Touch"
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARDS.map((c) => (
            <article
              key={c.title}
              data-reveal="up"
              className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-full bg-accent-light text-accent flex items-center justify-center text-lg mb-4">
                <i className={c.icon} aria-hidden />
              </div>
              <h4 className="font-display text-lg text-navy font-bold mb-2">
                {c.title}
              </h4>
              <p className="text-sm text-ink-body mb-4">
                {c.body.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {c.ctas.map((cta) => (
                  <a
                    key={cta.href}
                    href={cta.href}
                    {...("external" in cta && cta.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light text-accent text-sm font-semibold hover:bg-accent hover:text-white transition-colors"
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </article>
          ))}

          <article
            data-reveal="up"
            className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-start"
          >
            <div className="w-12 h-12 rounded-full bg-accent-light text-accent flex items-center justify-center text-lg mb-4">
              <i className="fas fa-share-alt" aria-hidden />
            </div>
            <h4 className="font-display text-lg text-navy font-bold mb-2">
              Stay Connected
            </h4>
            <p className="text-sm text-ink-body mb-4">
              Follow us on social for health tips &amp; updates.
            </p>
            <SocialIcons
              variant="card"
              only={["X (Twitter)", "Instagram", "Facebook"]}
              className="mt-auto"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
