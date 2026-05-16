import HeroCarousel from "@/components/landing/HeroCarousel";
import AboutSplit from "@/components/landing/AboutSplit";
import CtaBanner from "@/components/landing/CtaBanner";
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
      <FeaturedBundles />
      <WhyAccordion />
      <ContactInfoGrid />
      <ContactForm />
      <LocationMap />
      <AppointmentCta />
      <RevealOnScroll />
    </>
  );
}
