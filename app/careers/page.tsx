import type { Metadata } from "next";
import CareersHeader from "@/components/landing/CareersHeader";
import CareersSection from "@/components/landing/CareersSection";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Emma Lab — explore career opportunities and the benefits of working with a team committed to healthcare excellence.",
};

export default function CareersPage() {
  return (
    <>
      <CareersHeader />
      <CareersSection />
      <RevealOnScroll />
    </>
  );
}
