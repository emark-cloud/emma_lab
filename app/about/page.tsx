import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import IdentitySection from "@/components/about/IdentitySection";
import NumbersCounters from "@/components/about/NumbersCounters";
import AccreditationSeals from "@/components/about/AccreditationSeals";
import DirectorMessage from "@/components/about/DirectorMessage";
import AboutPageCta from "@/components/about/AboutPageCta";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "For over three decades, Emma Lab has served as a cornerstone of diagnostic excellence. Learn about our identity, impact, accreditations, and the team behind the lab.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <IdentitySection />
      <NumbersCounters />
      <AccreditationSeals />
      <DirectorMessage />
      <AboutPageCta />
      <RevealOnScroll />
    </>
  );
}
