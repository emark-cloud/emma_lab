import ContactInfoGrid from "@/components/landing/ContactInfoGrid";
import ContactForm from "@/components/landing/ContactForm";
import LocationMap from "@/components/landing/LocationMap";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Emma Lab Global Services",
  description:
    "Get in touch with Emma Lab. Call, WhatsApp, email, or send us a message and we'll get back to you within 24 hours.",
};

const STATS = [
  { icon: "fas fa-flask", label: "24/7 Laboratory" },
  { icon: "fas fa-bolt", label: "Same-day Results" },
  { icon: "fas fa-clock", label: "< 24hr Response" },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy to-navy-mid pt-16 pb-28 lg:pt-20 lg:pb-36">
        <div className="max-w-[var(--container-emma)] mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50 mb-3">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white font-bold leading-tight mb-4">
            We're Here<br className="hidden sm:block" /> to Help You
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
            Reach out by phone, WhatsApp, email, or the form below —{" "}
            our team responds within 24 hours.
          </p>

          <div className="flex flex-wrap gap-3 mt-10">
            {STATS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-full text-sm text-white/90 font-medium"
              >
                <i className={`${s.icon} text-teal text-xs`} aria-hidden />
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main contact section — pulls up over hero */}
      <section
        id="contact"
        className="bg-white rounded-t-[28px] -mt-12 relative z-10 py-14 lg:py-20"
      >
        <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-[5fr_7fr] gap-12 xl:gap-16 items-stretch">
          <ContactInfoGrid />
          <div id="message" className="lg:h-full">
            <ContactForm />
          </div>
        </div>
      </section>

      <LocationMap />
      <RevealOnScroll />
    </>
  );
}
