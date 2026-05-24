import type { Metadata } from "next";
import PlansHeader from "@/components/plans/PlansHeader";
import PlansBrowser from "@/components/plans/PlansBrowser";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "View Plans",
  description:
    "Browse Emma Lab's wellness check bundles by category, sort by price, and check out securely via OTP and Paystack.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <PlansHeader />
      <PlansBrowser />
      <RevealOnScroll />
    </>
  );
}
