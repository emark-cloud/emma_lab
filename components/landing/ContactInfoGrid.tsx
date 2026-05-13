import { SectionHeader } from "@/components/ui/SectionHeader";
import { SocialIcons } from "@/components/ui/SocialIcons";

const CARDS = [
  {
    icon: "fas fa-phone-alt",
    title: "Call Us",
    body: ["Mon–Sat 8am–6pm", "Sunday 10am–4pm"],
    cta: { label: "+234 912 091 4837", href: "tel:+2349120914837" },
  },
  {
    icon: "fas fa-comment-dots",
    title: "Chat With Us",
    body: ["We reply within minutes", "during working hours"],
    cta: {
      label: "emmalabglobal@gmail.com",
      href: "mailto:emmalabglobal@gmail.com",
    },
  },
];

export default function ContactInfoGrid() {
  return (
    <section id="contact" className="py-20 bg-bg-soft">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <SectionHeader
          eyebrow="Reach Out"
          title="Get In Touch"
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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
              <a
                href={c.cta.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-light text-accent text-sm font-semibold hover:bg-accent hover:text-white transition-colors mt-auto"
              >
                {c.cta.label}
              </a>
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
              only={["Google", "Instagram", "Facebook"]}
              className="mt-auto"
            />
          </article>

          <article
            data-reveal="up"
            className="bg-navy text-white rounded-2xl p-6 shadow-md"
          >
            <div className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-lg mb-4">
              <i className="fas fa-clock" aria-hidden />
            </div>
            <h4 className="font-display text-lg font-bold mb-3">
              Working Hours
            </h4>
            <dl className="text-sm space-y-2">
              {[
                ["Mon – Fri", "7 am – 6 pm"],
                ["Saturday", "8 am – 4 pm"],
                ["Sunday", "10 am – 2 pm"],
              ].map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <dt className="text-white/70">{day}</dt>
                  <dd className="font-medium">{hours}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
