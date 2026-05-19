"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { TEST_OPTIONS } from "@/lib/landing-data";

export default function BookingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
    }, 1800);
  }

  const field =
    "w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-soft focus:outline-none focus:border-accent transition-colors";

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Book a Diagnostic Test"
      description="Fill in the form below and our team will get in touch."
    >
      {submitted ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 mx-auto rounded-full bg-teal/15 text-teal flex items-center justify-center text-2xl mb-4">
            <i className="fas fa-check" aria-hidden />
          </div>
          <h3 className="font-display text-xl text-navy font-semibold">
            Booking received
          </h3>
          <p className="text-ink-body mt-1">
            We&apos;ll be in touch within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              aria-label="Full name"
              autoComplete="name"
              required
              className={field}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              aria-label="Phone number"
              autoComplete="tel"
              required
              className={field}
            />
          </div>
          <select
            required
            aria-label="Test type"
            className={field}
            defaultValue=""
          >
            <option value="" disabled>
              Select Test Type
            </option>
            {TEST_OPTIONS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <input
            type="date"
            required
            aria-label="Preferred date"
            className={field}
          />
          <Button type="submit" className="w-full">
            Confirm Booking <i className="fas fa-arrow-right" aria-hidden />
          </Button>
        </form>
      )}
    </Modal>
  );
}
