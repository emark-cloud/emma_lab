import HeroCarousel from "@/components/landing/HeroCarousel";
import AboutSplit from "@/components/landing/AboutSplit";
import ServicesTabs from "@/components/landing/ServicesTabs";
import CtaBanner from "@/components/landing/CtaBanner";
import FeaturedBundles from "@/components/landing/FeaturedBundles";
import WhyAccordion from "@/components/landing/WhyAccordion";
import CareersSection from "@/components/landing/CareersSection";
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
      <ServicesTabs />
      <CtaBanner />
      <FeaturedBundles />
      <WhyAccordion />
      <CareersSection />
      <ContactInfoGrid />
      <ContactForm />
      <LocationMap />
      <AppointmentCta />
      <RevealOnScroll />
    </>
  );
}
