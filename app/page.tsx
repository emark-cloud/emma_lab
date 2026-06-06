import HeroCarousel from "@/components/landing/HeroCarousel";
import AboutSplit from "@/components/landing/AboutSplit";
import CtaBanner from "@/components/landing/CtaBanner";
import ServicesTabs from "@/components/landing/ServicesTabs";
import FeaturedBundles from "@/components/landing/FeaturedBundles";
import WhyAccordion from "@/components/landing/WhyAccordion";
import ContactInfoGrid from "@/components/landing/ContactInfoGrid";
import ContactForm from "@/components/landing/ContactForm";
import LocationMap from "@/components/landing/LocationMap";
import AppointmentCta from "@/components/landing/AppointmentCta";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <AboutSplit />
      <CtaBanner />
      <ServicesTabs showInvestigations={false} />
      <FeaturedBundles />
      <WhyAccordion />
      <section id="contact" className="py-14 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-[5fr_7fr] gap-12 xl:gap-16 items-stretch">
          <ContactInfoGrid />
          <div id="message" className="lg:h-full">
            <ContactForm />
          </div>
        </div>
      </section>
      <LocationMap />
      <AppointmentCta />
      <RevealOnScroll />
    </>
  );
}
