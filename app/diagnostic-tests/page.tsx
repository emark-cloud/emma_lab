import type { Metadata } from "next";
import DiagnosticTestsHeader from "@/components/landing/DiagnosticTestsHeader";
import ServicesTabs from "@/components/landing/ServicesTabs";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Diagnostic Tests",
  description:
    "Explore Emma Lab's diagnostic services — imaging, biochemistry, haematology, microbiology and more — delivered with precision, speed, and compassion.",
};

export default function DiagnosticTestsPage() {
  return (
    <>
      <DiagnosticTestsHeader />
      <ServicesTabs />
      <RevealOnScroll />
    </>
  );
}
