import type { Metadata } from "next";
import Script from "next/script";
import PlansHeader from "@/components/plans/PlansHeader";
import PlansBrowser from "@/components/plans/PlansBrowser";
import CartDrawer from "@/components/plans/CartDrawer";
import CheckoutModal from "@/components/plans/CheckoutModal";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "View Plans",
  description:
    "Browse Emma Lab's wellness check bundles by category, sort by price, and check out securely via OTP and Flutterwave.",
  alternates: { canonical: "/plans" },
};

export default function PlansPage() {
  return (
    <>
      <PlansHeader />
      <PlansBrowser />
      <CartDrawer />
      <CheckoutModal />
      <RevealOnScroll />
      <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="afterInteractive"
      />
    </>
  );
}
