import ContactInfoGrid from "@/components/landing/ContactInfoGrid";
import ContactForm from "@/components/landing/ContactForm";
import LocationMap from "@/components/landing/LocationMap";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Emma Lab Global Services",
  description: "Get in touch with Emma Lab. Call, WhatsApp, email, or send us a message and we'll get back to you within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-bg-soft via-white to-accent-light py-14 lg:py-20">
        <div className="max-w-[var(--container-emma)] mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-3">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-navy font-bold leading-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-ink-body max-w-2xl">
            Reach out by phone, WhatsApp, email, or the form below — our team responds within 24 hours.
          </p>
        </div>
      </section>

      <ContactInfoGrid />
      <ContactForm />
      <LocationMap />
      <RevealOnScroll />
    </>
  );
}
